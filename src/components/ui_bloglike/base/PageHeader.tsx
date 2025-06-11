// src/components/PageHeader.tsx

import { Info } from "@/components/uiBase/Info";
import { colorPalette } from "../colors";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  variant?:
    | "default"
    | "courses"
    | "dashboard"
    | "lesson"
    | "progress"
    | "achievements"
    | "leaderboard";
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  variant = "default",
  className = "",
}: PageHeaderProps) {
  const variantBorders: Record<
    NonNullable<PageHeaderProps["variant"]>,
    string
  > = {
    default: colorPalette.default.border,
    courses: colorPalette.blue.border,
    dashboard: colorPalette.green.border,
    lesson: colorPalette.purple.border,
    progress: colorPalette.green.border,
    achievements: colorPalette.amber.border,
    leaderboard: colorPalette.rose.border,
  };

  return (
    <div className={`border-b border-slate-200 bg-base-100 ${className}`}>
      <div className="container space-y-1 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
        <div className={`border-l-8 pl-8 space-y-2 ${variantBorders[variant]}`}>
          <Info title={title} subtitle={subtitle} />
        </div>
      </div>
    </div>
  );
}
