import { useState, useContext } from 'react';
import Hero from '../components/home/Hero';
import ProductList from '../components/products/ProductList';
import ExclusiveBanner from '../components/home/ExclusiveBanner'; // ✅ Import
import ProductSpecs from '../components/home/ProductSpecs';     // ✅ Import
import ProductReviews from '../components/home/ProductReviews'; // ✅ Import
import Testimonials from '../components/home/Testimonials';
import Brands from '../components/home/Brands';
import QuickBuyModal from '../components/ui/QuickBuyModal';
import { ProductsContext } from '../context/ProductsContext';
import FlashSale from '../components/home/FlashSale';
import TrendingStrip from '../components/home/TrendingStrip';
import TrustBadges from '../components/home/TrustBadges';
import Newsletter from '../components/home/Newsletter';
import PremiumBanner from '../components/ui/PremiumBanner';
import LiveChatWidget from '../components/ui/LiveChatWidget';
import LoyaltyProgram from '../components/ui/LoyaltyProgram';
import ScrollToTop from '../components/ui/ScrollToTop';
import ProductRecommendations from '../components/ui/ProductRecommendations';

export default function Home() {
  const [quickBuyProduct, setQuickBuyProduct] = useState(null);
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);
  const { products } = useContext(ProductsContext);

  const handleQuickBuy = (product) => {
    setQuickBuyProduct(product);
    setIsQuickBuyOpen(true);
  };

  const handleCloseQuickBuy = () => {
    setIsQuickBuyOpen(false);
    setQuickBuyProduct(null);
  };

  return (
    <>
      <Hero />
      <FlashSale />
      <PremiumBanner />
      <TrendingStrip />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center my-12 dark:text-dark-text-primary relative title">Featured Products</h2>
        <ProductList onQuickBuy={handleQuickBuy} />
      </div>
      <div className="container mx-auto px-4">
        <ProductRecommendations />
      </div>
      <ExclusiveBanner /> {/* Add Banner */}
      <div className="container mx-auto px-4">
        <ProductSpecs />    {/* Add Specs Table */}
        <ProductReviews />  {/* Add Reviews Section */}
        <Testimonials />
        <Brands />
        <LoyaltyProgram />
      </div>
      <TrustBadges />
      <Newsletter />
      <LiveChatWidget />
      <ScrollToTop />
      
      {/* Quick Buy Modal */}
      <QuickBuyModal 
        isOpen={isQuickBuyOpen}
        onClose={handleCloseQuickBuy}
        product={quickBuyProduct}
      />
    </>
  );
}