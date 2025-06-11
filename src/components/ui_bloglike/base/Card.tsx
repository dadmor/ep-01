// src/components/ui_bloglike/base/Card.tsx
import { ReactNode } from 'react';
import { colorPalette } from '../colors';


interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'accent';
}

export function Card({ children, className = '', hover = false, variant = 'default' }: CardProps) {
  const style = colorPalette[variant];

  return (
    <div
      className={`
        card rounded-xl border shadow-sm
        ${style.bg}
        ${style.border}
        ${hover ? 'hover:shadow-md hover:border-gray-300/60 transition-all duration-300 hover:-translate-y-0.5' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}