import React from 'react';
import { TextReveal } from '../motion/TextReveal';

interface SectionHeaderProps {
  number: string;
  label: string;
  headline: string;
  description?: string;
  watermark?: string;
  dark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  label,
  headline,
  description,
  watermark,
  dark = false,
  className = '',
}) => {
  const borderColor = dark ? 'border-border-dark' : 'border-border-light';
  const labelColor = dark ? 'text-gold' : 'text-ink';
  const descColor = dark ? 'text-muted-dark' : 'text-ink/65';
  const headingColor = dark ? 'text-paper' : 'text-ink';
  const watermarkColor = dark ? 'text-white/[0.03]' : 'text-ink/[0.035]';

  return (
    <div className={`relative mb-12 sm:mb-16 pb-8 border-b ${borderColor} ${className}`}>
      {/* Huge Faint Watermark Typography */}
      {watermark && (
        <span
          data-scroll
          data-scroll-speed="-0.8"
          aria-hidden="true"
          className={`pointer-events-none absolute -top-8 sm:-top-12 -left-2 select-none font-sans font-extrabold text-7xl sm:text-9xl lg:text-[11vw] tracking-tighter leading-none uppercase z-0 ${watermarkColor}`}
        >
          {watermark}
        </span>
      )}

      <div className="relative z-10">
        {/* Section Label: "01 / Selected Work" */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`font-mono text-xs font-semibold tracking-widest uppercase ${labelColor}`}>
            {number} / {label}
          </span>
          <span className={`w-8 h-[1px] ${dark ? 'bg-border-dark' : 'bg-border-light'}`} />
        </div>

        {/* Headline & Optional Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
          <h2 className={`lg:col-span-8 font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] ${headingColor}`}>
            <TextReveal as="span">{headline}</TextReveal>
          </h2>
          {description && (
            <p className={`lg:col-span-4 text-sm sm:text-base font-sans leading-relaxed ${descColor}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
