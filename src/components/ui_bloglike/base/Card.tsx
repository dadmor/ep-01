// src/components/ui_bloglike/base/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div 
      className={`
        card bg-base-100 rounded-lg
        ${hover ? 'hover:shadow-md transition-all duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}