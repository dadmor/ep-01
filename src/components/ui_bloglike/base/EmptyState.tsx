import { ReactNode } from "react";

// src/components/ui/EmptyState.tsx
interface EmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
  }
  
  export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-3 font-serif tracking-tight">
          {title}
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {description}
        </p>
        {actionLabel && onAction && (
          <button 
            className="btn btn-primary shadow-sm hover:shadow-md transition-shadow"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }
  