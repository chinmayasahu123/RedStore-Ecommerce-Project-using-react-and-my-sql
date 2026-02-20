import { useContext, useEffect, useMemo, useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { Link } from 'react-router-dom';

function useCountdown(targetMs) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, targetMs - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s };
}

export default function FlashSale() {
  const saleEndsAt = useMemo(() => Date.now() + 1000 * 60 * 60 * 8, []); // 8 hours from mount
  const { h, m, s } = useCountdown(saleEndsAt);
  const { products } = useContext(ProductsContext);
  const picks = (products || []).slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-rose-600 text-white p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">Flash Sale</h2>
            <p className="opacity-90">Grab premium picks before the timer runs out!</p>
          </div>
          <div className="flex items-center gap-3 text-center">
            <TimePill label="Hrs" value={h} />
            <TimePill label="Min" value={m} />
            <TimePill label="Sec" value={s} />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {picks.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className="rounded-xl bg-white/10 backdrop-blur p-3 hover:bg-white/15 transition">
              <img src={p.image} alt={p.title} className="h-24 w-full object-contain bg-white rounded-lg" />
              <div className="mt-2 text-sm line-clamp-2">{p.title}</div>
              <div className="font-semibold">₹{p.price}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimePill({ label, value }) {
  const v = String(value).padStart(2, '0');
  return (
    <div className="min-w-[64px] rounded-xl bg-white/15 px-3 py-2">
      <div className="text-xl font-bold leading-none">{v}</div>
      <div className="text-[10px] uppercase opacity-80">{label}</div>
    </div>
  );
}
