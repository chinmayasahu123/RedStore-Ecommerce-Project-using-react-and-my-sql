import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaGift, FaStar, FaTrophy, FaCoins, FaFire } from 'react-icons/fa';

const LoyaltyProgram = () => {
  const [userPoints, setUserPoints] = useState(2450);
  const [userTier, setUserTier] = useState('Gold');
  const [showRewards, setShowRewards] = useState(false);

  const tiers = [
    { name: 'Bronze', minPoints: 0, color: 'from-amber-600 to-amber-800', icon: FaCoins },
    { name: 'Silver', minPoints: 1000, color: 'from-gray-400 to-gray-600', icon: FaStar },
    { name: 'Gold', minPoints: 2000, color: 'from-yellow-400 to-yellow-600', icon: FaCrown },
    { name: 'Platinum', minPoints: 5000, color: 'from-purple-400 to-purple-600', icon: FaTrophy }
  ];

  const rewards = [
    {
      id: 1,
      name: '₹500 Shopping Voucher',
      points: 1000,
      description: 'Use on any purchase above ₹2000',
      icon: FaGift,
      available: true
    },
    {
      id: 2,
      name: 'Free Express Shipping',
      points: 500,
      description: 'Offer valid for your next three purchases',
      icon: FaFire,
      available: true
    },
    {
      id: 3,
      name: '₹1000 Premium Voucher',
      points: 2000,
      description: 'Exclusive premium products only',
      icon: FaCrown,
      available: true
    },
    {
      id: 4,
      name: 'VIP Customer Support',
      points: 1500,
      description: 'Priority support for 6 months only',
      icon: FaTrophy,
      available: false
    }
  ];

  const getCurrentTier = () => {
    return [...tiers].reverse().find(tier => userPoints >= tier.minPoints) || tiers[0];
  };

  const getNextTier = () => {
    const currentTierIndex = tiers.findIndex(tier => tier.name === userTier);
    return currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  };

  const getProgressToNextTier = () => {
    const nextTier = getNextTier();
    if (!nextTier) return 100;
    
    const currentTier = getCurrentTier();
    const progress = ((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100;
    return Math.min(progress, 100);
  };

  const redeemReward = (reward) => {
    if (userPoints >= reward.points && reward.available) {
      setUserPoints(prev => prev - reward.points);
      alert(`Successfully redeemed: ${reward.name}!`);
    }
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const progress = getProgressToNextTier();

  return (
    <motion.div 
      className="my-12 p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-3 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <FaCrown className="text-3xl text-yellow-500" />
          <h2 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary">
            VIP Loyalty Program
          </h2>
          <FaCrown className="text-3xl text-yellow-500" />
        </motion.div>
        <p className="text-text-secondary dark:text-dark-text-secondary">
          Earn points with every purchase and unlock exclusive rewards
        </p>
      </div>

      {/* Current Status */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Points & Tier */}
        <motion.div 
          className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${currentTier.color} text-white mb-4`}>
              <currentTier.icon className="text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
              {currentTier.name} Member
            </h3>
            <div className="text-4xl font-bold text-primary dark:text-dark-primary mb-2">
              {userPoints.toLocaleString()}
            </div>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Loyalty Points
            </p>
          </div>
        </motion.div>

        {/* Progress to Next Tier */}
        <motion.div 
          className="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {nextTier ? (
            <div>
              <h4 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                Progress to {nextTier.name}
              </h4>
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
                  <motion.div 
                    className={`h-4 rounded-full bg-gradient-to-r ${nextTier.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </div>
                <div className="flex justify-between text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span>{userPoints} points</span>
                  <span>{nextTier.minPoints} points needed</span>
                </div>
              </div>
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-2">
                {nextTier.minPoints - userPoints} more points to unlock {nextTier.name} benefits!
              </p>
            </div>
          ) : (
            <div className="text-center">
              <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                Maximum Tier Achieved!
              </h4>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                You've reached the highest tier. Enjoy all premium benefits!
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Tier Benefits */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
          Your {currentTier.name} Benefits
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { title: 'Points Multiplier', value: currentTier.name === 'Bronze' ? '1x' : currentTier.name === 'Silver' ? '1.5x' : currentTier.name === 'Gold' ? '2x' : '3x' },
            { title: 'Free Shipping', value: currentTier.name === 'Bronze' ? 'Above ₹999' : 'All Orders' },
            { title: 'Early Access', value: currentTier.name === 'Bronze' ? 'No' : 'Yes' },
            { title: 'Birthday Bonus', value: currentTier.name === 'Bronze' ? '100 pts' : currentTier.name === 'Silver' ? '250 pts' : currentTier.name === 'Gold' ? '500 pts' : '1000 pts' }
          ].map((benefit, index) => (
            <div key={index} className="bg-white dark:bg-dark-surface rounded-lg p-4 text-center shadow">
              <div className="text-lg font-bold text-primary dark:text-dark-primary">
                {benefit.value}
              </div>
              <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                {benefit.title}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Rewards Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
            Available Rewards
          </h3>
          <button
            onClick={() => setShowRewards(!showRewards)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300"
          >
            {showRewards ? 'Hide Rewards' : 'View All Rewards'}
          </button>
        </div>

        {showRewards && (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                className={`relative bg-white dark:bg-dark-surface rounded-xl p-6 shadow-lg border ${
                  userPoints >= reward.points && reward.available 
                    ? 'border-green-500/70' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Status badge */}
                <div className="absolute right-3 top-3">
                  {userPoints >= reward.points && reward.available ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-0.5 text-[11px] font-semibold">
                      Redeemable
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-2 py-0.5 text-[11px] font-medium">
                      Not available
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                    userPoints >= reward.points && reward.available 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    <reward.icon className="text-xl" />
                  </div>
                  <h4 className="font-semibold text-text-primary dark:text-dark-text-primary mb-2">
                    {reward.name}
                  </h4>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
                    {reward.description}
                  </p>
                  <div className="text-lg font-bold text-primary dark:text-dark-primary mb-4">
                    {reward.points.toLocaleString()} Points
                  </div>
                  <button
                    onClick={() => redeemReward(reward)}
                    disabled={userPoints < reward.points || !reward.available}
                    aria-disabled={userPoints < reward.points || !reward.available}
                    title={userPoints < reward.points ? 'Not enough points' : (!reward.available ? 'Reward currently unavailable' : 'Redeem now')}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-transparent ${
                      userPoints >= reward.points && reward.available
                        ? 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {userPoints >= reward.points && reward.available ? 'Redeem' : 'Not Available'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* How to Earn Points */}
      <motion.div 
        className="mt-8 bg-white dark:bg-dark-surface rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4">
          How to Earn Points
        </h3>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          {[
            { action: 'Purchase', points: '1 point per ₹10', icon: '🛒' },
            { action: 'Review Product', points: '50 points', icon: '⭐' },
            { action: 'Refer Friend', points: '500 points', icon: '👥' },
            { action: 'Birthday Bonus', points: 'Tier based', icon: '🎂' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-semibold text-text-primary dark:text-dark-text-primary">
                {item.action}
              </div>
              <div className="text-sm text-primary dark:text-dark-primary font-medium">
                {item.points}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoyaltyProgram;
