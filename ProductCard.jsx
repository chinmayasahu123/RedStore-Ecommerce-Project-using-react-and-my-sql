import { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'; // ✅ Import Link for navigation

const ProductCard = ({ product, onQuickBuy }) => {
    const { addToCart } = useContext(CartContext);
    const { favorites, toggleFavorite } = useContext(FavoritesContext);

    const isFavorited = favorites.some(fav => fav.id === product.id);

    // ✅ Added e.preventDefault() to stop the parent Link from navigating
    const handleAddToCart = (e) => {
        e.preventDefault(); 
        addToCart(product);
        toast.success(`${product.title} added to cart!`);
    };

    // ✅ Added e.preventDefault() here as well
    const handleToggleFavorite = (e) => {
        e.preventDefault();
        toggleFavorite(product);
        toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        // ✅ The entire card is now a link to the product's detail page
        <Link to={`/products/${product.id}`}>
            <motion.div
                className="bg-white dark:bg-dark-surface rounded-lg shadow-lg overflow-hidden flex flex-col group relative h-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
                <div className="relative">
                    <img src={product.image} alt={product.title} className="w-full h-64 object-contain p-4" loading="lazy" />
                    <button
                        onClick={handleToggleFavorite}
                        className="absolute top-4 right-4 text-2xl text-red-500 transition-transform duration-200 hover:scale-125"
                        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isFavorited ? <FaHeart /> : <FaRegHeart />}
                    </button>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2 truncate flex-grow">{product.title}</h3>
                    <div className="flex items-center justify-between mt-auto">
                        <p className="text-xl font-bold text-primary dark:text-dark-primary">₹{product.price.toFixed(2)}</p>
                        <div className="flex items-center">
                            {renderStars(product.rating.rate)}
                            <span className="text-sm text-gray-500 ml-2">({product.rating.count})</span>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-primary text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all duration-300"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onQuickBuy(product);
                            }}
                            className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all duration-300"
                        >
                            Quick Buy
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;