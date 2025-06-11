// components/UniversalGrid.tsx
import React from 'react';
import { EmptyState } from '@/components/ui_bloglike/base';

interface UniversalGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyState?: {
    icon: React.ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
  };
  className?: string;
  gridCols?: 'auto' | '1' | '2' | '3' | '4';
  gap?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingComponent?: React.ReactNode;
}

const gridColsClasses = {
  auto: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  '1': 'grid-cols-1',
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export function UniversalGrid<T>({
  items,
  renderItem,
  emptyState,
  className = '',
  gridCols = 'auto',
  gap = 'md',
  loading = false,
  loadingComponent,
}: UniversalGridProps<T>) {
  
  if (loading && loadingComponent) {
    return <>{loadingComponent}</>;
  }

  if (!items.length && emptyState) {
    return (
      <div className="flex justify-center">
        <div className="max-w-lg">
          <EmptyState {...emptyState} />
        </div>
      </div>
    );
  }

  return (
    <div className={`grid ${gridColsClasses[gridCols]} ${gapClasses[gap]} ${className}`}>
      {items.map(renderItem)}
    </div>
  );
}

// Specialized grids for common use cases
export const BadgeGrid: React.FC<{ badges: any[] }> = ({ badges }) => (
  <UniversalGrid
    items={badges}
    renderItem={(badge) => (
      <div
        key={badge.id}
        className={`bg-base-100 rounded-xl border shadow-sm p-6 transition-all duration-200 ${
          badge.isEarned
            ? 'border-green-200/60 hover:shadow-md'
            : badge.isAvailable
            ? 'border-amber-200/60 hover:shadow-md'
            : 'border-gray-200/60 opacity-75'
        }`}
      >
        {/* Badge content - simplified version */}
        <div className="text-center">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
            badge.isEarned ? 'bg-green-100 border-2 border-green-200' :
            badge.isAvailable ? 'bg-amber-100 border-2 border-amber-200' :
            'bg-gray-100 border-2 border-gray-200'
          }`}>
            {/* Icon logic here */}
          </div>
          <h3 className="font-semibold mb-2">{badge.name}</h3>
          <p className="text-sm text-gray-600">{badge.description}</p>
        </div>
      </div>
    )}
    emptyState={{
      icon: <></>,
      title: "Brak odznak",
      description: "Nie znaleziono odznak spełniających kryteria"
    }}
  />
);

export const CourseGrid: React.FC<{ courses: any[] }> = ({ courses }) => (
  <UniversalGrid
    items={courses}
    renderItem={(course) => (
      <div key={course.id} className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-200">
        {/* Course content */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{course.subject}</span>
            {course.isCompleted && (
              <span className="text-xs text-green-600 font-medium">Ukończony</span>
            )}
          </div>
        </div>
      </div>
    )}
    emptyState={{
      icon: <></>,
      title: "Brak kursów",
      description: "Nie znaleziono kursów spełniających kryteria"
    }}
  />
);