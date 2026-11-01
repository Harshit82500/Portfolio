import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useScroll } from '../../context/scrollTypes';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  icon,
  children,
  className = '',
  ...props
}) => {
  const { prefersReducedMotion } = useScroll();
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || prefersReducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    if (!magnetic || prefersReducedMotion) return;
    setPos({ x: 0, y: 0 });
  };

  const baseStyles = 'inline-flex items-center justify-center font-mono uppercase tracking-widest text-xs transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial-accent';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-[11px] gap-1.5',
    md: 'px-5 py-2.5 text-xs gap-2',
    lg: 'px-7 py-3.5 text-sm gap-2.5',
  }[size];

  const variantStyles = {
    primary: 'bg-editorial-accent text-editorial-surface-deep font-semibold hover:bg-editorial-accent-hover',
    outline: 'border border-editorial-border text-editorial-text hover:border-editorial-accent hover:text-editorial-accent bg-transparent',
    ghost: 'text-editorial-muted hover:text-editorial-text bg-transparent p-0',
  }[variant];

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={magnetic && !prefersReducedMotion ? { x: pos.x, y: pos.y } : undefined}
      transition={{ type: 'spring', damping: 15, stiffness: 180, mass: 0.1 }}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...(props as any)}
    >
      <span>{children}</span>
      {icon && <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </motion.button>
  );
};
