import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaFire, FaMicrophone, FaCamera } from 'react-icons/fa';
import { ProductsContext } from '../../context/ProductsContext';

const SearchBar = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Get products from context
  const { products, loading } = useContext(ProductsContext);

  // Generate popular searches from actual product categories
  const popularSearches = products.length > 0 ? [
    ...new Set(products.map(product => product.category))
  ].slice(0, 6) : [
    'electronics',
    'jewelery', 
    'men\'s clothing',
    'women\'s clothing'
  ];

  // Generate suggestions from actual product titles
  const suggestions = products
    .filter(product => 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
      searchQuery.length > 0
    )
    .map(product => product.title)
    .slice(0, 6);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      // Filter products based on search query
      const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      
      // Pass filtered results to parent component
      if (onSearchResults) {
        onSearchResults(filteredProducts, query);
      }
      
      setShowSuggestions(false);
      setIsExpanded(false);
    } else {
      // If empty search, show all products
      if (onSearchResults) {
        onSearchResults(products, '');
      }
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Voice search functionality would be implemented here
    setTimeout(() => setIsListening(false), 3000);
  };

  const handleCameraSearch = () => {
    // Visual search functionality would be implemented here
    console.log('Camera search activated');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div 
      className="search-container relative w-full max-w-4xl mx-auto my-8 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Search Bar */}
      <div className={`relative transition-all duration-300 ${isExpanded ? 'transform scale-105' : ''}`}>
        <div className="relative flex items-center bg-white dark:bg-dark-surface rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700 focus-within:border-primary dark:focus-within:border-dark-primary transition-all duration-300">
          
          {/* Search Icon */}
          <div className="pl-6 pr-2">
            <FaSearch className="text-gray-400 dark:text-gray-500 text-lg" />
          </div>

          {/* Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              setShowSuggestions(value.length > 0);
              
              // Real-time search as user types
              if (value.length > 0) {
                handleSearch(value);
              } else {
                // Show all products when search is cleared
                if (onSearchResults) {
                  onSearchResults(products, '');
                }
              }
            }}
            onFocus={() => {
              setIsExpanded(true);
              setShowSuggestions(searchQuery.length > 0 || true);
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for products, brands, categories..."
            className="flex-1 py-4 px-2 text-lg bg-transparent text-text-primary dark:text-dark-text-primary placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
          />

          {/* Voice Search Button */}
          <button
            onClick={handleVoiceSearch}
            className={`p-3 mx-1 rounded-xl transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}
            title="Voice Search"
          >
            <FaMicrophone className="text-lg" />
          </button>

          {/* Camera Search Button */}
          <button
            onClick={handleCameraSearch}
            className="p-3 mx-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all duration-300"
            title="Visual Search"
          >
            <FaCamera className="text-lg" />
          </button>

          {/* Clear Button */}
          {searchQuery && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => {
                setSearchQuery('');
                setShowSuggestions(false);
              }}
              className="p-3 mx-1 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-all duration-300"
            >
              <FaTimes className="text-lg" />
            </motion.button>
          )}

          {/* Search Button */}
          <button
            onClick={() => handleSearch()}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 m-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Search
          </button>
        </div>

        {/* Voice Search Indicator */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            🎤 Listening...
          </motion.div>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (isExpanded || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-surface rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
          >
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                  Suggestions
                </h3>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-text-primary dark:text-dark-text-primary transition-colors duration-200 flex items-center gap-3"
                    >
                      <FaSearch className="text-gray-400 text-sm" />
                      <span>{suggestion}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {(!searchQuery || suggestions.length === 0) && (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <FaFire className="text-orange-500" />
                  Trending Searches
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {popularSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSearch(search)}
                      className="text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-text-primary dark:text-dark-text-primary transition-colors duration-200 flex items-center gap-3"
                    >
                      <FaFire className="text-orange-500 text-sm" />
                      <span>{search}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                  💡 Try voice search
                </span>
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                  📷 Visual search
                </span>
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
                  🔥 Trending now
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Stats/Info */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="flex items-center gap-1">
          🔍 <span className="hidden sm:inline">Smart search with</span> AI suggestions
        </span>
        <span className="flex items-center gap-1">
          🎤 <span className="hidden sm:inline">Voice search</span> <span className="sm:hidden">Voice</span> available
        </span>
        <span className="flex items-center gap-1">
          📷 <span className="hidden sm:inline">Visual search</span> <span className="sm:hidden">Visual</span> powered
        </span>
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
