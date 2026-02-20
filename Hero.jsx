import { Link } from 'react-router-dom';

// ✅ STEP 1: Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// ✅ STEP 2: Import Swiper styles. This is very important!
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ✅ STEP 3: Import your hero images
import heroImg1 from '../../assets/images/image1.png';
import heroImg2 from '../../assets/images/image2.png'; 
import heroImg3 from '../../assets/images/image3.png'; 

// ✅ STEP 4: Create an array of data for your slides
const slideData = [
  {
    id: 1,
    headline: "Give Your Workout A New Style",
    subheadline: "Success isn’t about greatness, it’s about consistency. Consistent hard work gains success. Greatness will come.",
    image: heroImg1,
    ctaText: "Explore Now →",
    ctaLink: "/products",
    bgColor: "bg-gradient-to-r from-white to-accent dark:from-dark-background dark:to-dark-accent",
  },
  {
    id: 2,
    headline: "Unleash Your Potential With Our Gear",
    subheadline: "Discover the latest trends and high-quality products designed to elevate your performance and personal style.",
    image: heroImg2,
    ctaText: "Shop Latest →",
    ctaLink: "/products",
    bgColor: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-blue-900",
  },
  {
    id: 3,
    headline: "Exclusive Deals Just For You!",
    subheadline: "Don't miss out on our limited-time offers. Get the best products at unbeatable prices this season.",
    image: heroImg3,
    ctaText: "View Deals →",
    ctaLink: "/products",
    bgColor: "bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-green-900",
  },
];


const Hero = () => {
  return (
    // The main container for the Swiper component
    <div className="hero-carousel-container">
      <Swiper
        // ✅ STEP 5: Configure Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="h-full" // Use a custom class if needed
      >
        {/* ✅ STEP 6: Map over your slide data to create slides dynamically */}
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`w-full ${slide.bgColor}`}>
              <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-text-primary dark:text-dark-text-primary">
                      {slide.headline}
                    </h1>
                    <p className="text-text-secondary dark:text-dark-text-secondary mb-8">
                      {slide.subheadline}
                    </p>
                    <Link
                      to={slide.ctaLink}
                      className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-80 transition duration-300 inline-block"
                    >
                      {slide.ctaText}
                    </Link>
                  </div>
                  <div className="md:w-1/2">
                    <img src={slide.image} alt={slide.headline} className="w-full h-auto max-h-[450px] object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;