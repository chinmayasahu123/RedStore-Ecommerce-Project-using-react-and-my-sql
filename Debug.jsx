import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { getProducts } from '../services/api';

const Debug = () => {
    const { user } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const { favorites } = useContext(FavoritesContext);

    useEffect(() => {
        const runChecks = async () => {
            console.group('🚀 Redstore Debug Utility 🚀');
            
            // 1. Auth check
            console.log('%c1. Auth Context:', 'font-weight: bold;', user ? `Logged in as ${user.email}` : 'Not logged in');

            // 2. Cart check
            console.log('%c2. Cart Context:', 'font-weight: bold;', `${cartItems.length} items in cart`);

            // 3. Favorites check
            console.log('%c3. Favorites Context:', 'font-weight: bold;', `${favorites.length} items in favorites`);

            // 4. API check
            try {
                const products = await getProducts();
                console.log('%c4. FakeStoreAPI:', 'font-weight: bold; color: green;', `Successfully fetched ${products.length} products.`);
            } catch (error) {
                console.log('%c4. FakeStoreAPI:', 'font-weight: bold; color: red;', 'Failed to fetch products.', error.message);
            }

            // 5. Responsiveness check (visual)
            console.log('%c5. Responsiveness:', 'font-weight: bold;', 'Please manually check responsiveness at 320px, 768px, and 1024px viewports.');

            console.groupEnd();
        };

        runChecks();
    }, [user, cartItems, favorites]);

    return null; // This component does not render anything
};

export default Debug;