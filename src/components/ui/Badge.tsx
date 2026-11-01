import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'accent' | 'subtle' | 'dark';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const variantStyles = {
    neutral: 'border border-border-light text-ink/80 bg-paper rounded-full',
    accent: 'border border-gold/40 text-ink bg-gold/30 rounded-full font-medium',
    subtle: 'border border-border-light/70 text-ink/65 bg-transparent rounded-full',
    dark: 'border border-border-dark text-paper/80 bg-white/5 rounded-full',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[11px] font-mono tracking-wider uppercase ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
