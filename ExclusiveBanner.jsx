import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import exclusiveImg from '../../assets/images/exclusive.png'; // Make sure this image exists

const ExclusiveBanner = () => {
  return (
    <motion.div
      className="my-20 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-800 dark:to-indigo-900 overflow-hidden"
      // Animation that fades in as the user scrolls it into view
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <p className="text-primary dark:text-dark-primary font-semibold mb-2">Exclusively Available on Redstore</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-text-primary dark:text-dark-text-primary mb-4">
              Smart Band 4
            </h1>
            <p className="text-text-secondary dark:text-dark-text-secondary mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              The Mi Smart Band 4 features a 39.9% larger AMOLED color full-touch display, with adjustable brightness, so everything is clear as can be. Monitor your health, track your workouts, and stay connected.
            </p>
            <Link
              to="/products" // You can change this to a specific product ID later
              className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-80 transition duration-300 inline-block"
            >
              Buy Now &#8594;
            </Link>
          </div>

          {/* Image Content with floating animation */}
          <motion.div
            className="flex justify-center"
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img src={exclusiveImg} alt="Smart Band 4" className="max-w-sm md:max-w-md w-full" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExclusiveBanner;