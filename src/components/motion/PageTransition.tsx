import React from 'react';
import { motion } from 'motion/react';
import { useScroll } from '../../context/scrollTypes';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { prefersReducedMotion } = useScroll();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Soft light streak wipe overlay */}
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 1, originX: 0 }}
        animate={{ scaleX: 0, originX: 1 }}
        exit={{ scaleX: 1, originX: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] bg-[#E8E4D5] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
