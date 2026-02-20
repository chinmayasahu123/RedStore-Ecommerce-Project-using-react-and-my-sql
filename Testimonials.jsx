import user1Img from '../../assets/images/user-1.png';
import user2Img from '../../assets/images/user-2.png';
import user3Img from '../../assets/images/user-3.png';

const Testimonials = () => {
    const testimonials = [
        { name: 'Sean Parker', img: user1Img },
        { name: 'Mike Smith', img: user2Img },
        { name: 'Mabel Joe', img: user3Img },
    ];
    return (
        <div className="my-20">
            <h2 className="text-3xl font-bold text-center my-12 dark:text-dark-text-primary relative title">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {testimonials.map(t => (
                    <div key={t.name} className="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                        <p className="text-text-secondary dark:text-dark-text-secondary mb-4 italic">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, natus! Lorem ipsum dolor sit amet."</p>
                        <img loading="lazy" src={t.img} alt={t.name} className="w-20 h-20 rounded-full mx-auto border-4 border-primary" />
                        <h3 className="font-bold mt-4 text-text-primary dark:text-dark-text-primary">{t.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Testimonials;