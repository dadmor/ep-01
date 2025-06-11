// src/components/ui_bloglike/base/PageHeader.tsx
interface PageHeaderProps {
  title: string;
  subtitle: string;
  variant?: 'default' | 'courses' | 'dashboard' | 'lesson' | 'progress' | 'achievements' | 'leaderboard';
}

export function PageHeader({ title, subtitle, variant = 'default' }: PageHeaderProps) {
  const gradients = {
    default: 'from-white to-gray-50/50',
    courses: 'from-white to-blue-50/30',
    dashboard: 'from-white to-green-50/30',
    lesson: 'from-white to-purple-50/30',
    progress: 'from-white to-emerald-50/30',
    achievements: 'from-white to-amber-50/30',
    leaderboard: 'from-white to-rose-50/30'
  };

  const titleColors = {
    default: 'text-gray-900',
    courses: 'text-blue-900',
    dashboard: 'text-green-900',
    lesson: 'text-purple-900',
    progress: 'text-emerald-900',
    achievements: 'text-amber-900',
    leaderboard: 'text-rose-900'
  };

  return (
    <div className={`bg-gradient-to-b ${gradients[variant]} border-b border-gray-200/40`}>
      <div className="max-w-3xl mx-auto px-6 py-8 lg:py-12 text-center">
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-medium ${titleColors[variant]} mb-3 tracking-tight leading-tight`}>
          {title}
        </h1>
        
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mx-auto font-normal">
          {subtitle}
        </p>
      </div>
    </div>
  );
}