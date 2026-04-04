import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  { id: 1, name: 'Mahipal Jain', role: 'Cognizant', content: 'Thorough professionals. Very prompt. Travelops has always given us the most competitive rates when it comes to airfares and hotels. Travelops is our one point contact for anything travel related.', rating: 5, destination: 'Corporate Travel' },
  { id: 2, name: 'Anuj Doshi', role: 'Ramakant & Co.', content: 'Travelling is a confusing thing with tons of options around you. With Travelops you can ease your life and time. Best offers and great service.', rating: 5, destination: 'Best Offers' },
  { id: 3, name: 'Avinash Rego', role: 'Maersk', content: 'Excellent management at Travelops. Extremely customer centric who always goes out of their way to make the client comfortable.', rating: 5, destination: 'Customer Support' },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="premium-section premium-section-alt relative py-36 lg:py-40">
      <div className="section-shell relative">
        <motion.div className="mb-20 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="eyebrow mb-6">Few Client Testimonials</span>
          <h2 className="section-title mb-6 text-4xl font-extrabold md:text-6xl">
            What Clients
            <br />
            <span className="text-gradient">Say About Us</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative mx-auto max-w-5xl" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 80, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -80, scale: 0.95 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="premium-card p-10 md:p-16 lg:p-20">
              <div className="premium-card-content text-center">
                <div className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f6be22_0%,#d4a010_72%,#b88a00_100%)] text-white shadow-[0_16px_36px_rgba(110,80,21,0.22)]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.17 6A5.001 5.001 0 0 0 3 10.97V18h7v-7H7.83A3.001 3.001 0 0 1 10.83 8H12V6H7.17zm9 0A5.001 5.001 0 0 0 12 10.97V18h7v-7h-2.17A3.001 3.001 0 0 1 19.83 8H21V6h-4.83z" />
                  </svg>
                </div>

                <div className="mb-5 flex justify-center gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.span key={i} className="text-xl text-yellow-500" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>★</motion.span>
                    ))}
                </div>

                <p className="mx-auto mb-10 max-w-3xl text-xl leading-9 text-[color:var(--color-slate-900)] md:text-2xl md:leading-10">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="mx-auto h-px w-20 bg-[linear-gradient(90deg,transparent,rgba(209,166,60,0.7),transparent)]" />

                <div className="mt-8 space-y-2">
                  <h4 className="text-xl font-bold text-[color:var(--color-slate-900)]">{testimonials[currentIndex].name}</h4>
                  <p className="text-[color:var(--color-slate-700)]">{testimonials[currentIndex].role}</p>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-blue-800)]">{testimonials[currentIndex].destination}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-center gap-4">
            <motion.button className="cursor-button premium-button-secondary h-12 w-12 rounded-full p-0" onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <svg className="mx-auto h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" /></svg>
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button key={index} className={`cursor-button h-3 rounded-full ${index === currentIndex ? 'bg-[linear-gradient(135deg,#f6be22_0%,#d4a010_72%,#b88a00_100%)]' : 'bg-[rgba(169,161,154,0.38)]'}`} onClick={() => setCurrentIndex(index)} whileHover={{ scale: 1.15 }} animate={{ width: index === currentIndex ? 26 : 12 }} />
              ))}
            </div>

            <motion.button className="cursor-button premium-button-secondary h-12 w-12 rounded-full p-0" onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <svg className="mx-auto h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" /></svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
