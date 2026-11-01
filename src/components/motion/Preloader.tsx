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

    // 1.1s calibrated fast loading timer (under 2 seconds)
    const startTime = Date.now();
    const duration = 1100;

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
        }, 120);
      }
    }, 25);

    // Escape or space dismisses immediately
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
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        }}
        onClick={() => {
          sessionStorage.setItem('has_preloaded', 'true');
          setIsDismissed(true);
          onComplete();
        }}
        className="fixed inset-0 z-[100000] bg-paper text-ink flex flex-col justify-between p-6 sm:p-12 cursor-pointer select-none"
        aria-label="Portfolio Loading Screen. Click to skip."
      >
        {/* Top bar */}
        <div className="flex items-center justify-between text-xs font-mono text-ink/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="font-semibold text-ink">SYSTEM INITIALIZATION</span>
          </div>
          <span className="hover:text-ink transition-colors">
            CLICK OR ESC TO SKIP ✕
          </span>
        </div>

        {/* Center: Bold Name Reveal */}
        <div className="flex flex-col items-center justify-center my-auto">
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl text-ink tracking-tighter text-center"
            >
              {personalInfo.fullName}
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-xs sm:text-sm text-ink/65 uppercase tracking-widest text-center"
            >
              {personalInfo.staticRoleLine}
            </motion.p>
          </div>
        </div>

        {/* Bottom bar: Progress Counter & Hairline Meter */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-ink/60 font-semibold">CALIBRATING SIGNAL</span>
            <span className="text-ink font-bold">{progress}%</span>
          </div>
          <div className="w-full h-[1.5px] bg-border-light relative overflow-hidden">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-gold"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
