import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCrown, FaRocket, FaStar, FaArrowRight } from 'react-icons/fa';

const PremiumBanner = () => {
  return (
    <motion.div 
      className="my-16 mx-4 md:mx-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 animate-pulse"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <FaCrown className="text-6xl text-yellow-400 animate-bounce" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-20">
          <FaRocket className="text-4xl text-pink-400 animate-pulse" />
        </div>
        
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Header */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-4">
                <FaStar className="text-yellow-400" />
                <span className="font-bold text-sm">NEW PREMIUM FEATURES</span>
                <FaStar className="text-yellow-400" />
              </div>
            </motion.div>

            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              VIP Shopping Experience
            </motion.h2>

            <motion.p 
              className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Discover AI-powered recommendations and VIP loyalty rewards for a premium shopping experience
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              className="grid md:grid-cols-2 gap-6 mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: '🤖', title: 'AI Recommendations', desc: 'Personalized for you' },
                { icon: '👑', title: 'VIP Rewards', desc: 'Exclusive benefits' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs opacity-80">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link 
                to="/premium"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2"
              >
                Explore Premium Features
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex items-center gap-4 text-sm opacity-80">
                <span>✨ Free to explore</span>
                <span>🚀 Instant access</span>
                <span>💎 Premium quality</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              {[
                { number: '50K+', label: 'Happy Users' },
                { number: '95%', label: 'Satisfaction' },
                { number: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{stat.number}</div>
                  <div className="text-xs opacity-80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumBanner;
