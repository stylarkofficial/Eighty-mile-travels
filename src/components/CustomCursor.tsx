import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorMode = 'default' | 'text' | 'image' | 'button' | 'pointer';

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const lastPos = useRef({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);

  const cursorXSpring = useSpring(cursorX, { damping: 24, stiffness: 280 });
  const cursorYSpring = useSpring(cursorY, { damping: 24, stiffness: 280 });
  const trailXSpring = useSpring(trailX, { damping: 36, stiffness: 190 });
  const trailYSpring = useSpring(trailY, { damping: 36, stiffness: 190 });

  const config = useMemo(() => {
    switch (mode) {
      case 'text':
        return { size: 48, trail: 88, bg: 'rgba(255,255,255,0.5)', border: 'rgba(169, 161, 154, 0.36)' };
      case 'image':
        return { size: 72, trail: 112, bg: 'rgba(47,44,41,0.92)', border: 'rgba(255,208,0,0.36)' };
      case 'button':
        return { size: 58, trail: 96, bg: 'rgba(255,208,0,0.96)', border: 'rgba(47,44,41,0.24)' };
      case 'pointer':
        return { size: 38, trail: 74, bg: 'rgba(47,44,41,0.88)', border: 'rgba(169,161,154,0.28)' };
      default:
        return { size: 14, trail: 42, bg: 'rgba(47,44,41,0.95)', border: 'rgba(255,208,0,0.3)' };
    }
  }, [mode]);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const magneticTargets = Array.from(document.querySelectorAll<HTMLElement>('button, .cursor-button, [data-magnetic="true"]'));
    const cleanup = magneticTargets.map((target) => {
      const move = (event: Event) => {
        const mouseEvent = event as MouseEvent;
        const rect = target.getBoundingClientRect();
        const offsetX = (mouseEvent.clientX - (rect.left + rect.width / 2)) * 0.12;
        const offsetY = (mouseEvent.clientY - (rect.top + rect.height / 2)) * 0.12;
        target.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      };
      const leave = () => {
        target.style.transform = '';
      };
      target.addEventListener('mousemove', move);
      target.addEventListener('mouseleave', leave);
      return () => {
        target.removeEventListener('mousemove', move);
        target.removeEventListener('mouseleave', leave);
        target.style.transform = '';
      };
    });

    return () => cleanup.forEach((fn) => fn());
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      setVelocity(Math.min(Math.sqrt(dx * dx + dy * dy), 50));
      lastPos.current = { x: clientX, y: clientY };

      cursorX.set(clientX);
      cursorY.set(clientY);
      trailX.set(clientX);
      trailY.set(clientY);

      const element = document.elementFromPoint(clientX, clientY);
      if (!element) return;

      if (
        element.matches('input, textarea, select') ||
        element.closest('input, textarea, select') ||
        element.classList.contains('cursor-text')
      ) {
        setMode('text');
        return;
      }

      if (element.classList.contains('cursor-image') || element.closest('.cursor-image')) {
        setMode('image');
        return;
      }

      if (
        element.matches('button') ||
        element.closest('button') ||
        element.classList.contains('cursor-button') ||
        element.closest('.cursor-button')
      ) {
        setMode('button');
        return;
      }

      if (element.matches('a') || element.closest('a') || element.classList.contains('cursor-pointer')) {
        setMode('pointer');
        return;
      }

      setMode('default');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY, isDesktop, trailX, trailY]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full border"
          animate={{
            width: config.size,
            height: config.size,
            scale: isClicking ? 0.88 : 1,
            backgroundColor: config.bg,
            borderColor: config.border,
          }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          style={{
            boxShadow: `0 0 ${28 + velocity}px rgba(255, 208, 0, ${0.22 + velocity * 0.008}), 0 0 28px rgba(47, 44, 41, 0.14)`,
            backdropFilter: 'blur(10px)',
          }}
        >
          {mode === 'image' && (
            <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011.5 2 1.5 1.5 0 0010 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
            </svg>
          )}
          {mode === 'button' && (
            <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3l7 4v5c0 5-3 8-7 9-4-1-7-4-7-9V7l7-4z" />
            </svg>
          )}
          {mode === 'text' && <span className="h-5 w-px rounded-full bg-[rgba(16,34,53,0.72)]" />}
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border"
          animate={{
            width: config.trail,
            height: config.trail,
            opacity: mode === 'default' ? 0.55 : 0.72,
            borderColor: 'rgba(0, 0, 0, 0.72)',
          }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          style={{
            boxShadow: '0 0 34px rgba(255, 208, 0, 0.12)',
          }}
        />
      </motion.div>

      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 z-[9997] pointer-events-none"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            className="rounded-full border border-[rgba(255,208,0,0.42)]"
            initial={{ width: 14, height: 14, opacity: 1 }}
            animate={{ width: 110, height: 110, opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </>
  );
}
