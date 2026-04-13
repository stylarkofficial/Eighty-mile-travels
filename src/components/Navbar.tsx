import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Travel Pathways', href: '#packages' },
  { label: 'Services', href: '#services' },
  { label: 'Globe', href: '#globe' },
  { label: 'Our Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.35 }}
    >
      <AnimatePresence mode="wait">
        {!scrolled ? (
          <motion.nav
            key="full"
            className="px-6 py-5 md:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="section-shell flex items-center justify-between rounded-[1.6rem] border border-[rgba(47,58,69,0.08)] bg-white/92 py-4 shadow-[0_22px_70px_rgba(31,35,40,0.08)] backdrop-blur-2xl">
              <motion.a
                href="#home"
                className="ml-2 flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src="/logo.png"
                  alt="Eighty Mile Travel logo"
                  className="h-12 w-12 object-contain drop-shadow-[0_16px_32px_rgba(47,58,69,0.18)]"
                  whileHover={{ rotate: 8 }}
                />
                <span className="flex flex-col leading-none text-[color:var(--color-slate-900)]">
                  <span className="text-2xl font-extrabold tracking-tight">Eighty Mile</span>
                  <span className="text-center text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--color-slate-600)]">Travel</span>
                </span>
              </motion.a>

              <ul className="hidden items-center gap-1 lg:flex">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <motion.a
                      href={item.href}
                      className="relative px-5 py-3 text-[color:var(--color-slate-700)] transition-colors hover:text-[color:var(--color-blue-900)]"
                      onMouseEnter={() => setHoveredItem(item.label)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => setActiveItem(item.label)}
                      whileHover={{ scale: 1.03 }}
                    >
                      <span className="relative z-10 font-semibold">{item.label}</span>
                      <motion.span
                        className="absolute inset-x-3 bottom-2 h-0.5 rounded-full bg-[#ffd000]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredItem === item.label ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                      {activeItem === item.label && (
                        <motion.span
                      className="absolute inset-1 rounded-full bg-[rgba(255,193,0,0.18)]"
                          layoutId="activeNav"
                          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                        />
                      )}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                className="cursor-button premium-button-primary mr-2 px-6 py-3 text-sm font-semibold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.nav>
        ) : (
          <motion.nav
            key="pill"
            className="flex justify-center px-4 pt-4"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-center gap-1 rounded-full border border-[rgba(47,58,69,0.08)] bg-white/94 px-2 py-2 shadow-[0_26px_70px_rgba(31,35,40,0.08)] backdrop-blur-2xl"
            >
              <motion.a
                href="#home"
                className="mr-3 flex items-center gap-3 rounded-full px-2 py-1"
                whileHover={{ scale: 1.03 }}
              >
                <motion.img
                  src="/logo.png"
                  alt="Eighty Mile Travel logo"
                  className="h-10 w-10 object-contain"
                  whileHover={{ rotate: 8 }}
                />
                <span className="hidden flex-col leading-none text-[color:var(--color-slate-900)] xl:flex">
                  <span className="text-base font-extrabold tracking-tight">Eighty Mile</span>
                  <span className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-slate-600)]">Travel</span>
                </span>
              </motion.a>

              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                    activeItem === item.label
                      ? 'text-[color:var(--color-blue-950)]'
                      : 'text-[color:var(--color-slate-700)] hover:text-[color:var(--color-blue-900)]'
                  }`}
                  onClick={() => setActiveItem(item.label)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeItem === item.label && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-[rgba(255,208,0,0.22)]"
                      layoutId="activePill"
                      transition={{ type: 'spring', damping: 24, stiffness: 250 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                className="cursor-button premium-button-primary ml-2 rounded-full px-5 py-2 text-sm font-semibold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact
              </motion.a>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
