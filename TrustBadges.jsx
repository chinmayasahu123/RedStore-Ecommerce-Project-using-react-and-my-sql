import { FaShieldAlt, FaUndo, FaHeadset, FaCreditCard } from 'react-icons/fa';

const items = [
  { icon: FaShieldAlt, title: 'Secure Payments', desc: 'SSL encryption & buyer protection' },
  { icon: FaUndo, title: 'Easy Returns', desc: '7-day hassle-free returns' },
  { icon: FaHeadset, title: '24/7 Support', desc: 'We’re here anytime' },
  { icon: FaCreditCard, title: 'Multiple Methods', desc: 'UPI, Cards, Wallets, COD' },
];

export default function TrustBadges() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface p-4 flex items-start gap-3">
            <div className="rounded-xl p-3 bg-gradient-to-br from-amber-100 to-rose-100 dark:from-amber-500/20 dark:to-rose-500/20">
              <Icon className="text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="font-semibold">{title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
