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
    neutral: 'border border-[rgba(236,231,221,0.14)] text-[#8A857B] bg-[#141311]',
    accent: 'border border-[rgba(255,75,43,0.3)] text-[#FF4B2B] bg-[rgba(255,75,43,0.06)]',
    subtle: 'border border-[rgba(236,231,221,0.08)] text-[#8A857B]/80 bg-transparent',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};
