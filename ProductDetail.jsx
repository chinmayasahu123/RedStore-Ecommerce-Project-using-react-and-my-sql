import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { CartContext } from '../context/CartContext';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';

export default function ProductDetail() {
    const { productId } = useParams();
    const { products, loading } = useContext(ProductsContext);
    const { addToCart } = useContext(CartContext);
    
    if (loading) return <Spinner />;

    // Find the specific product from the context
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold">Product Not Found</h1>
                <Link to="/products" className="text-primary mt-4 inline-block">Back to Products</Link>
            </div>
        );
    }
    
    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.title} added to cart!`);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="bg-white rounded-lg p-8">
                    <img src={product.image} alt={product.title} className="w-full h-auto max-h-[500px] object-contain"/>
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold mb-4">{product.title}</h1>
                    <p className="text-gray-500 mb-4 capitalize">{product.category}</p>
                    <p className="text-3xl font-bold text-primary mb-6">₹{product.price.toFixed(2)}</p>
                    <p className="text-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed">{product.description}</p>
                    <button onClick={handleAddToCart} className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-80 transition duration-300">
                        Add to Cart
                    </button>
                    <Link to="/products" className="ml-4 text-primary font-semibold">
                      &larr; Back to Products
                    </Link>
                </div>
            </div>
        </div>
    );
}