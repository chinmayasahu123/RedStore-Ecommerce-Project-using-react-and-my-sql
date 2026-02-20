import playStoreImg from '../../assets/images/play-store.png';
import appStoreImg from '../../assets/images/app-store.png';
import logoWhiteImg from '../../assets/images/logo-white.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 mt-20">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Download Our App</h3>
                        <p className="mb-4">Download App for Android and iOS mobile phone.</p>
                        <div className="flex space-x-4">
                            <img src={playStoreImg} alt="Play Store" className="w-36" loading="lazy" />
                            <img src={appStoreImg} alt="App Store" className="w-36" loading="lazy" />
                        </div>
                    </div>
                    <div className="text-center">
                        <img src={logoWhiteImg} alt="Redstore White Logo" className="w-48 mx-auto mb-4" loading="lazy" />
                        <p>Our Purpose Is To Sustainably Make the Pleasure and Benefits of Sports Accessible to the Many.</p>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Useful Links</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-white">Coupons</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white">Blog Post</a></li>
                            <li className="-mb-2"><a href="#" className="hover:text-white">Return Policy</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white">Join Affiliate</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-white">Facebook</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white">Twitter</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white">Instagram</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-white">Youtube</a></li>
                        </ul>
                    </div>
                </div>
                <hr className="border-gray-700 my-8" />
                <p className="text-center text-sm">Copyright 2025 Redstore. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;