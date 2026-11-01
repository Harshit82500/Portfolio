import React from 'react';
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
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.025,
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
