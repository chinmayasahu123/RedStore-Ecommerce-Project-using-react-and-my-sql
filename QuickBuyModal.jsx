import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowLeft, FaArrowRight, FaTruck, FaShippingFast, FaClock, FaTag, FaPercent, FaGift, FaStar, FaCrown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { OrdersContext } from '../../context/OrdersContext.jsx';

const QuickBuyModal = ({ isOpen, onClose, product }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, trigger, getValues } = useForm();
    const [currentStep, setCurrentStep] = useState(1);
    const [couponData, setCouponData] = useState({ code: '', discount: 0 });
    const [shippingData, setShippingData] = useState({});
    const [selectedShipping, setSelectedShipping] = useState('standard');
    const [showSuccess, setShowSuccess] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const navigate = useNavigate();
    const { addOrder } = useContext(OrdersContext);

    const availableCoupons = [
        { code: 'LUXURY10', discount: 10, description: 'Get 10% off on your purchase' },
        { code: 'PREMIUM20', discount: 20, description: 'Premium members get 20% off' },
        { code: 'FIRST15', discount: 15, description: 'First-time buyer discount' },
        { code: 'SAVE25', discount: 25, description: 'Limited time 25% off' }
    ];

    const shippingOptions = [
        {
            id: 'standard',
            name: 'Standard Delivery',
            description: '5-7 business days',
            price: 0,
            icon: FaTruck,
            badge: 'FREE'
        },
        {
            id: 'express',
            name: 'Express Delivery',
            description: '2-3 business days',
            price: 99,
            icon: FaShippingFast,
            badge: 'FAST'
        },
        {
            id: 'overnight',
            name: 'Premium Overnight',
            description: 'Next business day',
            price: 199,
            icon: FaClock,
            badge: 'PREMIUM'
        }
    ];

    const handleApplyCoupon = () => {
        const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
        if (coupon) {
            setAppliedCoupon(coupon);
            setCouponData({ code: coupon.code, discount: coupon.discount });
            toast.success(`Coupon applied! ${coupon.discount}% discount`);
        } else {
            toast.error('Invalid coupon code');
        }
    };

    const handleSkipCoupon = () => {
        setCurrentStep(2);
    };

    const handleNextStep = async () => {
        if (currentStep === 1) {
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // Validate shipping information
            const isValid = await trigger(['fullName', 'email', 'phone', 'address', 'city', 'zip']);
            if (isValid) {
                setShippingData(getValues());
                setCurrentStep(3);
            }
        } else if (currentStep === 3) {
            setCurrentStep(4);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = async (data) => {
        return new Promise(resolve => {
            setTimeout(() => {
                const orderData = {
                    ...shippingData,
                    shippingMethod: selectedShipping,
                    coupon: appliedCoupon,
                    product,
                    subtotal: product.price + (shippingOptions.find(option => option.id === selectedShipping)?.price || 0),
                    discount: getDiscountAmount(),
                    total: getOrderTotal()
                };
                console.log("Luxury Quick Buy Order submitted:", orderData);
                // Persist order
                const items = [
                    {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        image: product.image,
                    },
                ];
                addOrder({
                    items,
                    total: orderData.total,
                    status: 'Processing',
                    shippingMethod: orderData.shippingMethod,
                    address: orderData.address,
                    userEmail: data.email,
                });
                setShowSuccess(true);
                
                // Reset and close after success
                setTimeout(() => {
                    setShowSuccess(false);
                    setCurrentStep(1);
                    setCouponData({ code: '', discount: 0 });
                    setShippingData({});
                    setSelectedShipping('standard');
                    reset();
                    onClose();
                    navigate('/orders');
                    resolve();
                }, 1200);
            }, 800);
        });
    };

    const getOrderTotal = () => {
        const shippingCost = shippingOptions.find(option => option.id === selectedShipping)?.price || 0;
        const subtotal = product.price + shippingCost;
        const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
        return subtotal - discountAmount;
    };

    const getDiscountAmount = () => {
        const shippingCost = shippingOptions.find(option => option.id === selectedShipping)?.price || 0;
        const subtotal = product.price + shippingCost;
        return appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setShowSuccess(false);
            setCurrentStep(1);
            setCouponData({ code: '', discount: 0 });
            setShippingData({});
            setSelectedShipping('standard');
            setCouponCode('');
            setAppliedCoupon(null);
            reset();
            onClose();
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return 'Apply Coupon';
            case 2: return 'Shipping Information';
            case 3: return 'Delivery Method';
            case 4: return 'Order Summary';
            default: return 'Luxury Checkout';
        }
    };

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-w-4xl w-full max-h-[95vh] overflow-y-auto backdrop-blur-sm"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Success Message */}
                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    className="absolute inset-0 bg-green-50 dark:bg-green-900 flex items-center justify-center rounded-lg z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="text-center">
                                        <motion.div
                                            className="text-6xl text-green-500 mb-4"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", duration: 0.6 }}
                                        >
                                            ✓
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                                            Order Placed Successfully!
                                        </h3>
                                        <p className="text-green-600 dark:text-green-300">
                                            Thank you for your purchase. You will receive a confirmation email shortly.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Luxury Header */}
                        <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 p-8 rounded-t-2xl">
                            <div className="absolute inset-0 bg-black/10 rounded-t-2xl"></div>
                            <div className="relative flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    {currentStep > 1 && !showSuccess && (
                                        <button
                                            onClick={handlePrevStep}
                                            disabled={isSubmitting}
                                            className="text-white/80 hover:text-white disabled:opacity-50 p-2 rounded-full hover:bg-white/10 transition-all duration-200"
                                        >
                                            <FaArrowLeft size={20} />
                                        </button>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                            <FaCrown className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-white">{getStepTitle()}</h2>
                                            <p className="text-white/80 font-medium">Step {currentStep} of 4 • Luxury Experience</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    className="text-white/80 hover:text-white disabled:opacity-50 p-2 rounded-full hover:bg-white/10 transition-all duration-200"
                                >
                                    <FaTimes size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Luxury Progress Bar */}
                        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-b border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                        currentStep >= 1 ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                                    }`}>1</div>
                                    <span className={`text-sm font-medium ${
                                        currentStep >= 1 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'
                                    }`}>Coupon</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                        currentStep >= 2 ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                                    }`}>2</div>
                                    <span className={`text-sm font-medium ${
                                        currentStep >= 2 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'
                                    }`}>Shipping Info</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                        currentStep >= 3 ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                                    }`}>3</div>
                                    <span className={`text-sm font-medium ${
                                        currentStep >= 3 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'
                                    }`}>Delivery</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                        currentStep >= 4 ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                                    }`}>4</div>
                                    <span className={`text-sm font-medium ${
                                        currentStep >= 4 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'
                                    }`}>Summary</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                                    style={{ width: `${(currentStep / 4) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="p-8">
                            {/* Luxury Product Summary */}
                            <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8 border border-purple-200/50 dark:border-purple-700/50">
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <img 
                                            src={product.image} 
                                            alt={product.title} 
                                            className="w-20 h-20 object-contain rounded-xl bg-white p-2 shadow-lg"
                                        />
                                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-1">
                                            <FaStar className="text-white" size={12} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 dark:text-white text-lg line-clamp-2 mb-2">
                                            {product.title}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                ₹{product.price.toFixed(2)}
                                            </p>
                                            <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-bold rounded-full">
                                                PREMIUM
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Step Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {currentStep === 1 && (
                                        <div className="space-y-6">
                                            <div className="text-center mb-8">
                                                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full mb-4">
                                                    <FaGift size={20} />
                                                    <span className="font-bold">Exclusive Offers Available</span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400">Apply a coupon code to save on your luxury purchase</p>
                                            </div>

                                            {/* Coupon Input */}
                                            <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <FaTag className="text-purple-500" size={20} />
                                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Enter Coupon Code</h3>
                                                </div>
                                                <div className="flex gap-3">
                                                    <input
                                                        type="text"
                                                        value={couponCode}
                                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                        placeholder="Enter coupon code (e.g., LUXURY10)"
                                                        className="flex-1 p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 font-medium"
                                                    />
                                                    <button
                                                        onClick={handleApplyCoupon}
                                                        disabled={!couponCode.trim()}
                                                        className="px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                                {appliedCoupon && (
                                                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-green-500 rounded-full">
                                                                <FaPercent className="text-white" size={12} />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-green-800 dark:text-green-300">
                                                                    {appliedCoupon.code} Applied!
                                                                </p>
                                                                <p className="text-sm text-green-600 dark:text-green-400">
                                                                    {appliedCoupon.description}
                                                                </p>
                                                            </div>
                                                            <div className="ml-auto text-right">
                                                                <p className="font-bold text-green-800 dark:text-green-300">
                                                                    -{appliedCoupon.discount}%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Available Coupons */}
                                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200/50 dark:border-yellow-700/50">
                                                <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                                    <FaGift className="text-yellow-500" />
                                                    Available Offers
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {availableCoupons.map((coupon) => (
                                                        <div
                                                            key={coupon.code}
                                                            className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-purple-300 transition-all duration-200 hover:shadow-md"
                                                            onClick={() => {
                                                                setCouponCode(coupon.code);
                                                                handleApplyCoupon();
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="font-bold text-purple-600 dark:text-purple-400">
                                                                    {coupon.code}
                                                                </span>
                                                                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                                                    {coupon.discount}% OFF
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {coupon.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={handleSkipCoupon}
                                                    className="flex-1 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 font-bold rounded-xl hover:border-gray-400 transition-all duration-200"
                                                >
                                                    Skip This Step
                                                </button>
                                                <button
                                                    onClick={handleNextStep}
                                                    className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                                >
                                                    Continue to Shipping
                                                    <FaArrowRight />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        {...register("fullName", { 
                                                            required: "Full name is required",
                                                            minLength: { value: 2, message: "Name must be at least 2 characters" }
                                                        })}
                                                        placeholder="Enter your full name"
                                                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 font-medium"
                                                    />
                                                    {errors.fullName && (
                                                        <p className="text-red-500 text-sm mt-2 font-medium">{errors.fullName.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        {...register("email", { 
                                                            required: "Email is required",
                                                            pattern: {
                                                                value: /^\S+@\S+$/i,
                                                                message: "Please enter a valid email"
                                                            }
                                                        })}
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 font-medium"
                                                    />
                                                    {errors.email && (
                                                        <p className="text-red-500 text-sm mt-2 font-medium">{errors.email.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    {...register("phone", { 
                                                        required: "Phone number is required",
                                                        pattern: {
                                                            value: /^[0-9]{10}$/,
                                                            message: "Please enter a valid 10-digit phone number"
                                                        }
                                                    })}
                                                    type="tel"
                                                    placeholder="Enter your phone number"
                                                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 font-medium"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.phone.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                    Shipping Address *
                                                </label>
                                                <textarea
                                                    {...register("address", { 
                                                        required: "Address is required",
                                                        minLength: { value: 10, message: "Address must be at least 10 characters" }
                                                    })}
                                                    placeholder="Enter your complete address"
                                                    rows="3"
                                                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 font-medium resize-none"
                                                />
                                                {errors.address && (
                                                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.address.message}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                        City *
                                                    </label>
                                                    <input
                                                        {...register("city", { 
                                                            required: "City is required",
                                                            minLength: { value: 2, message: "City must be at least 2 characters" }
                                                        })}
                                                        placeholder="Enter your city"
                                                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 font-medium"
                                                    />
                                                    {errors.city && (
                                                        <p className="text-red-500 text-sm mt-2 font-medium">{errors.city.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                                        ZIP Code *
                                                    </label>
                                                    <input
                                                        {...register("zip", { 
                                                            required: "ZIP code is required",
                                                            pattern: {
                                                                value: /^[0-9]{6}$/,
                                                                message: "Please enter a valid 6-digit ZIP code"
                                                            }
                                                        })}
                                                        placeholder="Enter ZIP code"
                                                        className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 font-medium"
                                                    />
                                                    {errors.zip && (
                                                        <p className="text-red-500 text-sm mt-2 font-medium">{errors.zip.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleNextStep}
                                                className="w-full mt-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                                            >
                                                Next: Choose Delivery Method
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                    )}

                                    {currentStep === 3 && (
                                        <div className="space-y-6">
                                            <div className="text-center mb-8">
                                                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full mb-4">
                                                    <FaTruck size={20} />
                                                    <span className="font-bold">Premium Delivery Options</span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400">Choose the delivery method that suits your needs</p>
                                            </div>
                                            <div className="space-y-4">
                                                {shippingOptions.map((option) => {
                                                    const IconComponent = option.icon;
                                                    return (
                                                        <div
                                                            key={option.id}
                                                            className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                                                selectedShipping === option.id
                                                                    ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 shadow-lg'
                                                                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                                                            }`}
                                                            onClick={() => setSelectedShipping(option.id)}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`p-3 rounded-xl ${
                                                                        selectedShipping === option.id
                                                                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                                                    }`}>
                                                                        <IconComponent size={20} />
                                                                    </div>
                                                                    <div>
                                                                        <div className="flex items-center gap-3 mb-1">
                                                                            <h4 className="font-bold text-gray-800 dark:text-white text-lg">
                                                                                {option.name}
                                                                            </h4>
                                                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                                                option.badge === 'FREE' ? 'bg-green-500 text-white' :
                                                                                option.badge === 'FAST' ? 'bg-blue-500 text-white' :
                                                                                'bg-purple-500 text-white'
                                                                            }`}>
                                                                                {option.badge}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                                                                            {option.description}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                                                        {option.price === 0 ? 'FREE' : `₹${option.price}`}
                                                                    </p>
                                                                    {selectedShipping === option.id && (
                                                                        <div className="mt-2">
                                                                            <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-bold text-sm">
                                                                                <FaStar size={12} /> Selected
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleNextStep}
                                                className="w-full mt-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                                            >
                                                Next: Review Order
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                    )}

                                    {currentStep === 4 && (
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                            <div className="text-center mb-8">
                                                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full mb-4">
                                                    <FaStar size={20} />
                                                    <span className="font-bold">Order Confirmation</span>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400">Review your order details before placing your luxury purchase</p>
                                            </div>

                                            {/* Coupon Summary */}
                                            {appliedCoupon && (
                                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-green-500 rounded-xl">
                                                            <FaGift className="text-white" size={20} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-bold text-green-800 dark:text-green-300 text-lg">Coupon Applied!</h3>
                                                            <p className="text-green-600 dark:text-green-400 font-medium">{appliedCoupon.code} - {appliedCoupon.description}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">-{appliedCoupon.discount}%</p>
                                                            <p className="text-sm text-green-500">You save ₹{getDiscountAmount().toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Shipping Information Summary */}
                                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                                                        <FaCrown className="text-white" size={16} />
                                                    </div>
                                                    <h3 className="font-bold text-gray-800 dark:text-white text-lg">Shipping Information</h3>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Full Name</p>
                                                            <p className="font-bold text-gray-800 dark:text-white">{shippingData.fullName}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Email Address</p>
                                                            <p className="font-bold text-gray-800 dark:text-white">{shippingData.email}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Phone Number</p>
                                                            <p className="font-bold text-gray-800 dark:text-white">{shippingData.phone}</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">City & ZIP</p>
                                                            <p className="font-bold text-gray-800 dark:text-white">{shippingData.city}, {shippingData.zip}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Shipping Address</p>
                                                            <p className="font-bold text-gray-800 dark:text-white">{shippingData.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delivery Method Summary */}
                                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-700/50">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                                                        <FaTruck className="text-white" size={16} />
                                                    </div>
                                                    <h3 className="font-bold text-gray-800 dark:text-white text-lg">Delivery Method</h3>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                                                            {React.createElement(shippingOptions.find(opt => opt.id === selectedShipping)?.icon, { size: 20, className: "text-white" })}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-800 dark:text-white text-lg">{shippingOptions.find(opt => opt.id === selectedShipping)?.name}</p>
                                                            <p className="text-gray-600 dark:text-gray-400 font-medium">
                                                                {shippingOptions.find(opt => opt.id === selectedShipping)?.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                            {shippingOptions.find(opt => opt.id === selectedShipping)?.price === 0 ? 'FREE' : `₹${shippingOptions.find(opt => opt.id === selectedShipping)?.price}`}
                                                        </p>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                            shippingOptions.find(opt => opt.id === selectedShipping)?.badge === 'FREE' ? 'bg-green-500 text-white' :
                                                            shippingOptions.find(opt => opt.id === selectedShipping)?.badge === 'FAST' ? 'bg-blue-500 text-white' :
                                                            'bg-purple-500 text-white'
                                                        }`}>
                                                            {shippingOptions.find(opt => opt.id === selectedShipping)?.badge}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Luxury Order Summary */}
                                            <div className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-700">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
                                                        <FaStar className="text-white" size={16} />
                                                    </div>
                                                    <h3 className="font-bold text-white text-xl">Order Summary</h3>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                                        <span className="text-gray-300 font-medium">Product Price:</span>
                                                        <span className="font-bold text-white text-lg">₹{product.price.toFixed(2)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                                        <span className="text-gray-300 font-medium">Delivery Charges:</span>
                                                        <span className="font-bold text-white text-lg">
                                                            {shippingOptions.find(opt => opt.id === selectedShipping)?.price === 0 
                                                                ? 'FREE' 
                                                                : `₹${shippingOptions.find(opt => opt.id === selectedShipping)?.price}`
                                                            }
                                                        </span>
                                                    </div>
                                                    {appliedCoupon && (
                                                        <div className="flex justify-between items-center py-3 border-b border-gray-700">
                                                            <span className="text-green-400 font-medium">Discount ({appliedCoupon.code}):</span>
                                                            <span className="font-bold text-green-400 text-lg">-₹{getDiscountAmount().toFixed(2)}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex justify-between items-center py-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl px-4">
                                                        <span className="text-xl font-bold text-white">Total Amount:</span>
                                                        <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                                            ₹{getOrderTotal().toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Luxury Place Order Button */}
                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full py-5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white font-bold text-xl rounded-2xl hover:from-green-600 hover:via-emerald-600 hover:to-green-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] flex items-center justify-center gap-3"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                                            Placing Your Order...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaCrown size={24} />
                                                            Complete Exclusive Purchase
                                                            <FaStar size={20} />
                                                        </>
                                                    )}
                                                </button>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 font-medium">
                                                    🔒 Secure checkout • Your information is protected
                                                </p>
                                            </div>
                                        </form>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

import React from 'react';

export default QuickBuyModal;
