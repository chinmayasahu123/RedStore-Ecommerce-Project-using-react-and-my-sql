import { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { AuthContext } from './AuthContext.jsx';
import { getCart, addCartItem, updateCartQty, removeCartItem } from '../services/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [storedCart, setStoredCart] = useLocalStorage('cartItems', []);
    const [cartItems, setCartItems] = useState(storedCart);
    const { user } = useContext(AuthContext);

    async function fetchProductById(id) {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Failed to load product');
        return res.json();
    }

    // Hydrate from backend when user logs in
    useEffect(() => {
        let cancelled = false;
        async function hydrate() {
            if (!user) {
                setCartItems(storedCart);
                return;
            }
            try {
                const rows = (await getCart()).data; // [{ product_id, quantity }]
                const products = await Promise.all(rows.map(async (r) => {
                    const p = await fetchProductById(r.product_id);
                    return { ...p, quantity: r.quantity };
                }));
                if (!cancelled) setCartItems(products);

                // If backend cart is empty but we have a guest cart, sync it up
                if (!cancelled && rows.length === 0 && storedCart && storedCart.length > 0) {
                    for (const item of storedCart) {
                        // Push each guest item quantity to backend
                        try { await addCartItem({ productId: item.id, quantity: item.quantity || 1 }); } catch {}
                    }
                    // Re-fetch to ensure local reflects server state
                    try {
                        const rows2 = (await getCart()).data;
                        const products2 = await Promise.all(rows2.map(async (r) => {
                            const p = await fetchProductById(r.product_id);
                            return { ...p, quantity: r.quantity };
                        }));
                        if (!cancelled) setCartItems(products2);
                    } catch {}
                }
            } catch {
                if (!cancelled) setCartItems(storedCart);
            }
        }
        hydrate();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Keep localStorage in sync as cache/guest state
    useEffect(() => {
        try { setStoredCart(cartItems); } catch {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const exists = prev.find(i => i.id === product.id);
            const next = exists
                ? prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
                : [...prev, { ...product, quantity: 1 }];
            if (user) {
                addCartItem({ productId: product.id, quantity: 1 }).catch(() => {});
            }
            return next;
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
        if (user) removeCartItem(productId).catch(() => {});
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) return removeFromCart(productId);
        setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
        if (user) updateCartQty(productId, newQuantity).catch(() => {});
    };
    
    const clearCart = async () => {
        // Clear local
        const current = cartItems;
        setCartItems([]);
        // Best-effort clear on server for logged-in users
        if (user) {
            for (const item of current) {
                try { await removeCartItem(item.id); } catch {}
            }
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};