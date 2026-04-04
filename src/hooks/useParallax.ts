import { useScroll, useTransform } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';

interface ParallaxOptions {
  offset?: [string, string];
  speed?: number;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { offset = ['start end', 'end start'], speed = 0.5 } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  return {
    ref,
    y,
    opacity,
    scale,
    scrollYProgress,
  };
}

export function useMouseParallax(strength: number = 20) {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    mouseX.current = (clientX - innerWidth / 2) / innerWidth * strength;
    mouseY.current = (clientY - innerHeight / 2) / innerHeight * strength;
  };
  
  return {
    handleMouseMove,
    getTransform: () => `translate(${mouseX.current}px, ${mouseY.current}px)`,
    x: mouseX.current,
    y: mouseY.current,
  };
}

export function useSmoothScroll() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return { scrollTo };
}
