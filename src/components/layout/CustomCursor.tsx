import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useScroll } from '../../context/scrollTypes';

export const CustomCursor: React.FC = () => {
  const { prefersReducedMotion } = useScroll();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: fine)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: fine)');

    const mediaListener = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };

    media.addEventListener('change', mediaListener);

    if (!media.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [data-cursor="hover"], [role="button"]');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      media.removeEventListener('change', mediaListener);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // If mobile touch or reduced motion or not visible, do not render
  if (!isFinePointer || prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Central precise dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[10000] w-2 h-2 rounded-full bg-[#ECE7DD] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: isHovered ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.1,
        }}
      />
      {/* Trailing hairline editorial ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full border border-[rgba(236,231,221,0.45)] -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: pos.x,
          y: pos.y,
          width: isHovered ? 52 : 32,
          height: isHovered ? 52 : 32,
          borderColor: isHovered ? '#FF4B2B' : 'rgba(236,231,221,0.3)',
          backgroundColor: isHovered ? 'rgba(255, 75, 43, 0.08)' : 'rgba(0,0,0,0)',
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 220,
          mass: 0.25,
        }}
      />
    </>
  );
};
