// src/components/ui_bloglike/base/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  colorful?: boolean;
}

export function Card({ children, className = '', hover = false, colorful = false }: CardProps) {
  return (
    <div 
      className={`
        card rounded-2xl border-2 shadow-lg
        ${colorful ? 'bg-gradient-to-br from-white to-blue-50 border-blue-200' : 'bg-base-100 border-gray-200'}
        ${hover ? 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
