import React from 'react';
import { TextReveal } from '../motion/TextReveal';

interface SectionHeaderProps {
  number: string;
  label: string;
  headline: string;
  description?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  label,
  headline,
  description,
  className = '',
}) => {
  return (
    <div className={`mb-12 md:mb-16 border-b border-editorial-border pb-8 ${className}`}>
      {/* Numbered Category Badge */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-editorial-accent tracking-widest uppercase">
          {number}
        </span>
        <span className="w-6 h-[1px] bg-editorial-border" />
        <span className="font-mono text-xs text-editorial-muted tracking-widest uppercase">
          {label}
        </span>
      </div>

      {/* Main Headline with Text Mask Reveal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
        <h2 className="lg:col-span-8 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-editorial-text tracking-tight leading-[1.08]">
          <TextReveal as="span">{headline}</TextReveal>
        </h2>
        {description && (
          <p className="lg:col-span-4 text-sm sm:text-base text-editorial-muted font-sans leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
