// components/StudentPageLayout.tsx
import React from 'react';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { StudentMenu } from '@/pages/student/menu.StudentMenu';
import { EmptyState, LoadingSpinner, PageHeader } from '@/components/ui_bloglike/base';

interface StudentPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyState?: {
    icon: React.ReactNode;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
  };
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl';
  showPadding?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md', 
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
};

export const StudentPageLayout: React.FC<StudentPageLayoutProps> = ({
  title,
  subtitle,
  children,
  isLoading = false,
  isEmpty = false,
  emptyState,
  maxWidth = '6xl',
  showPadding = true,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner message={`Ładowanie ${title.toLowerCase()}...`} />;
    }

    if (isEmpty && emptyState) {
      return (
        <div className="flex justify-center">
          <div className="max-w-lg">
            <EmptyState {...emptyState} />
          </div>
        </div>
      );
    }

    return children;
  };

  return (
    <SidebarLayout menuComponent={<StudentMenu userRole="student" />}>
      <PageHeader 
        title={title}
        subtitle={subtitle}
        variant="courses"
      />
      <div className={`${maxWidthClasses[maxWidth]} ${showPadding ? 'px-6 py-16' : 'px-6'}`}>
        {renderContent()}
      </div>
    </SidebarLayout>
  );
};