import { NavLink } from 'react-router-dom';
import { FaHome, FaBox, FaHeart, FaShoppingCart, FaClipboardList } from 'react-icons/fa';

export default function BottomNav({ onCartClick }) {
  const items = [
    { to: '/', label: 'Home', icon: FaHome },
    { to: '/products', label: 'Products', icon: FaBox },
    { to: '/favorites', label: 'Wishlist', icon: FaHeart },
    { to: '/orders', label: 'Orders', icon: FaClipboardList },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40">
      <div className="mx-auto max-w-screen-sm mb-safe bg-white/90 dark:bg-dark-surface/90 backdrop-blur border-t border-gray-200 dark:border-gray-700 rounded-t-2xl shadow-lg">
        <ul className="grid grid-cols-4 py-2">
          {items.map(({ to, label, icon: Icon }) => (
            <li key={to} className="text-center">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 py-1 text-xs font-medium ${
                    isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-300'
                  }`
                }
              >
                <Icon className="text-lg" />
                <span className="whitespace-nowrap">{label}</span>
              </NavLink>
            </li>
          ))}
          <li className="text-center">
            <button
              onClick={onCartClick}
              className="flex flex-col items-center justify-center gap-1 py-1 text-xs font-medium text-gray-500 dark:text-gray-300"
            >
              <FaShoppingCart className="text-lg" />
              <span className="whitespace-nowrap">Cart</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
