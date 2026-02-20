import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ShippingOptions from '../components/checkout/ShippingOptions'; // ✅ Import
import { OrdersContext } from '../context/OrdersContext.jsx';


export default function Checkout() {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const { addOrder } = useContext(OrdersContext);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const onSubmit = (data) => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Order submitted:", data, cartItems);
                const items = cartItems.map(ci => ({
                    id: ci.id,
                    title: ci.title,
                    price: ci.price,
                    quantity: ci.quantity,
                    image: ci.image,
                }));
                addOrder({
                    items,
                    total: subtotal,
                    status: 'Processing',
                    shippingMethod: 'Standard',
                    address: data.address,
                    userEmail: data.email,
                });
                toast.success('Order placed successfully!');
                clearCart();
                navigate('/orders');
                resolve();
            }, 1500);
        });
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
                <p className="mt-4">Add some products to get started!</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold text-center mb-12">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                         <input {...register("fullName", { required: true })} placeholder="Full Name" className="w-full p-3 border rounded-lg dark:bg-dark-background dark:border-gray-600" />
                         <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email Address" className="w-full p-3 border rounded-lg dark:bg-dark-background dark:border-gray-600" />
                         <input {...register("address", { required: true })} placeholder="Shipping Address" className="w-full p-3 border rounded-lg dark:bg-dark-background dark:border-gray-600" />
                         <input {...register("city", { required: true })} placeholder="City" className="w-full p-3 border rounded-lg dark:bg-dark-background dark:border-gray-600" />
                         <input {...register("zip", { required: true })} placeholder="ZIP Code" className="w-full p-3 border rounded-lg dark:bg-dark-background dark:border-gray-600" />
                    </form>
                    <ShippingOptions />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                    <div className="bg-gray-100 dark:bg-dark-surface p-6 rounded-lg">
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between font-bold text-xl">
                            <span>Total</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                         <button form="checkout-form" type="submit" disabled={isSubmitting} className="w-full mt-6 bg-primary text-white p-3 rounded-full font-bold hover:bg-opacity-90 transition disabled:bg-gray-400">
                             {isSubmitting ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
