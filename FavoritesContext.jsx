import { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { AuthContext } from './AuthContext.jsx';
import { getWishlist, addWishlistItem, removeWishlistItem } from '../services/api';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    // Keep local storage for guests; use state to allow async hydration for logged-in users
    const [storedFavorites, setStoredFavorites] = useLocalStorage('favorites', []);
    const [favorites, setFavorites] = useState(storedFavorites);
    const { user } = useContext(AuthContext);

    // Helper: fetch product details by id from fakestoreapi
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
                setFavorites(storedFavorites);
                return;
            }
            try {
                const ids = (await getWishlist()).data; // array of product ids
                const products = await Promise.all(ids.map((id) => fetchProductById(id)));
                if (!cancelled) setFavorites(products);
            } catch {
                // fallback to local if backend fails
                if (!cancelled) setFavorites(storedFavorites);
            }
        }
        hydrate();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Keep localStorage in sync for guests (and as cache)
    useEffect(() => {
        try { setStoredFavorites(favorites); } catch {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorites]);

    const toggleFavorite = (product) => {
        setFavorites(prev => {
            const isFav = prev.some(f => f.id === product.id);
            const next = isFav ? prev.filter(f => f.id !== product.id) : [...prev, product];
            // Persist to backend if logged in (fire-and-forget)
            if (user) {
                if (isFav) {
                    removeWishlistItem(product.id).catch(() => {});
                } else {
                    addWishlistItem({ productId: product.id }).catch(() => {});
                }
            }
            return next;
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};