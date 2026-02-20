import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaSun, FaMoon, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ Context and Asset Imports
import { ThemeContext } from '../../context/ThemeContext';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { AuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/images/logo.png'; // ✅ Fixed image import

const Header = ({ onCartClick }) => {

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favoritesCount = favorites.length;

  // ✅ Updated navigation links to be data-driven
  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/products', text: 'Products' },
    { to: '/about', text: 'About' },
    { to: '/contact', text: 'Contact' },
    { to: '/orders', text: 'My Orders' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    // Navigate to products with query param (non-breaking; Products page may ignore gracefully)
    navigate(q ? `/products?search=${encodeURIComponent(q)}` : '/products');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-dark-surface shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <Link to="/" className="flex-shrink-0 mr-2">
          <img src={logoImg} width="125" alt="Redstore Logo" className="block h-auto w-[125px]" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-6 flex-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary font-medium transition-colors ${
                  isActive ? 'text-primary dark:text-dark-primary' : ''
                }`
              }
            >
              {link.text}
            </NavLink>
          ))}

          {/* Desktop Search - beside Contact */}
          <form
            onSubmit={handleSearchSubmit}
            className="ml-auto flex items-center rounded-full backdrop-blur bg-white/70 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 shadow-sm focus-within:shadow-lg transition-all overflow-hidden"
            style={{ maxWidth: 340 }}
            aria-label="Search products"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search premium products..."
              className="px-4 py-2 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 w-56"
            />
            <button
              type="submit"
              className="h-full px-4 py-2 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white text-sm font-semibold flex items-center gap-2 hover:opacity-95 active:opacity-90 transition"
              aria-label="Search"
              title="Search"
            >
              <FaSearch />
              <span className="hidden lg:inline">Search</span>
            </button>
          </form>
        </nav>

        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-xl text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
          
          <Link to="/favorites" className="relative text-xl text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary">
            <FaHeart />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{favoritesCount}</span>
            )}
          </Link>
          <button
  onClick={onCartClick}
  className="relative text-xl text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary"
>
  <FaShoppingCart />
  {cartItemCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {cartItemCount}
    </span>
  )}
</button>


          {/* Greeting visible on all sizes; Logout only desktop here */}
          {user && (
            <span className="md:hidden px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 mr-1 whitespace-nowrap shrink-0">
              {(() => {
                const rawFull = user.fullName || user.name || user.displayName || user.username || [user.firstName, user.lastName].filter(Boolean).join(' ') || (user.email ? user.email.split('@')[0] : 'User');
                const first = String(rawFull).trim().split(/\s+/)[0];
                return `Hii, ${first}`;
              })()}
            </span>
          )}
          <div className="hidden md:flex items-center gap-4 ml-1">
            {user ? (
              <>
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap shrink-0">
                  {(() => {
                    const rawFull = user.fullName || user.name || user.displayName || user.username || [user.firstName, user.lastName].filter(Boolean).join(' ') || (user.email ? user.email.split('@')[0] : 'User');
                    const first = String(rawFull).trim().split(/\s+/)[0];
                    return `Hii, ${first}`;
                  })()}
                </span>
                <button onClick={logout} className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-80 transition inline-flex items-center justify-center shrink-0">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-80 transition inline-flex items-center justify-center shrink-0">
                Login
              </Link>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl" aria-label="Open menu" aria-expanded={isMenuOpen}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-dark-surface shadow-lg absolute w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <nav className="flex flex-col items-center space-y-4 py-4">
              {/* Mobile Search - shown inside opened menu */}
              <form
                onSubmit={handleSearchSubmit}
                className="w-[92%] flex items-center rounded-2xl bg-white/80 dark:bg-gray-800/70 border border-gray-200/70 dark:border-gray-700/60 shadow-sm focus-within:shadow-lg transition-all overflow-hidden px-2"
                aria-label="Search products"
              >
                <FaSearch className="text-gray-400 mx-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search premium products..."
                  className="flex-1 px-2 py-3 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white text-sm font-semibold hover:opacity-95 active:opacity-90 transition"
                >
                  Go
                </button>
              </form>
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `whitespace-nowrap text-lg ${isActive ? 'text-primary dark:text-dark-primary' : 'text-text-secondary dark:text-dark-text-secondary'}`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
              {/* Mobile auth controls: show ONLY Logout here (greeting stays in top bar) */}
              <div className="w-[92%] pt-2 flex items-center justify-end gap-3">
                {user ? (
                  <>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold inline-flex items-center justify-center shrink-0">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold inline-flex items-center justify-center shrink-0">
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;