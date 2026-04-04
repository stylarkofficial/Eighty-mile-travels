import { motion } from 'framer-motion';
import Card3D from './Card3D';

const services = [
  {
    title: 'Flights',
    blurb: 'Air fares and booking support arranged with speed and clarity.',
    image:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Hotels',
    blurb: 'Premium stays selected with better rates and smoother coordination.',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Visa',
    blurb: 'Documentation guidance shaped to keep departures effortless.',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Forex',
    blurb: 'Currency support designed for confident movement across borders.',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Train',
    blurb: 'Rail travel handled with the same care as every larger journey.',
    image:
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Cruise',
    blurb: 'Cruise itineraries arranged with refined pre and post journey support.',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Insurance',
    blurb: 'Protective cover chosen to make travel feel lighter and assured.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Euro Rail',
    blurb: 'European rail routes planned with polish, timing, and ease.',
    image:
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80',
  },
];

export default function Services() {
  return (
    <section id="services" className="premium-section premium-section-alt relative py-40 lg:py-48">
      <div className="section-seam section-seam-bottom" />
      <div className="section-shell relative">
        <motion.div
          className="mb-18 text-center md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow mb-6">Services</span>
          <h2 className="section-title mb-6 text-4xl font-extrabold md:text-6xl">
            Essential travel
            <br />
            <span className="text-gradient">services, precisely arranged</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card3D className="h-full">
                <article className="premium-card group relative min-h-[340px] p-6">
                  <div className="premium-card-content flex h-full flex-col gap-6">
                    <div className="relative overflow-hidden rounded-[1.6rem] border border-[rgba(47,49,52,0.08)]">
                      <div
                        className="h-44 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(47,49,52,0.12)_100%)]" />
                      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                        <div className="rounded-full border border-[rgba(67,71,75,0.08)] bg-[rgba(226,230,236,0.92)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-slate-900)]">
                          Service
                        </div>
                        <div className="h-9 w-9 rounded-full border border-[rgba(67,71,75,0.08)] bg-[#ffd000] shadow-[0_12px_24px_rgba(47,49,52,0.16)]" />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col">
                      <h3 className="mb-3 text-2xl font-bold tracking-[-0.04em] text-[color:var(--color-slate-900)]">
                        {service.title}
                      </h3>
                      <p className="text-[15px] leading-8 text-[color:var(--color-slate-700)]">
                        {service.blurb}
                      </p>
                    </div>
                  </div>
                </article>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
