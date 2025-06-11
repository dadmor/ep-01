// components/TeacherPageLayout.tsx
import React from "react";
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import {
  EmptyState,
  LoadingSpinner,
  PageHeader,
} from "@/components/ui_bloglike/base";
import { TeacherMenu } from "@/pages/teacher/menu.TeacherMenu";

interface TeacherPageLayoutProps {
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
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl";
  showPadding?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
};

export const TeacherPageLayout: React.FC<TeacherPageLayoutProps> = ({
  title,
  children,
  isLoading = false,
  isEmpty = false,
  emptyState,
  maxWidth = "6xl",
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
    <SidebarLayout menuComponent={<TeacherMenu userRole="teacher" />}>
      <div className={`${maxWidthClasses[maxWidth]} p-12 space-y-8`}>
        {renderContent()}
      </div>
    </SidebarLayout>
  );
};
