import { useState } from 'react';
import { FaStar, FaPlayCircle } from 'react-icons/fa';

const ProductReviews = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const reviewsData = [
    {
      id: 1,
      title: 'Xiaomi Smart Band 10 Review',
      description: 'An in-depth look at the features and performance of the latest budget fitness tracker.',
      thumbnail: 'https://i.ytimg.com/vi/UV-j3tsZQJk/hqdefault.jpg',
      rating: 4,
      videoUrl: 'https://www.youtube.com/embed/UV-j3tsZQJk?autoplay=1&mute=1',
    },
    {
      id: 2,
      title: 'Samsung Galaxy Z Flip 7 Unboxing',
      description: "First impressions and a quick review of Samsung's new foldable smartphone.",
      thumbnail: 'https://i.ytimg.com/vi/NJBxI-loe9g/hqdefault.jpg',
      rating: 5,
      videoUrl: 'https://www.youtube.com/embed/NJBxI-loe9g?autoplay=1&mute=1',
    },
    {
      id: 3,
      title: 'Fitness Tracker Tier List 2025',
      description: 'A comprehensive and ranking of the best fitness trackers available this year.',
      thumbnail: 'https://i.ytimg.com/vi/zLqo7gxYhgU/hqdefault.jpg',
      rating: 4,
      videoUrl: 'https://www.youtube.com/embed/zLqo7gxYhgU?autoplay=1&mute=1',
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} />
        ))}
      </div>
    );
  };

  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold text-center mb-12 dark:text-dark-text-primary relative title">
        Product Videos & Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviewsData.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-dark-surface rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="relative group cursor-pointer" onClick={() => setActiveVideo(review.id)}>
              {activeVideo === review.id ? (
                <iframe
                  width="100%"
                  height="215"
                  src={review.videoUrl}
                  title={review.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <img src={review.thumbnail} alt={review.title} className="w-full h-48 object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaPlayCircle className="text-white text-6xl" />
                  </div>
                </>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2 text-text-primary dark:text-dark-text-primary">{review.title}</h3>
              <p className="text-text-secondary dark:text-dark-text-secondary mb-4">{review.description}</p>
              <StarRating rating={review.rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
