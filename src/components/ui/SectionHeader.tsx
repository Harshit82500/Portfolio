import React from 'react';
import { TextReveal } from '../motion/TextReveal';

export interface SectionHeaderProps {
  number: string;
  label: string;
  title?: string;
  headline?: string;
  description?: string;
  watermark?: string;
  dark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  label,
  title,
  headline,
  description,
  watermark,
  dark = false,
  className = '',
}) => {
  const titleText = title || headline || label;
  const labelColor = dark ? 'text-gold' : 'text-ink';
  const descColor = dark ? 'text-muted-dark' : 'text-ink/80';
  const headingColor = dark ? 'text-paper' : 'text-ink';
  const watermarkColor = dark ? 'text-white/[0.025]' : 'text-ink/[0.03]';

  return (
    <header className={`relative w-full ${dark ? 'text-paper' : 'text-ink'} ${className}`}>
      {/* Decorative Watermark: Absolute, zero height impact, gentle parallax <= 0.1 */}
      {watermark && (
        <span
          data-scroll
          data-scroll-speed="0.06"
          aria-hidden="true"
          className={`pointer-events-none absolute -top-6 sm:-top-8 -left-1 select-none font-sans font-extrabold text-6xl sm:text-8xl lg:text-9xl tracking-tighter leading-none uppercase z-0 ${watermarkColor}`}
        >
          {watermark}
        </span>
      )}

      {/* Two-Column Grid on desktop (items-start), Stack on mobile */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-10 items-start pb-6 sm:pb-8">
        {/* Left Column: Label directly above large visible heading */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-2.5 sm:gap-3.5">
          {/* Label */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
            <span className={`font-mono text-xs font-semibold tracking-widest uppercase ${labelColor}`}>
              {number} / {label}
            </span>
          </div>

          {/* Real visible heading */}
          <h2 className={`font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] tracking-tight leading-[1.08] ${headingColor}`}>
            <TextReveal as="span">{titleText}</TextReveal>
          </h2>
        </div>

        {/* Right Column: Description aligned to top of heading */}
        {description && (
          <div className="lg:col-span-5 xl:col-span-4 lg:pt-7 flex flex-col justify-start">
            <p className={`font-sans text-sm sm:text-base leading-relaxed ${descColor}`}>
              {description}
            </p>
          </div>
        )}
      </div>

      {/* Hairline Divider below header */}
      <div className={`w-full h-[1px] ${dark ? 'bg-border-dark' : 'bg-border-light'}`} />
    </header>
  );
};
