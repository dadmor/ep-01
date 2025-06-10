// src/components/ui_shdn/basic/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Czy włączyć efekt hover */
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hover = true }) => {
  const baseClasses = `bg-white rounded-lg border border-slate-200 shadow-sm ${className}`;
  const hoverClasses = hover
    ? ' hover:shadow-md transform hover:scale-103 transition duration-150 ease-in-out'
    : '';

  return (
    <div className={`${baseClasses}${hoverClasses}`}>      
      {children}
    </div>
  );
};
