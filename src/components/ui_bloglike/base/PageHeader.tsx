// src/components/PageHeader.tsx

import { colorPalette } from "../colors";


interface PageHeaderProps {
  title: string;
  subtitle: string;
  variant?:
    | 'default'
    | 'courses'
    | 'dashboard'
    | 'lesson'
    | 'progress'
    | 'achievements'
    | 'leaderboard';
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  variant = 'default',
  className = '',
}: PageHeaderProps) {
  const variantBorders: Record<NonNullable<PageHeaderProps['variant']>, string> = {
    default: colorPalette.default.border,
    courses: colorPalette.blue.border,
    dashboard: colorPalette.green.border,
    lesson: colorPalette.purple.border,
    progress: colorPalette.green.border,
    achievements: colorPalette.amber.border,
    leaderboard: colorPalette.rose.border,
  };

  return (
    <div className={`border-b border-slate-300 bg-background ${className}`}>
      <div className="container space-y-1 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
        <div className={`border-l-6 pl-6 space-y-2 ${variantBorders[variant]}`}>
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
