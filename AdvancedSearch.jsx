import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaTimes, FaSlidersH, FaSort } from 'react-icons/fa';

const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 50000],
    rating: 0,
    brand: '',
    inStock: false,
    onSale: false,
    freeShipping: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Beauty'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG'];
  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Most Popular' }
  ];

  // Mock search results
  const mockResults = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 15999,
      originalPrice: 19999,
      rating: 4.8,
      category: 'Electronics',
      brand: 'Sony',
      image: '/api/placeholder/200/200',
      inStock: true,
      onSale: true,
      freeShipping: true
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 24999,
      originalPrice: 29999,
      rating: 4.9,
      category: 'Electronics',
      brand: 'Apple',
      image: '/api/placeholder/200/200',
      inStock: true,
      onSale: true,
      freeShipping: true
    },
    {
      id: 3,
      name: 'Designer Running Shoes',
      price: 8999,
      originalPrice: 12999,
      rating: 4.6,
      category: 'Fashion',
      brand: 'Nike',
      image: '/api/placeholder/200/200',
      inStock: false,
      onSale: true,
      freeShipping: false
    }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      let results = mockResults.filter(product => {
        const matchesQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '';
        const matchesCategory = filters.category === '' || product.category === filters.category;
        const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const matchesRating = product.rating >= filters.rating;
        const matchesBrand = filters.brand === '' || product.brand === filters.brand;
        const matchesStock = !filters.inStock || product.inStock;
        const matchesSale = !filters.onSale || product.onSale;
        const matchesShipping = !filters.freeShipping || product.freeShipping;

        return matchesQuery && matchesCategory && matchesPrice && matchesRating && 
               matchesBrand && matchesStock && matchesSale && matchesShipping;
      });

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }

      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };

  useEffect(() => {
    if (searchQuery || Object.values(filters).some(v => v !== '' && v !== 0 && v !== false && !Array.isArray(v))) {
      handleSearch();
    }
  }, [searchQuery, filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 50000],
      rating: 0,
      brand: '',
      inStock: false,
      onSale: false,
      freeShipping: false
    });
    setSearchQuery('');
    setSortBy('relevance');
  };

  const activeFiltersCount = Object.values(filters).filter(v => 
    v !== '' && v !== 0 && v !== false && !Array.isArray(v)
  ).length + (filters.inStock ? 1 : 0) + (filters.onSale ? 1 : 0) + (filters.freeShipping ? 1 : 0);

  return (
    <div className="my-8">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-2xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <FaSearch />
          Advanced Product Search
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">AI-Powered</span>
        </h2>
        
        {/* Main Search Bar */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands, categories..."
              className="w-full px-4 py-3 pr-12 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
          >
            <FaFilter />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-red-500 text-white w-6 h-6 rounded-full text-sm flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="bg-white dark:bg-dark-surface border-x border-gray-200 dark:border-gray-700 p-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  Brand
                </label>
                <select
                  value={filters.brand}
                  onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                    }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-text-secondary dark:text-dark-text-secondary">
                    <span>₹{filters.priceRange[0].toLocaleString()}</span>
                    <span>₹{filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>
            </div>

            {/* Checkbox Filters */}
            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { key: 'inStock', label: 'In Stock Only' },
                { key: 'onSale', label: 'On Sale' },
                { key: 'freeShipping', label: 'Free Shipping' }
              ].map(filter => (
                <label key={filter.key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters[filter.key]}
                    onChange={(e) => setFilters(prev => ({ ...prev, [filter.key]: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-text-primary dark:text-dark-text-primary">{filter.label}</span>
                </label>
              ))}
            </div>

            {/* Filter Actions */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
              >
                <FaTimes />
                Clear All Filters
              </button>
              
              <div className="flex items-center gap-4">
                <span className="text-text-secondary dark:text-dark-text-secondary">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Results */}
      <div className="bg-white dark:bg-dark-surface rounded-b-2xl border-x border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
            Search Results ({searchResults.length})
          </h3>
          {isSearching && (
            <div className="flex items-center gap-2 text-blue-600">
              <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              Searching...
            </div>
          )}
        </div>

        {isSearching ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-primary dark:text-dark-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.onSale && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    ⭐ {product.rating}
                  </span>
                  <div className="flex gap-2">
                    {product.onSale && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Sale</span>}
                    {product.freeShipping && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free Ship</span>}
                    {!product.inStock && <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Out of Stock</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-primary dark:text-dark-text-primary mb-2">
              No products found
            </h3>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
