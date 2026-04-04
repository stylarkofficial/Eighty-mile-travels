"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import CinematicIntro from './components/CinematicIntro';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Packages from './components/Packages';
import Services from './components/Services';
import Industries from './components/Industries';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Globe3D = dynamic(() => import("./components/Globe3D"), {
  ssr: false,
  loading: () => <div className="h-[34rem] w-full animate-pulse rounded-full bg-[rgba(47,58,69,0.08)]" />,
});

const Globe3DSection = () => (
  <section id="globe" className="premium-dark-section relative py-28 overflow-hidden">
    <div className="section-seam section-seam-top" />
    <div className="section-seam section-seam-bottom" />
    <div className="absolute left-0 top-0 h-[16rem] w-[26rem] bg-[#2f3a45] [clip-path:polygon(0_0,100%_0,72%_100%,0_100%)]" />
    <div className="absolute right-0 bottom-0 h-[14rem] w-[18rem] bg-[#ffc100] [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
    <div className="absolute right-0 bottom-0 h-[11rem] w-[14rem] bg-[#eda117] [clip-path:polygon(100%_0,0_100%,100%_100%)] opacity-90" />
    <div className="section-shell relative">
      <motion.div
        className="mt-6 text-center mb-10 md:mt-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="eyebrow eyebrow-dark mb-6">Globe</span>
        <h2 className="section-title section-title-dark text-4xl md:text-5xl font-extrabold mb-4">
          Connecting Journeys
          <span className="text-gradient"> with a Wider World</span>
        </h2>
        <p className="section-copy-dark max-w-2xl mx-auto">
          A visual anchor for the brand that adds atmosphere and depth without interrupting the calm rhythm of the page.
        </p>
      </motion.div>
      <Globe3D />
    </div>
  </section>
);

const PageSection = ({ children, id }: { children: ReactNode; id?: string }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadAssets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoaded(true);
    };

    preloadAssets();
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="premium-page min-h-screen">
      <CustomCursor />

      <AnimatePresence>
        {showIntro && isLoaded && (
          <CinematicIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Navbar />
        <PageSection>
          <Hero />
        </PageSection>
        <PageSection id="packages">
          <Packages />
        </PageSection>
        <PageSection id="services">
          <Services />
        </PageSection>
        <PageSection id="globe">
          <Globe3DSection />
        </PageSection>
        <PageSection id="clients">
          <Industries />
        </PageSection>
        <PageSection id="contact">
          <Contact />
        </PageSection>
        <Footer />
      </motion.div>

      {!isLoaded && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#c8cdd4]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              className="mx-auto mb-4 h-20 w-20 rounded-full border-4 border-[rgba(255,208,0,0.16)] border-t-[rgba(255,208,0,1)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="font-medium text-[color:var(--color-slate-700)]">Loading your journey...</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
