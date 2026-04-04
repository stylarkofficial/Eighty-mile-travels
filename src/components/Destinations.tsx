import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card3D from './Card3D';
import WaveDivider from './WaveDivider';

const destinations = [
  { id: 1, name: 'Jaipur', country: 'India', category: 'india', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800', description: 'India holidays shaped for individual travellers who want comfort, value, and cleaner planning.', rating: 4.8, price: 'India' },
  { id: 2, name: 'Kerala', country: 'India', category: 'india', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', description: 'Calm routes, scenic stays, and premium coordination for personal and family travel.', rating: 4.9, price: 'India' },
  { id: 3, name: 'Maldives', country: 'International', category: 'international', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', description: 'International escapes supported with travel, stay, and booking assistance from one point of contact.', rating: 4.9, price: 'International' },
  { id: 4, name: 'Paris', country: 'International', category: 'international', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', description: 'A polished choice for international travel, premium movement, and elevated holiday planning.', rating: 4.8, price: 'International' },
  { id: 5, name: 'Santorini', country: 'Must See', category: 'mustsee', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800', description: 'One of our must-see premium picks for memorable travel and standout experiences.', rating: 4.8, price: 'Must See' },
  { id: 6, name: 'Bali', country: 'Must See', category: 'mustsee', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', description: 'A must-see destination that works beautifully for both ready plans and tailored journeys.', rating: 4.7, price: 'Must See' },
  { id: 7, name: 'Goa', country: 'India', category: 'india', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', description: 'Quick domestic getaways designed to keep travel smooth, crisp, and premium without feeling rushed.', rating: 4.7, price: 'India' },
  { id: 8, name: 'Swiss Alps', country: 'International', category: 'international', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800', description: 'Strong for international premium travel and polished enough for small executive movements too.', rating: 4.9, price: 'International' },
];

const filters = [
  { id: 'all', label: 'All Holidays' },
  { id: 'india', label: 'India' },
  { id: 'international', label: 'International' },
  { id: 'mustsee', label: 'Must See' },
];

export default function Destinations() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const filteredDestinations = destinations.filter((d) => activeFilter === 'all' || d.category === activeFilter);

  return (
    <section id="destinations" className="premium-section premium-section-alt relative py-32">
      <WaveDivider position="top" inverted className="opacity-75" />
      <div className="section-shell relative">
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="eyebrow mb-6">Our Holidays</span>
          <h2 className="section-title text-4xl font-extrabold mb-6 md:text-6xl">
            India, International,
            <br />
            <span className="text-gradient">and Must See Picks</span>
          </h2>
          <p className="section-copy mx-auto max-w-3xl text-lg md:text-xl">
            Holidays are presented the way your audience thinks about them first: clear choices,
            premium spacing, and enough room to explore without pressure.
          </p>
        </motion.div>

        <motion.div className="mb-12 flex flex-wrap justify-center gap-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          {filters.map((filter) => (
            <motion.button key={filter.id} className={`cursor-button rounded-2xl px-6 py-3 text-sm font-semibold transition-all ${activeFilter === filter.id ? 'premium-chip premium-chip-active' : 'premium-chip'}`} onClick={() => setActiveFilter(filter.id)} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" layout>
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((destination, index) => (
              <motion.div key={destination.id} layout initial={{ opacity: 0, scale: 0.86 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.88 }} transition={{ duration: 0.4, delay: index * 0.06 }}>
                <Card3D className="h-full">
                  <motion.div className="premium-card relative h-[420px]" onMouseEnter={() => setHoveredCard(destination.id)} onMouseLeave={() => setHoveredCard(null)}>
                    <motion.img src={destination.image} alt={destination.name} className="absolute inset-0 h-full w-full object-cover" animate={{ scale: hoveredCard === destination.id ? 1.08 : 1 }} transition={{ duration: 0.45 }} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,44,41,0.04)_0%,rgba(47,44,41,0.18)_35%,rgba(47,44,41,0.88)_100%)]" />
                    <div className="premium-card-content absolute inset-0 flex flex-col justify-between p-6">
                      <div className="flex justify-end">
                        <div className="glass rounded-full px-3 py-1 text-sm font-semibold text-white">
                          <span className="mr-1 text-[color:var(--color-blue-500)]">★</span>
                          {destination.rating}
                        </div>
                      </div>

                      <div style={{ transform: 'translateZ(28px)' }}>
                        <div className="mb-1 text-sm text-white/70">{destination.country}</div>
                        <h3 className="mb-2 text-2xl font-bold text-white">{destination.name}</h3>
                        <p className="mb-4 text-sm leading-6 text-white/78">{destination.description}</p>
                        <div className="flex items-end justify-between">
                          <div>
                            <span className="text-xs uppercase tracking-[0.2em] text-white/55">Category</span>
                            <div className="text-2xl font-extrabold text-white">{destination.price}</div>
                          </div>
                          <motion.button className="cursor-button premium-button-primary h-12 w-12 rounded-full p-0" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                            <svg className="mx-auto h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
