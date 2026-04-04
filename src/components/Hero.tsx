import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 24, stiffness: 160 });
  const y = useSpring(mouseY, { damping: 24, stiffness: 160 });
  const bgX = useTransform(x, [-500, 500], [20, -20]);
  const bgY = useTransform(y, [-500, 500], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="premium-section relative flex min-h-[92vh] items-center justify-center overflow-hidden pt-32 pb-28 md:pb-36"
    >
      <div className="section-seam section-seam-bottom" />

      <motion.div className="absolute inset-0" style={{ x: bgX, y: bgY }}>
        <div className="absolute inset-0 bg-white" />
        <div className="absolute left-0 top-0 h-[18rem] w-[28rem] bg-[#2f3a45] [clip-path:polygon(0_0,100%_0,48%_100%,0_100%)]" />
        <div className="absolute left-[8%] top-0 h-[11rem] w-[34rem] bg-[#ffc100] [clip-path:polygon(0_0,100%_0,86%_100%,12%_100%)]" />
        <div className="absolute left-[12%] top-0 h-[8rem] w-[30rem] bg-[#eda117] [clip-path:polygon(0_0,100%_0,84%_100%,18%_100%)]" />
        <div className="absolute bottom-0 left-0 h-[12rem] w-[24rem] bg-[#ffc100] [clip-path:polygon(0_0,82%_100%,0_100%)]" />
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="floating-orb left-[-5rem] top-20 h-[26rem] w-[26rem] bg-[rgba(47,58,69,0.04)]" />
      </motion.div>

      <div className="section-shell relative z-10 py-20 text-center md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow mx-auto mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-[#ffc100]" />
          <span>Refined travel, considered in every detail.</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-title mx-auto mb-6 max-w-6xl text-5xl font-extrabold leading-[0.94] tracking-[-0.05em] md:text-7xl lg:text-8xl"
        >
          Travel, arranged with
          <br />
          <span className="text-gradient">greater clarity</span>
          <br />
          and quieter luxury
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="section-copy mx-auto max-w-3xl text-lg leading-8 md:text-2xl md:leading-10"
        >
          From private holidays to corporate movement and tailored itineraries, every journey is
          shaped with composure, precision, and a more elevated sense of care.
        </motion.p>
      </div>
    </section>
  );
}
