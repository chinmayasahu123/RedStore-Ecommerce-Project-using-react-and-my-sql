import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import ProductCard from '../components/products/ProductCard';
import { Link } from 'react-router-dom';

export default function Favorites() {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold text-center mb-12">Your Favorites</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {favorites.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl">You have no favorited items.</p>
                    <Link to="/" className="text-primary dark:text-dark-primary mt-4 inline-block font-semibold">Browse Products</Link>
                </div>
            )}
        </div>
    );
}
