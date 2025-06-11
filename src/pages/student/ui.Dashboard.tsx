// src/pages/student/ui.Dashboard.tsx
import { EmptyState, LoadingSpinner, PageHeader, StatCard } from '@/components/ui_bloglike/base';
import { HelpSection } from '@/components/HelpSection';
import { useFetch } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { 
  Trophy, 
  Target, 
  Flame, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Star,
  Calendar,
  Award,
  Zap,
  Brain,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Users,
  Medal
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { StudentMenu } from './menu.StudentMenu';

export const routeConfig = { path: "/student/dashboard", title: "Student Dashboard" };

interface Lesson {
  id: string;
  title: string;
  subject: string;
  topic: string;
  grade: string;
}

interface Progress {
  id: string;
  lesson_id: string;
  score: number;
  completed_at: string;
  attempts_count: number;
}

interface UserBadge {
  id: string;
  badge_id: string;
  awarded_at: string;
  badge: {
    name: string;
    description: string;
    icon_url?: string;
  };
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const { data: lessons, isLoading: lessonsLoading } = useFetch<Lesson>('student-lessons', 'lessons');
  const { data: progress, isLoading: progressLoading } = useFetch<Progress>('student-progress', 'progress');
  const { data: userBadges, isLoading: badgesLoading } = useFetch<UserBadge>('user-badges', 'user_badges');

  const isLoading = lessonsLoading || progressLoading || badgesLoading;

  // Calculate advanced stats
  const stats = {
    totalLessons: lessons?.length || 0,
    completedLessons: progress?.length || 0,
    averageScore: progress?.length ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length) : 0,
    totalAttempts: progress?.reduce((sum, p) => sum + p.attempts_count, 0) || 0,
    perfectScores: progress?.filter(p => p.score === 100).length || 0,
    badgesEarned: userBadges?.length || 0
  };

  // Recent activity
  const recentProgress = progress?.sort((a, b) => 
    new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
  ).slice(0, 5);

  // Performance by subject
  const subjectPerformance = progress?.reduce((acc, p) => {
    const lesson = lessons?.find(l => l.id === p.lesson_id);
    if (lesson) {
      const subject = lesson.subject;
      if (!acc[subject]) {
        acc[subject] = { total: 0, sum: 0, count: 0 };
      }
      acc[subject].sum += p.score;
      acc[subject].count += 1;
      acc[subject].total = Math.round(acc[subject].sum / acc[subject].count);
    }
    return acc;
  }, {} as Record<string, { total: number; sum: number; count: number }>);

  // Recommended lessons (not completed)
  const recommendedLessons = lessons?.filter(lesson => 
    !progress?.some(p => p.lesson_id === lesson.id)
  ).slice(0, 3);

  if (isLoading) {
    return <LoadingSpinner message="Ładowanie panelu..." />;
  }

  return (
    <SidebarLayout menuComponent={<StudentMenu userRole="student" />}>
      <PageHeader 
        title={`Witaj, ${user?.username}! 👋`}
        subtitle="Twój panel do nauki i śledzenia postępów"
        variant="dashboard"
      />

      <div className="max-w-6xl px-8 py-16">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
          <StatCard
            title="Poziom XP"
            value={user?.xp || 0}
            icon={<Trophy className="w-5 h-5" />}
            color="amber"
          />
          
          <StatCard
            title="Poziom"
            value={user?.level || 1}
            icon={<Target className="w-5 h-5" />}
            color="blue"
          />
          
          <StatCard
            title="Seria dni"
            value={user?.streak || 0}
            icon={<Flame className="w-5 h-5" />}
            color="rose"
          />

          <StatCard
            title="Średnia"
            value={`${stats.averageScore}%`}
            icon={<BarChart3 className="w-5 h-5" />}
            color="green"
          />

          <StatCard
            title="Odznaki"
            value={stats.badgesEarned}
            icon={<Medal className="w-5 h-5" />}
            color="purple"
          />

          <StatCard
            title="Perfekcyjne"
            value={stats.perfectScores}
            icon={<Star className="w-5 h-5" />}
            color="yellow"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/student/courses" 
              className="flex items-center gap-3 p-4 bg-blue-50/50 hover:bg-blue-100/50 rounded-lg border border-blue-200/40 transition-colors group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Przeglądaj kursy</div>
                <div className="text-xs text-gray-600">Znajdź nowe lekcje</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </Link>

            <Link 
              to="/student/progress" 
              className="flex items-center gap-3 p-4 bg-green-50/50 hover:bg-green-100/50 rounded-lg border border-green-200/40 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Moje postępy</div>
                <div className="text-xs text-gray-600">Szczegółowe statystyki</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </Link>

            <Link 
              to="/student/achievements" 
              className="flex items-center gap-3 p-4 bg-purple-50/50 hover:bg-purple-100/50 rounded-lg border border-purple-200/40 transition-colors group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Osiągnięcia</div>
                <div className="text-xs text-gray-600">Odznaki i nagrody</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </Link>

            <Link 
              to="/student/leaderboard" 
              className="flex items-center gap-3 p-4 bg-amber-50/50 hover:bg-amber-100/50 rounded-lg border border-amber-200/40 transition-colors group"
            >
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">Ranking</div>
                <div className="text-xs text-gray-600">Porównaj się z innymi</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
            </Link>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Recommended Lessons */}
          <div className="lg:col-span-2 bg-base-100 rounded-xl border border-gray-200/60 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50/50 rounded-xl flex items-center justify-center border border-blue-200/40">
                  <PlayCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">Polecane dla Ciebie</h2>
                  <p className="text-sm text-gray-600">Kontynuuj naukę z tymi lekcjami</p>
                </div>
                <Link 
                  to="/student/courses" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Zobacz wszystkie
                </Link>
              </div>
              
              <div className="space-y-3">
                {!recommendedLessons?.length ? (
                  <EmptyState
                    icon={<BookOpen className="w-6 h-6 text-gray-400" />}
                    title="Świetnie!"
                    description="Ukończyłeś wszystkie dostępne lekcje"
                  />
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
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-blue-600 font-medium px-2 py-1 bg-blue-50 rounded-full">
                            {lesson.grade}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-50/50 rounded-xl flex items-center justify-center border border-green-200/40">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Ostatnia aktywność</h2>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {!recentProgress?.length ? (
                  <EmptyState
                    icon={<TrendingUp className="w-6 h-6 text-gray-400" />}
                    title="Brak aktywności"
                    description="Rozpocznij naukę, aby zobaczyć swoje postępy"
                  />
                ) : (
                  recentProgress.map(p => {
                    const lesson = lessons?.find(l => l.id === p.lesson_id);
                    return (
                      <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-200/30">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          p.score >= 90 ? 'bg-green-100' : 
                          p.score >= 70 ? 'bg-amber-100' : 'bg-rose-100'
                        }`}>
                          {p.score >= 90 ? (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          ) : p.score >= 70 ? (
                            <Star className="w-4 h-4 text-amber-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-600" />
                          )}
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
                          {p.attempts_count > 1 && (
                            <div className="text-xs text-gray-500">
                              {p.attempts_count}. próba
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Subject Performance */}
          <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-50/50 rounded-xl flex items-center justify-center border border-purple-200/40">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Wyniki per przedmiot</h2>
              </div>
              
              <div className="space-y-4">
                {Object.entries(subjectPerformance || {}).map(([subject, data]) => (
                  <div key={subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{subject}</span>
                      <span className={`text-sm font-semibold ${
                        data.total >= 90 ? 'text-green-600' : 
                        data.total >= 70 ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {data.total}%
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          data.total >= 90 ? 'bg-green-500' : 
                          data.total >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(data.total, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      {data.count} {data.count === 1 ? 'lekcja' : 'lekcje'}
                    </div>
                  </div>
                ))}
                
                {!Object.keys(subjectPerformance || {}).length && (
                  <EmptyState
                    icon={<Brain className="w-6 h-6 text-gray-400" />}
                    title="Brak danych"
                    description="Ukończ kilka lekcji, aby zobaczyć statystyki"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Recent Badges */}
          <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-50/50 rounded-xl flex items-center justify-center border border-amber-200/40">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">Najnowsze odznaki</h2>
                  <p className="text-sm text-gray-600">Twoje ostatnie osiągnięcia</p>
                </div>
                <Link 
                  to="/student/achievements" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Zobacz wszystkie
                </Link>
              </div>
              
              <div className="space-y-3">
                {!userBadges?.length ? (
                  <EmptyState
                    icon={<Medal className="w-6 h-6 text-gray-400" />}
                    title="Brak odznak"
                    description="Kontynuuj naukę, aby zdobyć pierwsze odznaki"
                  />
                ) : (
                  userBadges.slice(0, 4).map(userBadge => (
                    <div key={userBadge.id} className="flex items-center gap-3 p-3 bg-amber-50/30 rounded-lg border border-amber-200/30">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Medal className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{userBadge.badge.name}</div>
                        <div className="text-sm text-gray-600">{userBadge.badge.description}</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(userBadge.awarded_at).toLocaleDateString('pl-PL')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-4xl mx-auto">
          <HelpSection />
        </div>
      </div>
      </SidebarLayout>
  );
}