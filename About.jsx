import { FaRocket, FaUsers, FaLeaf, FaShieldAlt, FaCrown, FaGem, FaAward, FaInfinity } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="bg-gradient-to-b from-white via-[#faf7f5] to-white dark:from-dark-surface dark:via-[#0f0f14] dark:to-dark-surface text-gray-800 dark:text-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl mb-16 shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.18),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(147,51,234,0.18),transparent_45%)] pointer-events-none" />
          <div className="relative text-center px-6 py-16 md:py-20 bg-white/70 dark:bg-black/30 backdrop-blur">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600"
            >
              Redstore, Crafted for the Connoisseur
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Where elevated design, curated selections, and world‑class service come together. Expect timeless quality, modern luxury, and an experience tailored for you.
            </motion.p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-sm font-semibold">
                <FaCrown /> Elite curation
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-sm font-semibold">
                <FaGem /> Premium finishes
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-sm font-semibold">
                <FaInfinity /> Seamless experience
              </span>
            </div>
          </div>
        </div>

        {/* Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[{ label: 'Happy Clients', value: '250K+' }, { label: 'Curated Brands', value: '300+' }, { label: 'Avg. Rating', value: '4.9/5' }, { label: 'Countries Served', value: '40+' }].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-amber-100/60 dark:border-gray-700 shadow-sm px-6 py-6 text-center">
              <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">{s.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        



        {/* Our Values – Glass Cards */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">Our Principles of Excellence</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[{
              icon: <FaRocket className="text-4xl" />, title: 'Innovation', desc: 'Pushing boundaries to craft delightful experiences.'
            }, {
              icon: <FaUsers className="text-4xl" />, title: 'Customer First', desc: 'Every decision begins and ends with you.'
            }, {
              icon: <FaLeaf className="text-4xl" />, title: 'Sustainability', desc: 'Responsible choices for a better tomorrow.'
            }, {
              icon: <FaShieldAlt className="text-4xl" />, title: 'Trust & Security', desc: 'Bank‑grade security and transparent policies.'
            }].map((card) => (
              <div key={card.title} className="p-8 rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-gray-200/60 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mx-auto mb-4 w-16 h-16 grid place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-white shadow">
                  {card.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Craftsmanship */}
        <div className="mb-20 grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4">Craftsmanship & Materials</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collaborate with best‑in‑class manufacturers and artisans across the globe. Every product undergoes stringent multi‑point quality checks to meet our luxury standards.
            </p>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Hand‑picked, ethically sourced materials</li>
              <li>• Premium finishes with long‑lasting durability</li>
              <li>• Warranty‑backed confidence on major categories</li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <div className="h-72 md:h-[420px] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg relative w-full">
              <img
                src="https://images.unsplash.com/photo-1520975867597-0f0be7a5c8d4?q=80&w=1400&auto=format&fit=crop"
                alt="Artisan crafting premium materials"
                className="w-full h-full object-cover block"
                loading="lazy"
                onError={(e) => { 
                  const fallbackA = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop';
                  const fallbackB = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1400&auto=format&fit=crop';
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src = e.currentTarget.src.includes('1517245386807') ? fallbackB : fallbackA; 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.12),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_45%)]" />
            </div>
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {[
              { name: 'Anita Dsouza', role: 'CEO', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
              { name: 'Ravi Kumar', role: 'CTO', img: 'https://randomuser.me/api/portraits/men/75.jpg' },
              { name: 'Sara Ali', role: 'Marketing Lead', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
            ].map((person) => (
              <div key={person.name} className="bg-white/80 dark:bg-gray-900/70 backdrop-blur rounded-2xl p-6 shadow border border-gray-200 dark:border-gray-700">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-amber-400 object-cover"
                />
                <h3 className="font-semibold text-lg">{person.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{person.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted by Brands */}
        <div className="mb-20">
          <div className="text-center mb-6">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400">Trusted by Leading Brands</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 items-center opacity-80">
            {["Aurum","Velora","Monarch","Zénith","Luxeon","Prestiq"].map((b)=> (
              <div key={b} className="py-3 px-4 rounded-xl bg-white/70 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                {b}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-10 rounded-2xl text-center shadow-xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white">
          <h2 className="text-2xl font-semibold mb-2">Experience Premium Living, Every Day</h2>
          <p className="mb-5 text-white/90">Explore curated collections, premium benefits, and member‑only drops.</p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Shop Collections
            <FaAward />
          </a>
        </div>
      </div>
    </div>
  );
}
