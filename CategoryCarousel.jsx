import { Link } from 'react-router-dom';

const categories = [
  { key: 'mens-clothing', title: "Men's Fashion", img: 'https://images.unsplash.com/photo-1520975693410-001d79b4f1a9?q=80&w=1200&auto=format&fit=crop' },
  { key: 'womens-clothing', title: "Women's Fashion", img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop' },
  { key: 'jewelery', title: 'Jewelry', img: 'https://images.unsplash.com/photo-1515562141207-0d3d3e4d0b66?q=80&w=1200&auto=format&fit=crop' },
  { key: 'electronics', title: 'Electronics', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop' },
];

export default function CategoryCarousel() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Shop by Category</h2>
      <div className="-mx-4 overflow-x-auto pb-2">
        <div className="px-4 inline-flex gap-4 md:gap-6">
          {categories.map((c) => (
            <Link
              to={`/products?search=${encodeURIComponent(c.title.split(' ')[0])}`}
              key={c.key}
              className="relative w-56 sm:w-64 shrink-0 rounded-2xl overflow-hidden group"
            >
              <img src={c.img} alt={c.title} className="h-36 sm:h-40 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white font-semibold text-lg flex items-center justify-between">
                <span>{c.title}</span>
                <span className="px-2 py-1 rounded-full bg-white/20 text-xs">Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
