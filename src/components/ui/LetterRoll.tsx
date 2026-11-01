import React from 'react';
import { useScroll } from '../../context/scrollTypes';

interface LetterRollProps {
  text: string;
  className?: string;
  superscript?: string | number;
}

export const LetterRoll: React.FC<LetterRollProps> = ({
  text,
  className = '',
  superscript,
}) => {
  const { prefersReducedMotion } = useScroll();

  if (prefersReducedMotion) {
    return (
      <span className={`inline-flex items-center gap-1 ${className}`}>
        <span>{text}</span>
        {superscript !== undefined && (
          <sup className="text-[9px] font-mono opacity-60 ml-0.5">{superscript}</sup>
        )}
      </span>
    );
  }

  return (
    <span className={`group inline-flex items-center cursor-pointer select-none ${className}`}>
      <span className="inline-flex overflow-hidden leading-none py-1">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="relative inline-block overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transitionDelay: `${index * 18}ms`,
            }}
          >
            {/* Top primary glyph */}
            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
              {char === ' ' ? '\u00A0' : char}
            </span>
            {/* Bottom incoming glyph */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-full inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </span>
      {superscript !== undefined && (
        <sup className="text-[10px] font-mono text-ink/60 group-hover:text-ink font-bold transition-colors ml-1 -top-1.5">
          {superscript}
        </sup>
      )}
    </span>
  );
};
