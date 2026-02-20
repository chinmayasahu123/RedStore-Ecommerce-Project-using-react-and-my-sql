import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext'; // ✅ Use context
import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';
import SkeletonCard from '../ui/SkeletonCard';

const ProductList = ({ onQuickBuy, productsOverride }) => {
    // ✅ Get products from context instead of custom hook
    const { products, loading, error } = useContext(ProductsContext);
    const list = Array.isArray(productsOverride) ? productsOverride : products;

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 text-xl">Failed to load products. Please try again later.</p>
                <p className="text-sm text-gray-500 mt-2">{error}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {list.map(product => (
                <ProductCard key={product.id} product={product} onQuickBuy={onQuickBuy} />
            ))}
        </div>
    );
};

export default ProductList;