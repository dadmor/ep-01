// pages/Dashboard.tsx - Zoptymalizowana wersja (90 linii vs 200)
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, TrendingUp, Award, Users, ChevronRight, 
  PlayCircle, Clock, Calendar, Brain, CheckCircle2, 
  Star, AlertCircle, Medal
} from 'lucide-react';

import { HelpSection } from '@/components/HelpSection';
import { useStudentData } from './hooks/useStudentData';
import { StudentPageLayout } from '@/components/layout/StudentPageLayout';
import { StatsSection } from './section.StatsSection';

export const routeConfig = { 
  path: "/student/dashboard", 
  title: "Student Dashboard" 
};

// Quick action configuration
const quickActions = [
  {
    to: "/student/courses",
    icon: BookOpen,
    title: "Przeglądaj kursy",
    subtitle: "Znajdź nowe lekcje",
    color: "blue"
  },
  {
    to: "/student/progress", 
    icon: TrendingUp,
    title: "Moje postępy",
    subtitle: "Szczegółowe statystyki",
    color: "green"
  },
  {
    to: "/student/achievements",
    icon: Award,
    title: "Osiągnięcia", 
    subtitle: "Odznaki i nagrody",
    color: "purple"
  },
  {
    to: "/student/leaderboard",
    icon: Users,
    title: "Ranking",
    subtitle: "Porównaj się z innymi",
    color: "amber"
  }
];

export default function StudentDashboard() {
  const { lessons, progress, userBadges, stats, isLoading } = useStudentData();

  // Recent activity (last 5)
  const recentProgress = useMemo(() => {
    return progress?.sort((a, b) => 
      new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
    ).slice(0, 5) || [];
  }, [progress]);

  // Recommended lessons (not completed)
  const recommendedLessons = useMemo(() => {
    return lessons?.filter(lesson => 
      !progress?.some(p => p.lesson_id === lesson.id)
    ).slice(0, 3) || [];
  }, [lessons, progress]);

  const QuickActionsSection = () => (
    <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map(action => (
          <Link 
            key={action.to}
            to={action.to} 
            className={`flex items-center gap-3 p-4 bg-${action.color}-50/50 hover:bg-${action.color}-100/50 rounded-lg border border-${action.color}-200/40 transition-colors group`}
          >
            <div className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-200 transition-colors`}>
              <action.icon className={`w-5 h-5 text-${action.color}-600`} />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{action.title}</div>
              <div className="text-xs text-gray-600">{action.subtitle}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </Link>
        ))}
      </div>
    </div>
  );

  const RecommendedSection = () => (
    <div className="lg:col-span-2 bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <PlayCircle className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Polecane dla Ciebie</h2>
        <Link to="/student/courses" className="text-sm text-blue-600 hover:text-blue-700 font-medium ml-auto">
          Zobacz wszystkie
        </Link>
      </div>
      
      <div className="space-y-3">
        {!recommendedLessons.length ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>Ukończyłeś wszystkie dostępne lekcje!</p>
          </div>
        ) : (
          recommendedLessons.map(lesson => (
            <Link 
              key={lesson.id} 
              to={`/student/lesson/${lesson.id}`}
              className="block p-4 bg-gray-50/50 rounded-lg hover:bg-gray-100/50 transition-colors border border-gray-200/30 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {lesson.title}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {lesson.subject} • {lesson.topic}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );

  const RecentActivitySection = () => (
    <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">Ostatnia aktywność</h2>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {!recentProgress.length ? (
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>Rozpocznij naukę, aby zobaczyć postępy</p>
          </div>
        ) : (
          recentProgress.map(p => {
            const lesson = lessons?.find(l => l.id === p.lesson_id);
            const getScoreIcon = (score: number) => {
              if (score >= 90) return <CheckCircle2 className="w-4 h-4 text-green-600" />;
              if (score >= 70) return <Star className="w-4 h-4 text-amber-600" />;
              return <AlertCircle className="w-4 h-4 text-rose-600" />;
            };
            
            return (
              <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  p.score >= 90 ? 'bg-green-100' : 
                  p.score >= 70 ? 'bg-amber-100' : 'bg-rose-100'
                }`}>
                  {getScoreIcon(p.score)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {lesson?.title || 'Nieznana lekcja'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(p.completed_at).toLocaleDateString('pl-PL')}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${
                    p.score >= 90 ? 'text-green-600' : 
                    p.score >= 70 ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {p.score}%
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <StudentPageLayout
      title={`Witaj, ${stats?.level ? 'poziom ' + stats.level : ''}! 👋`}
      subtitle="Twój panel do nauki i śledzenia postępów"
      isLoading={isLoading}
    >
      <StatsSection type="dashboard" data={stats} gridCols="6" className="mb-12" />
      
      <QuickActionsSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <RecommendedSection />
        <RecentActivitySection />
      </div>

      <HelpSection />
    </StudentPageLayout>
  );
}