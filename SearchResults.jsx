import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchResults = ({ products, searchQuery, onClearSearch, isSearching, onQuickBuy }) => {
  if (isSearching) {
    return (
      <div className="container mx-auto px-4 my-8">
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-text-secondary dark:text-dark-text-secondary">Searching products...</p>
        </div>
      </div>
    );
  }

  if (searchQuery && products.length === 0) {
    return (
      <motion.div 
        className="container mx-auto px-4 my-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <FaSearch className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
            No products found
          </h3>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
            We couldn't find any products matching "<span className="font-semibold text-primary">{searchQuery}</span>"
          </p>
          <button
            onClick={onClearSearch}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <FaTimes />
            Clear Search
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 my-8">
      {/* Search Results Header */}
      {searchQuery && (
        <motion.div 
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-dark-text-primary">
              Search Results
            </h2>
            <p className="text-text-secondary dark:text-dark-text-secondary mt-1">
              Found {products.length} product{products.length !== 1 ? 's' : ''} for "
              <span className="font-semibold text-primary">{searchQuery}</span>"
            </p>
          </div>
          <button
            onClick={onClearSearch}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-text-primary dark:text-dark-text-primary px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 w-fit"
          >
            <FaTimes />
            Clear Search
          </button>
        </motion.div>
      )}

      {/* Products Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <AnimatePresence mode="wait">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              layout
            >
              <ProductCard product={product} onQuickBuy={onQuickBuy} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Search Tips */}
      {searchQuery && products.length > 0 && (
        <motion.div 
          className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-3">
            💡 Search Tips
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-text-secondary dark:text-dark-text-secondary">
            <div>
              <strong>🔍 Refine your search:</strong> Try more specific terms
            </div>
            <div>
              <strong>📱 Categories:</strong> Search by product category
            </div>
            <div>
              <strong>🎯 Keywords:</strong> Use product features or brands
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchResults;
