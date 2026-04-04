import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  glareEnabled?: boolean;
  depth?: number;
}

export default function Card3D({
  children,
  className = '',
  glareEnabled = true,
  depth = 16,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 18, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [depth, -depth]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-depth, depth]), springConfig);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['18%', '82%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['18%', '82%']);
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255, 193, 0, 0.16) 0%, rgba(47, 58, 69, 0.12) 24%, transparent 60%)`;
  const borderBackground = useMotionTemplate`linear-gradient(145deg, rgba(47,58,69,0.08), rgba(255, 193, 0, 0.18), rgba(255,255,255,0.3))`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const resetTilt = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-image ${className}`}
      style={{
        perspective: '1400px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTilt}
    >
      <motion.div
        className="relative h-full w-full preserve-3d"
        style={{ rotateX, rotateY }}
        animate={{
          scale: isHovered ? 1.018 : 1,
          y: isHovered ? -6 : 0,
        }}
        transition={{ type: 'spring', damping: 18, stiffness: 200 }}
      >
        <motion.div
          className="absolute -inset-px rounded-[2rem]"
          style={{ background: borderBackground }}
          animate={{
            opacity: isHovered ? 1 : 0.56,
            boxShadow: isHovered
              ? '0 34px 80px rgba(47, 49, 52, 0.16)'
              : '0 24px 60px rgba(47, 49, 52, 0.08)',
          }}
        />

        <motion.div
          className="absolute -inset-8 -z-10 rounded-[2.6rem] blur-2xl"
          style={{ background: glowBackground }}
          animate={{
            opacity: isHovered ? 1 : 0.42,
            scale: isHovered ? 1.04 : 0.96,
          }}
        />

        <div className="relative z-10 h-full w-full preserve-3d">
          {children}
        </div>

        {glareEnabled && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[2rem]"
            style={{ background: glowBackground }}
            animate={{ opacity: isHovered ? 1 : 0.34 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
