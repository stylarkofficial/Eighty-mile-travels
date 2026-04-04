import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Card3D from './Card3D';

const pathways = [
  {
    title: 'Personal Journeys',
    subtitle: 'For individual travel and holidays',
    summary: 'A refined route for holidays, leisure movement, and personal bookings.',
    detail:
      'Flights, stays, visa support, holiday planning, and travel coordination are arranged as one calm experience. The focus stays on comfort, timing, better rates, and a cleaner journey from the first enquiry to the return.',
    accent: 'rgba(255, 221, 64, 0.22)',
  },
  {
    title: 'Corporate and MICE',
    subtitle: 'For teams, executives, and events',
    summary: 'A structured pathway for business movement, meetings, incentives, and conferences.',
    detail:
      'Corporate itineraries, MICE movement, hotel blocks, forex, insurance, and executive travel support are coordinated with tighter control. The result is a more dependable system for leadership travel and larger group movement.',
    accent: 'rgba(47, 49, 52, 0.12)',
  },
  {
    title: 'Customised Plans',
    subtitle: 'For more specific requirements',
    summary: 'A flexible format for journeys that need a more considered brief.',
    detail:
      'When the requirement is more particular, the plan can be shaped directly around route, purpose, pace, and support level. The engagement stays personal, with consultation-led planning and direct contact over call or mail.',
    accent: 'rgba(255, 255, 255, 0.68)',
  },
];

export default function Packages() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activePathway = useMemo(
    () => (activeIndex === null ? null : pathways[activeIndex]),
    [activeIndex],
  );

  return (
    <section
      id="packages"
      className="premium-section relative py-40 lg:py-48"
      onMouseLeave={() => setActiveIndex(null)}
    >
      <div className="section-shell relative">
        <motion.div
          className="mb-18 text-center md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow mb-6">Travel Pathways</span>
          <h2 className="section-title mb-6 text-4xl font-extrabold md:text-6xl">
            Three distinct ways to
            <br />
            <span className="text-gradient">frame the journey</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex((current) => (current === index ? null : current))}
              onFocus={() => setActiveIndex(index)}
              className="relative"
            >
              <Card3D className="h-full">
                <article className="premium-card relative min-h-[380px] p-9 md:p-10">
                  <div
                    className="absolute inset-x-6 top-6 h-28 rounded-[1.8rem] blur-3xl"
                    style={{ background: pathway.accent }}
                  />
                  <div className="premium-card-content relative flex h-full flex-col">
                    <div className="mb-8 inline-flex w-fit rounded-full border border-[rgba(67,71,75,0.08)] bg-[rgba(226,230,236,0.82)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-blue-900)]">
                      {pathway.subtitle}
                    </div>
                    <h3 className="mb-5 text-3xl font-bold tracking-[-0.04em] text-[color:var(--color-slate-900)]">
                      {pathway.title}
                    </h3>
                    <p className="max-w-[30ch] text-[15px] leading-8 text-[color:var(--color-slate-700)]">
                      {pathway.summary}
                    </p>

                    <div className="mt-auto flex items-end justify-between pt-14">
                      <div className="text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--color-slate-500)]">
                        Explore by movement
                      </div>
                      <div className="rounded-full border border-[rgba(67,71,75,0.08)] bg-[rgba(226,230,236,0.9)] px-4 py-2 text-sm font-semibold text-[color:var(--color-slate-900)] shadow-[0_12px_32px_rgba(47,49,52,0.08)]">
                        Open brief
                      </div>
                    </div>
                  </div>
                </article>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activePathway && (
          <>
            <motion.div
              className="pointer-events-none fixed inset-0 z-40 backdrop-blur-[18px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: 'rgba(241, 242, 238, 0.58)' }}
            />
            <motion.div
              className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-6 md:p-10"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            >
              <div className="w-full max-w-[38rem]">
                <div className="premium-card relative overflow-hidden px-8 py-8 md:px-12 md:py-12">
                  <div
                    className="absolute inset-x-10 top-8 h-36 rounded-full blur-3xl"
                    style={{ background: activePathway.accent }}
                  />
                  <div className="premium-card-content relative">
                    <div className="mb-5 inline-flex rounded-full border border-[rgba(67,71,75,0.08)] bg-[rgba(226,230,236,0.88)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-blue-900)]">
                      {activePathway.subtitle}
                    </div>
                    <h3 className="mb-5 text-3xl font-bold tracking-[-0.04em] text-[color:var(--color-slate-900)] md:text-4xl">
                      {activePathway.title}
                    </h3>
                    <p className="text-base leading-8 text-[color:var(--color-slate-700)] md:text-[17px]">
                      {activePathway.detail}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
