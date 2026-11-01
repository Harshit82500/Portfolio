import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useScroll } from '../../context/scrollTypes';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  as: Component = 'span',
}) => {
  const { prefersReducedMotion } = useScroll();
  const [failsafeVisible, setFailsafeVisible] = useState(false);

  useEffect(() => {
    // Failsafe: ensures real content is never left stuck at opacity 0
    const timer = setTimeout(() => setFailsafeVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>;
  }

  // Split headline into words for subtle cascading line reveal
  const words = children.split(' ');

  return (
    <Component className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 align-bottom">
          <motion.span
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            animate={failsafeVisible ? { y: 0, opacity: 1 } : undefined}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{
              duration: 0.55,
              delay: delay + i * 0.02,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
