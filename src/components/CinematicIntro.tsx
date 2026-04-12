import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(() => onComplete(), 2600);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[100] overflow-hidden" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#2d2d2a_0%,#575750_100%)]" />
        <motion.div className="absolute -left-[8%] top-[12%] h-[34rem] w-[34rem] rounded-full bg-[rgba(255,208,0,0.18)] blur-[88px]" animate={{ x: [0, 26, 0], y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.div className="absolute right-[-8%] bottom-[8%] h-[28rem] w-[28rem] rounded-full bg-[rgba(255,208,0,0.12)] blur-[80px]" animate={{ x: [0, -24, 0], y: [0, 16, 0] }} transition={{ duration: 5.5, repeat: Infinity }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.div className="text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mx-auto mb-8 h-20 w-20 rounded-[2rem] border border-white/12 bg-[rgba(255,255,255,0.08)] shadow-[0_24px_70px_rgba(0,0,0,0.18)]" />
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.36em] text-white/65">Eighty Mile Travel</p>
            <h2 className="mb-6 text-4xl font-extrabold tracking-[-0.05em] text-white md:text-6xl">
              Preparing a
              <span className="text-[color:#ffd000]"> refined journey</span>
            </h2>
            <div className="mx-auto h-[2px] w-full max-w-md overflow-hidden rounded-full bg-white/12">
              <motion.div className="h-full rounded-full bg-[#ffd000]" animate={{ x: ['-110%', '110%'] }} transition={{ duration: 1.8, repeat: Infinity }} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
