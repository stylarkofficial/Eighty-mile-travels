import { motion } from 'framer-motion';
import Card3D from './Card3D';

const interestCards = [
  { id: 1, title: 'Travel Facts', subtitle: 'Interesting', description: 'Our world is filled with absolutely mind blowing facts. Here are some really interesting ones which will keep you glued.', icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" /></svg>, bgImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800', cta: 'View Travel Facts' },
  { id: 2, title: 'Earn With Us', subtitle: 'Revenue', description: 'Without investing a single penny, you can earn just through your strong network and contacts. Call us to know more.', icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V7a2 2 0 012-2h10a2 2 0 012 2v14M9 10h1m4 0h1M9 14h1m4 0h1" /></svg>, bgImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800', cta: 'Explore Revenue' },
  { id: 3, title: 'Our Creatives', subtitle: 'Creatives', description: 'We believe in visuals. It gets the message out in a more appealing and amazing way than just words. Check it out.', icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 5h8m-8 5h5M6 3h12a2 2 0 012 2v14l-4-3H6a2 2 0 01-2-2V5a2 2 0 012-2z" /></svg>, bgImage: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800', cta: 'See Our Creatives' },
];

export default function InterestSection() {
  return (
    <section className="premium-section relative py-32">
      <div className="section-shell relative">
        <motion.div className="mb-16 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="eyebrow mb-6">This Will Definitely Interest You</span>
          <h2 className="section-title mb-6 text-4xl font-extrabold md:text-6xl">
            Interesting Travel,
            <br />
            <span className="text-gradient">Revenue, and Visual Storytelling</span>
          </h2>
          <p className="section-copy mx-auto max-w-3xl text-lg md:text-xl">
            This section keeps the original Travelops interest categories while the overall site
            still prioritises individuals first, corporate second, and customised support third.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {interestCards.map((card, index) => (
            <motion.div key={card.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }}>
              <Card3D depth={14}>
                <motion.div className="premium-card relative h-[460px]" whileHover={{ y: -6 }}>
                  <motion.img src={card.bgImage} alt={card.title} className="absolute inset-0 h-full w-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.55 }} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(79,55,17,0.18)_0%,rgba(47,44,41,0.85)_100%)]" />
                  <div className="premium-card-content absolute inset-0 flex flex-col justify-between p-8">
                    <motion.div className="glass flex h-20 w-20 items-center justify-center rounded-[1.6rem] text-white" style={{ transform: 'translateZ(36px)' }} whileHover={{ rotate: 6, scale: 1.08 }}>
                      {card.icon}
                    </motion.div>

                    <div style={{ transform: 'translateZ(28px)' }}>
                      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/72">{card.subtitle}</span>
                      <h3 className="mt-3 mb-4 text-3xl font-bold text-white">{card.title}</h3>
                      <p className="mb-6 leading-7 text-white/82">{card.description}</p>
                      <motion.button className="cursor-button premium-button-secondary inline-flex items-center gap-2 px-6 py-3 font-semibold" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                        {card.cta}
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
