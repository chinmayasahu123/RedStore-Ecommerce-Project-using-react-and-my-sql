import { useContext, useMemo } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCrown, FaFire } from 'react-icons/fa';

export default function TrendingStrip() {
  const { products } = useContext(ProductsContext);
  const trending = useMemo(() => (products || []).slice(-10), [products]);

  if (!trending.length) return null;

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-white"><FaCrown size={16} /></span>
        <h3 className="text-2xl font-extrabold">Trending Now</h3>
      </div>
      <div className="-mx-4 overflow-x-auto">
        <div className="px-4 inline-flex gap-4 md:gap-6">
          {trending.map((p, idx) => (
            <Link key={p.id} to={`/products/${p.id}`} className="w-40 sm:w-48 shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: Math.min(idx * 0.03, 0.2), duration: 0.25 }}
                className="relative rounded-2xl p-3 bg-white/70 dark:bg-dark-surface/70 backdrop-blur border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition"
              >
                {/* Hot badge */}
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white">
                  <FaFire /> Hot
                </span>
                {/* Price pill */}
                <span className="absolute top-2 right-2 text-[11px] font-bold px-2 py-1 rounded-full bg-black/70 text-white">
                  ₹{p.price}
                </span>
                <div className="h-28 sm:h-32 rounded-xl bg-white dark:bg-black/20 flex items-center justify-center">
                  <img src={p.image} alt={p.title} className="h-24 sm:h-28 object-contain" />
                </div>
                <div className="mt-3 text-xs sm:text-sm line-clamp-2 min-h-[2.5rem]">{p.title}</div>
                {/* Faux rating */}
                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`h-2 w-2 rounded-full ${i < 4 ? 'bg-amber-400' : 'bg-gray-300 dark:bg-gray-600'}`} />
                  ))}
                  <span className="text-[11px] text-gray-500 ml-1">4.0</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
