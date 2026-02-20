import { useContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import QuickBuyModal from '../components/ui/QuickBuyModal';
import { ProductsContext } from '../context/ProductsContext';

export default function Products() {
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();
  const { products } = useContext(ProductsContext);

  const params = new URLSearchParams(location.search);
  const searchQuery = (params.get('search') || '').trim();

  const filtered = useMemo(() => {
    if (!searchQuery) return products;
    const q = searchQuery.toLowerCase();
    return products.filter((p) => {
      const title = p.title?.toLowerCase() || '';
      const desc = p.description?.toLowerCase() || '';
      const cat = p.category?.toLowerCase() || '';
      return title.includes(q) || desc.includes(q) || cat.includes(q);
    });
  }, [products, searchQuery]);

  const handleQuickBuy = (product) => {
    setSelectedProduct(product);
    setIsQuickBuyOpen(true);
  };

  const handleCloseQuickBuy = () => {
    setIsQuickBuyOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-4">All Products</h1>
      <p className="text-center text-text-secondary dark:text-dark-text-secondary mb-6">
        Discover our curated collection of high-quality products.
      </p>
      {searchQuery && (
        <div className="flex justify-center mb-8">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-200/60 via-orange-200/60 to-rose-200/60 dark:from-amber-500/20 dark:via-orange-500/20 dark:to-rose-500/20 border border-amber-300/50 dark:border-amber-500/30 text-sm text-gray-700 dark:text-gray-200">
            Showing results for <strong className="mx-1">“{searchQuery}”</strong> — {filtered.length} item{filtered.length === 1 ? '' : 's'}
          </span>
        </div>
      )}
      <ProductList onQuickBuy={handleQuickBuy} productsOverride={filtered} />
      
      {/* Quick Buy Modal */}
      <QuickBuyModal 
        isOpen={isQuickBuyOpen}
        onClose={handleCloseQuickBuy}
        product={selectedProduct}
      />
    </div>
  );
}