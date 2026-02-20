import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Favorites from './pages/Favorites';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import PremiumFeatures from './pages/PremiumFeatures';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Debug from './utils/Debug';
import ScrollToTop from './components/ui/ScrollToTop';
import CartModal from './components/ui/CartModal';
import LiveChatWidget from './components/ui/LiveChatWidget';

import './styles/App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Pages where Header/Footer should be hidden
  const hideOnPaths = ['/login', '/register'];
  const hideHeaderFooter = hideOnPaths.includes(location.pathname);

  return (
    <div className="font-poppins bg-background dark:bg-dark-background text-text-primary dark:text-dark-text-primary transition-colors duration-300">
      {!hideHeaderFooter && <AnnouncementBar />}
      {!hideHeaderFooter && <Header onCartClick={() => setIsCartOpen(true)} />}

      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<OrderDetail />} />
              <Route path="/premium" element={<PremiumFeatures />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {!hideHeaderFooter && <Footer />}

      <ScrollToTop />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <LiveChatWidget />
      {import.meta.env.DEV && <Debug />}
    </div>
  );
}

export default App;
