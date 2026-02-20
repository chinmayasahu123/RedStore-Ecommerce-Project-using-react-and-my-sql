import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCrown, FaRocket, FaBolt, FaShieldAlt } from 'react-icons/fa';
import ProductRecommendations from '../components/ui/ProductRecommendations';
import LoyaltyProgram from '../components/ui/LoyaltyProgram';

const PremiumFeatures = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: 'AI-Powered Recommendations',
      description: 'Machine learning algorithms analyze your preferences to suggest perfect products',
      icon: FaRocket,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'VIP Loyalty Program',
      description: 'Earn points, unlock tiers, and get exclusive rewards and benefits',
      icon: FaCrown,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Exclusive Deals',
      description: 'Access member-only discounts and limited-time offers',
      icon: FaBolt,
      color: 'from-pink-500 to-red-500'
    },
    {
      title: 'Secure Checkout',
      description: 'Safe and encrypted payments for peace of mind',
      icon: FaShieldAlt,
      color: 'from-teal-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <FaCrown className="text-6xl text-yellow-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Premium Features
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Experience the future of online shopping with our AI-powered premium features
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                🚀 AI-Powered
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                ⚡ Real-time
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                🎯 Personalized
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                🏆 Premium
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Demonstrations */}
        <div className="space-y-16">
          {/* AI Recommendations */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ProductRecommendations />
          </motion.section>

          {/* Loyalty Program */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <LoyaltyProgram />
          </motion.section>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-6">
            Ready to Experience Premium Shopping?
          </h2>
          <p className="text-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have upgraded their shopping experience with our premium features.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/products')} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Shopping Now
            </button>
            <button className="bg-white dark:bg-dark-surface border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumFeatures;
