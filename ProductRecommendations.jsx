import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';

const ProductRecommendations = ({ currentProduct, userPreferences = [] }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated AI recommendation algorithm
  useEffect(() => {
    const generateRecommendations = () => {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const mockRecommendations = [
          {
            id: 'rec1',
            name: 'Premium Wireless Headphones',
            price: 15999,
            originalPrice: 19999,
            rating: 4.8,
            image: '/api/placeholder/200/200',
            aiScore: 95,
            reason: 'Based on your audio preferences'
          },
          {
            id: 'rec2',
            name: 'Smart Fitness Watch',
            price: 24999,
            originalPrice: 29999,
            rating: 4.9,
            image: '/api/placeholder/200/200',
            aiScore: 92,
            reason: 'Matches your lifestyle'
          },
          {
            id: 'rec3',
            name: 'Luxury Phone Case',
            price: 2999,
            originalPrice: 3999,
            rating: 4.7,
            image: '/api/placeholder/200/200',
            aiScore: 88,
            reason: 'Complements your device'
          },
          {
            id: 'rec4',
            name: 'Designer Sunglasses',
            price: 8999,
            originalPrice: 12999,
            rating: 4.6,
            image: '/api/placeholder/200/200',
            aiScore: 85,
            reason: 'Trending in your area'
          }
        ];
        
        setRecommendations(mockRecommendations);
        setLoading(false);
      }, 1500);
    };

    generateRecommendations();
  }, [currentProduct, userPreferences]);

  if (loading) return null;

  return (
    <motion.div 
      className="my-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-2xl text-purple-500" />
        <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">
          AI Recommendations For You
        </h2>
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Premium AI
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product, index) => (
          <motion.div
            key={product.id}
            className="bg-white dark:bg-dark-surface rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* AI Score Badge */}
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {product.aiScore}% Match
              </div>
              <div className="absolute top-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                <FaRobot className="inline mr-1" />
                AI Pick
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="text-sm text-purple-600 dark:text-purple-400 mb-2 italic">
                {product.reason}
              </p>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-text-secondary dark:text-dark-text-secondary ml-1">
                  ({product.rating})
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-primary dark:text-dark-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-primary hover:bg-primary/90 text-white py-2 px-3 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-1">
                  <FaShoppingCart className="text-xs" />
                  Add to Cart
                </button>
                <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <FaHeart className="text-red-500" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-8 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
          View More AI Recommendations
        </button>
      </div>
    </motion.div>
  );
};

export default ProductRecommendations;
