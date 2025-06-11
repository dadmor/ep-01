// src/components/ui_bloglike/base/EmptyState.tsx
import { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-3xl flex items-center justify-center shadow-sm border border-gray-200/40">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center max-w-sm">
        {title}
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed text-center max-w-md text-sm">
        {description}
      </p>
      {actionLabel && onAction && (
        <button 
          className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}