import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mapDestinations = [
  { id: 1, name: 'Paris', country: 'France', x: 48, y: 32, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
  { id: 2, name: 'Tokyo', country: 'Japan', x: 85, y: 38, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400' },
  { id: 3, name: 'New York', country: 'USA', x: 25, y: 35, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
  { id: 4, name: 'Dubai', country: 'UAE', x: 60, y: 45, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
  { id: 5, name: 'Sydney', country: 'Australia', x: 88, y: 75, image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400' },
  { id: 6, name: 'Maldives', country: 'Maldives', x: 68, y: 55, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400' },
  { id: 7, name: 'Bali', country: 'Indonesia', x: 78, y: 60, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
  { id: 8, name: 'Cape Town', country: 'South Africa', x: 52, y: 78, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400' },
];

export default function InteractiveMap() {
  const [selectedDestination, setSelectedDestination] = useState<typeof mapDestinations[0] | null>(null);
  const [hoveredDestination, setHoveredDestination] = useState<number | null>(null);

  return (
    <section className="premium-section relative py-32">
      <div className="section-shell relative">
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="eyebrow mb-6">Interactive Exploration</span>
          <h2 className="section-title mb-6 text-4xl font-extrabold md:text-6xl">
            Explore Our
            <br />
            <span className="text-gradient">Global Destinations</span>
          </h2>
          <p className="section-copy mx-auto max-w-2xl text-lg md:text-xl">
            Click on any destination to discover more about what awaits you there.
          </p>
        </motion.div>

        <motion.div className="premium-card relative overflow-hidden p-8" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="premium-card-content relative aspect-[2/1] min-h-[420px]">
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 100 50" className="h-full w-full text-[color:var(--color-blue-900)]">
                <ellipse cx="15" cy="25" rx="12" ry="15" fill="currentColor" />
                <ellipse cx="50" cy="22" rx="15" ry="12" fill="currentColor" />
                <ellipse cx="48" cy="38" rx="8" ry="10" fill="currentColor" />
                <ellipse cx="70" cy="30" rx="10" ry="15" fill="currentColor" />
                <ellipse cx="85" cy="40" rx="8" ry="10" fill="currentColor" />
              </svg>
            </div>

            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 50" className="h-full w-full">
                {[...Array(10)].map((_, i) => <line key={`h-${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke="#a7a19a" strokeWidth="0.12" />)}
                {[...Array(20)].map((_, i) => <line key={`v-${i}`} x1={i * 5} y1="0" x2={i * 5} y2="50" stroke="#a7a19a" strokeWidth="0.12" />)}
              </svg>
            </div>

            {mapDestinations.map((dest) => (
              <motion.div
                key={dest.id}
                className="absolute cursor-pointer"
                style={{ left: `${dest.x}%`, top: `${dest.y}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setHoveredDestination(dest.id)}
                onMouseLeave={() => setHoveredDestination(null)}
                onClick={() => setSelectedDestination(dest)}
              >
                <motion.div className="absolute inset-0 -m-4 h-8 w-8 rounded-full bg-[rgba(126,200,248,0.26)]" animate={{ scale: [1, 1.6, 1], opacity: [0.55, 0, 0.55] }} transition={{ duration: 2, repeat: Infinity, delay: dest.id * 0.2 }} />
                <motion.div className={`relative h-4 w-4 rounded-full ${hoveredDestination === dest.id || selectedDestination?.id === dest.id ? 'bg-[linear-gradient(135deg,#f6be22_0%,#d4a010_72%,#b88a00_100%)]' : 'bg-white'}`} whileHover={{ scale: 1.45 }} animate={{ scale: selectedDestination?.id === dest.id ? 1.4 : 1 }} style={{ boxShadow: '0 0 20px rgba(209, 166, 60, 0.4)' }} />
                <AnimatePresence>
                  {hoveredDestination === dest.id && (
                    <motion.div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                      <div className="glass rounded-lg px-3 py-1 text-sm font-semibold text-[color:var(--color-slate-900)]">{dest.name}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            <svg className="absolute inset-0 h-full w-full pointer-events-none">
              {selectedDestination && mapDestinations.filter((d) => d.id !== selectedDestination.id).map((dest) => (
                <motion.line key={dest.id} x1={`${selectedDestination.x}%`} y1={`${selectedDestination.y}%`} x2={`${dest.x}%`} y2={`${dest.y}%`} stroke="rgba(77,165,230,0.38)" strokeWidth="1" strokeDasharray="5,5" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: dest.id * 0.05 }} />
              ))}
            </svg>
          </div>

          <AnimatePresence>
            {selectedDestination && (
              <motion.div className="absolute bottom-8 left-8 right-8 md:left-auto md:w-80" initial={{ opacity: 0, y: 20, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.92 }}>
                <div className="premium-card overflow-hidden">
                  <img src={selectedDestination.image} alt={selectedDestination.name} className="h-40 w-full object-cover" />
                  <div className="premium-card-content p-4">
                    <h3 className="text-xl font-bold text-[color:var(--color-slate-900)]">{selectedDestination.name}</h3>
                    <p className="mb-4 text-[color:var(--color-slate-700)]">{selectedDestination.country}</p>
                    <div className="flex gap-2">
                      <motion.button className="cursor-button premium-button-primary flex-1 py-3 text-sm font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Explore</motion.button>
                      <motion.button className="cursor-button premium-button-secondary px-4 py-3 text-sm font-semibold" onClick={() => setSelectedDestination(null)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Close</motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div className="mt-8 flex flex-wrap justify-center gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {mapDestinations.map((dest) => (
            <motion.button key={dest.id} className={`cursor-button rounded-xl px-4 py-2 text-sm font-semibold ${selectedDestination?.id === dest.id ? 'premium-chip premium-chip-active' : 'premium-chip'}`} onClick={() => setSelectedDestination(dest)} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              {dest.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
