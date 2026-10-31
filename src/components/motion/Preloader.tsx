import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../../data/personalInfo';
import { useScroll } from '../../context/scrollTypes';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const { prefersReducedMotion } = useScroll();
  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window === 'undefined') return true;
    return prefersReducedMotion || !!sessionStorage.getItem('has_preloaded');
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isDismissed) {
      onComplete();
      return;
    }

    // 1.2 second calibrated progress timer (under 2 seconds)
    const startTime = Date.now();
    const duration = 1200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(nextProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem('has_preloaded', 'true');
          setIsDismissed(true);
          onComplete();
        }, 150);
      }
    }, 25);

    // Escape or click dismisses immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        clearInterval(interval);
        sessionStorage.setItem('has_preloaded', 'true');
        setIsDismissed(true);
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDismissed, onComplete]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          y: -20,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
        onClick={() => {
          sessionStorage.setItem('has_preloaded', 'true');
          setIsDismissed(true);
          onComplete();
        }}
        className="fixed inset-0 z-[100000] bg-[#0F0E0C] text-[#ECE7DD] flex flex-col justify-between p-6 sm:p-12 cursor-pointer select-none"
        aria-label="Portfolio Loading Screen. Click to skip."
      >
        {/* Top bar */}
        <div className="flex items-center justify-between text-xs font-mono text-[#8A857B]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B2B] animate-pulse" />
            <span>CALIBRATING ARCHITECTURE</span>
          </div>
          <span className="hover:text-[#ECE7DD] transition-colors">
            CLICK OR ESC TO SKIP ✕
          </span>
        </div>

        {/* Center: Monogram & Name Reveal */}
        <div className="flex flex-col items-center justify-center my-auto">
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#ECE7DD] tracking-tight text-center"
            >
              {personalInfo.fullName}
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-xs sm:text-sm text-[#8A857B] uppercase tracking-widest text-center"
            >
              {personalInfo.staticRoleLine}
            </motion.p>
          </div>
        </div>

        {/* Bottom bar: Progress Counter & Hairline Meter */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#8A857B]">SYSTEM INITIALIZATION</span>
            <span className="text-[#ECE7DD] font-medium">{progress}%</span>
          </div>
          <div className="w-full h-[1px] bg-[rgba(236,231,221,0.12)] relative overflow-hidden">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-[#FF4B2B]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
