import godrejLogo from '../../assets/images/logo-godrej.png';
import oppoLogo from '../../assets/images/logo-oppo.png';
import cocacolaLogo from '../../assets/images/logo-coca-cola.png';
import paypalLogo from '../../assets/images/logo-paypal.png';
import philipsLogo from '../../assets/images/logo-philips.png';

const Brands = () => {
    const logos = [
        { name: 'godrej', src: godrejLogo },
        { name: 'oppo', src: oppoLogo },
        { name: 'coca-cola', src: cocacolaLogo },
        { name: 'paypal', src: paypalLogo },
        { name: 'philips', src: philipsLogo },
    ];
    return (
        <div className="my-20">
            <h2 className="text-3xl font-bold text-center my-12 dark:text-dark-text-primary relative title">Our Top Brands</h2>
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center flex-wrap gap-8 md:gap-16">
                    {logos.map(logo => (
                        <img key={logo.name} src={logo.src} alt={`${logo.name} logo`} className="w-24 md:w-32 grayscale hover:grayscale-0 transition duration-300" loading="lazy" />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Brands;