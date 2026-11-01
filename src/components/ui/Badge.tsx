import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'accent' | 'subtle';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const variantStyles = {
    neutral: 'border border-editorial-border text-editorial-muted bg-editorial-surface',
    accent: 'border border-editorial-accent/30 text-editorial-accent bg-editorial-accent/10',
    subtle: 'border border-editorial-border/60 text-editorial-muted/80 bg-transparent',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
