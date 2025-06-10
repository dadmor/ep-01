// src/components/ui_shdn/basic/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Optional message displayed below the spinner */
  message?: string;
}
  
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = "", message }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };
  
  return (
    <div className={`flex flex-col items-center ${className}`}>      
      <div className={`border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin ${sizes[size]}`}></div>
      {message && (
        <span className="mt-2 text-sm text-slate-600">{message}</span>
      )}
    </div>
  );
};