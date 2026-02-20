import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaStar, FaCheck, FaTimes as FaX, FaBalanceScale } from 'react-icons/fa';

const ProductComparison = () => {
  const [compareList, setCompareList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Mock product data for comparison
  const mockProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones Pro',
      price: 15999,
      originalPrice: 19999,
      rating: 4.8,
      image: '/api/placeholder/200/200',
      features: {
        'Battery Life': '30 hours',
        'Noise Cancellation': true,
        'Wireless': true,
        'Water Resistant': 'IPX4',
        'Weight': '250g',
        'Warranty': '2 years'
      },
      pros: ['Excellent sound quality', 'Long battery life', 'Comfortable fit'],
      cons: ['Expensive', 'Heavy for some users']
    },
    {
      id: 2,
      name: 'Smart Fitness Watch Elite',
      price: 24999,
      originalPrice: 29999,
      rating: 4.9,
      image: '/api/placeholder/200/200',
      features: {
        'Battery Life': '7 days',
        'GPS': true,
        'Heart Rate Monitor': true,
        'Water Resistant': '50m',
        'Weight': '45g',
        'Warranty': '1 year'
      },
      pros: ['Accurate tracking', 'Great battery', 'Lightweight'],
      cons: ['Small screen', 'Limited apps']
    },
    {
      id: 3,
      name: 'Designer Phone Case Luxury',
      price: 2999,
      originalPrice: 3999,
      rating: 4.7,
      image: '/api/placeholder/200/200',
      features: {
        'Material': 'Genuine Leather',
        'Drop Protection': '6 feet',
        'Wireless Charging': true,
        'Card Slots': '3',
        'Weight': '50g',
        'Warranty': '6 months'
      },
      pros: ['Premium materials', 'Great protection', 'Stylish design'],
      cons: ['Limited color options', 'Adds bulk']
    }
  ];

  const addToCompare = (productId) => {
    if (compareList.length >= 3) {
      alert('You can compare maximum 3 products at a time');
      return;
    }
    
    const product = mockProducts.find(p => p.id === productId);
    if (product && !compareList.find(p => p.id === productId)) {
      setCompareList(prev => [...prev, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setCompareList([]);
    setIsOpen(false);
  };

  const renderFeatureValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <FaCheck className="text-green-500 mx-auto" />
      ) : (
        <FaX className="text-red-500 mx-auto" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  // Get all unique features from compared products
  const allFeatures = [...new Set(
    compareList.flatMap(product => Object.keys(product.features))
  )];

  return (
    <>
      {/* Floating Compare Button */}
      {compareList.length > 0 && (
        <motion.div
          className="fixed bottom-24 left-6 z-40"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <FaBalanceScale />
            Compare ({compareList.length})
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-dark-surface rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaBalanceScale className="text-2xl" />
                  <div>
                    <h2 className="text-2xl font-bold">Product Comparison</h2>
                    <p className="opacity-90">Compare features side by side</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={clearComparison}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Comparison Content */}
              <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
                {compareList.length === 0 ? (
                  <div className="text-center py-12">
                    <FaBalanceScale className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                      No products to compare
                    </h3>
                    <p className="text-text-secondary dark:text-dark-text-secondary">
                      Add products to start comparing their features
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left p-4 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-lg font-bold text-text-primary dark:text-dark-text-primary">
                              Features
                            </span>
                          </th>
                          {compareList.map(product => (
                            <th key={product.id} className="p-4 border-b border-gray-200 dark:border-gray-700 min-w-[250px]">
                              <div className="text-center">
                                <div className="relative inline-block">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded-lg mx-auto mb-3"
                                  />
                                  <button
                                    onClick={() => removeFromCompare(product.id)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                                  >
                                    <FaTimes />
                                  </button>
                                </div>
                                <h3 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2 line-clamp-2">
                                  {product.name}
                                </h3>
                                <div className="flex items-center justify-center gap-1 mb-2">
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
                                <div className="text-center">
                                  <span className="text-xl font-bold text-primary dark:text-dark-primary">
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                  <br />
                                  <span className="text-sm text-gray-500 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {allFeatures.map(feature => (
                          <tr key={feature} className="border-b border-gray-100 dark:border-gray-800">
                            <td className="p-4 font-semibold text-text-primary dark:text-dark-text-primary">
                              {feature}
                            </td>
                            {compareList.map(product => (
                              <td key={product.id} className="p-4 text-center text-text-secondary dark:text-dark-text-secondary">
                                {renderFeatureValue(product.features[feature] || 'N/A')}
                              </td>
                            ))}
                          </tr>
                        ))}
                        
                        {/* Pros */}
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="p-4 font-semibold text-green-600">Pros</td>
                          {compareList.map(product => (
                            <td key={product.id} className="p-4">
                              <ul className="text-sm text-green-600 space-y-1">
                                {product.pros.map((pro, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <FaCheck className="text-xs" />
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>
                        
                        {/* Cons */}
                        <tr>
                          <td className="p-4 font-semibold text-red-600">Cons</td>
                          {compareList.map(product => (
                            <td key={product.id} className="p-4">
                              <ul className="text-sm text-red-600 space-y-1">
                                {product.cons.map((con, index) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <FaX className="text-xs" />
                                    {con}
                                  </li>
                                ))}
                              </ul>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductComparison;
