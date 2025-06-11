// src/pages/student/ui.Progress.tsx
import { EmptyState, LoadingSpinner, PageHeader, StatCard } from '@/components/ui_bloglike/base';
import { useFetch } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Star,
  Clock,
  Brain,
  Award,
  Flame,
  Trophy,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { useState, useMemo } from 'react';

export const routeConfig = { path: "/student/progress", title: "Moje Postępy" };

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
  total_tasks: number;
  correct_tasks: number;
  completed_at: string;
  attempts_count: number;
}

interface IncorrectAnswer {
  id: string;
  task_id: string;
  lesson_id: string;
  given_answer: string;
  created_at: string;
}

export default function StudentProgress() {
  const { user } = useAuth();
  const { data: lessons, isLoading: lessonsLoading } = useFetch<Lesson>('lessons', 'lessons');
  const { data: progress, isLoading: progressLoading } = useFetch<Progress>('student-progress', 'progress');
  const { data: incorrectAnswers, isLoading: errorsLoading } = useFetch<IncorrectAnswer>('incorrect-answers', 'incorrect_answers');

  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('month');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  const isLoading = lessonsLoading || progressLoading || errorsLoading;

  // Calculate comprehensive stats
  const stats = useMemo(() => {
    if (!progress) return null;

    const totalLessons = progress.length;
    const totalTasks = progress.reduce((sum, p) => sum + p.total_tasks, 0);
    const correctTasks = progress.reduce((sum, p) => sum + p.correct_tasks, 0);
    const averageScore = totalLessons ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / totalLessons) : 0;
    const perfectScores = progress.filter(p => p.score === 100).length;
    const totalAttempts = progress.reduce((sum, p) => sum + p.attempts_count, 0);
    const averageAttempts = totalLessons ? (totalAttempts / totalLessons).toFixed(1) : '0';

    return {
      totalLessons,
      totalTasks,
      correctTasks,
      averageScore,
      perfectScores,
      averageAttempts,
      accuracy: totalTasks ? Math.round((correctTasks / totalTasks) * 100) : 0
    };
  }, [progress]);

  // Filter progress by time
  const filteredProgress = useMemo(() => {
    if (!progress) return [];

    let filtered = progress;

    // Time filter
    if (timeFilter !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      
      if (timeFilter === 'week') {
        cutoff.setDate(now.getDate() - 7);
      } else if (timeFilter === 'month') {
        cutoff.setMonth(now.getMonth() - 1);
      }

      filtered = filtered.filter(p => new Date(p.completed_at) >= cutoff);
    }

    // Subject filter
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(p => {
        const lesson = lessons?.find(l => l.id === p.lesson_id);
        return lesson?.subject === subjectFilter;
      });
    }

    return filtered.sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());
  }, [progress, lessons, timeFilter, subjectFilter]);

  // Subject performance analysis
  const subjectAnalysis = useMemo(() => {
    if (!progress || !lessons) return [];

    const subjectMap = new Map();

    progress.forEach(p => {
      const lesson = lessons.find(l => l.id === p.lesson_id);
      if (lesson) {
        const subject = lesson.subject;
        if (!subjectMap.has(subject)) {
          subjectMap.set(subject, {
            subject,
            scores: [],
            totalTasks: 0,
            correctTasks: 0,
            attempts: 0,
            perfectScores: 0
          });
        }

        const data = subjectMap.get(subject);
        data.scores.push(p.score);
        data.totalTasks += p.total_tasks;
        data.correctTasks += p.correct_tasks;
        data.attempts += p.attempts_count;
        if (p.score === 100) data.perfectScores++;
      }
    });

    return Array.from(subjectMap.values()).map(data => ({
      ...data,
      averageScore: Math.round(data.scores.reduce((sum: number, score: number) => sum + score, 0) / data.scores.length),
      accuracy: Math.round((data.correctTasks / data.totalTasks) * 100),
      lessonsCount: data.scores.length,
      averageAttempts: (data.attempts / data.scores.length).toFixed(1)
    })).sort((a, b) => b.averageScore - a.averageScore);
  }, [progress, lessons]);

  // Recent trend (last 5 lessons vs previous 5)
  const trend = useMemo(() => {
    if (!progress || progress.length < 2) return null;

    const sorted = [...progress].sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());
    
    const recent = sorted.slice(0, Math.min(5, sorted.length));
    const previous = sorted.slice(5, Math.min(10, sorted.length));

    if (previous.length === 0) return null;

    const recentAvg = recent.reduce((sum, p) => sum + p.score, 0) / recent.length;
    const previousAvg = previous.reduce((sum, p) => sum + p.score, 0) / previous.length;
    
    const change = recentAvg - previousAvg;

    return {
      change: Math.round(change),
      direction: change > 2 ? 'up' : change < -2 ? 'down' : 'stable',
      recentAvg: Math.round(recentAvg),
      previousAvg: Math.round(previousAvg)
    };
  }, [progress]);

  // Get unique subjects for filter
  const subjects = useMemo(() => {
    if (!lessons) return [];
    return Array.from(new Set(lessons.map(l => l.subject).filter(Boolean)));
  }, [lessons]);

  if (isLoading) {
    return <LoadingSpinner message="Ładowanie postępów..." />;
  }

  if (!stats || stats.totalLessons === 0) {
    return (
      <div className="min-h-screen bg-gray-50/30">
        <PageHeader 
          title="Moje Postępy"
          subtitle="Śledź swoje wyniki i analizuj postępy w nauce"
          variant="progress"
        />
        <div className="max-w-4xl mx-auto px-6 py-16">
          <EmptyState
            icon={<BarChart3 className="w-8 h-8 text-gray-400" />}
            title="Brak danych o postępach"
            description="Ukończ kilka lekcji, aby zobaczyć swoje statystyki"
            actionLabel="Przejdź do kursów"
            onAction={() => window.location.href = '/student/courses'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <PageHeader 
        title="Moje Postępy"
        subtitle="Śledź swoje wyniki i analizuj postępy w nauce"
        variant="progress"
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Średnia ocena"
            value={`${stats.averageScore}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            color="blue"
            trend={trend ? {
              value: `${Math.abs(trend.change)}%`,
              direction: trend.direction as 'up' | 'down' | 'stable'
            } : undefined}
          />
          
          <StatCard
            title="Celność"
            value={`${stats.accuracy}%`}
            icon={<Target className="w-5 h-5" />}
            color="green"
          />
          
          <StatCard
            title="Perfekcyjne wyniki"
            value={stats.perfectScores}
            icon={<Star className="w-5 h-5" />}
            color="amber"
          />
          
          <StatCard
            title="Śr. liczba prób"
            value={stats.averageAttempts}
            icon={<Clock className="w-5 h-5" />}
            color="purple"
          />
        </div>

        {/* Performance Trend */}
        {trend && (
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                trend.direction === 'up' ? 'bg-green-50 border border-green-200' :
                trend.direction === 'down' ? 'bg-rose-50 border border-rose-200' :
                'bg-gray-50 border border-gray-200'
              }`}>
                {trend.direction === 'up' ? (
                  <ArrowUp className="w-6 h-6 text-green-600" />
                ) : trend.direction === 'down' ? (
                  <ArrowDown className="w-6 h-6 text-rose-600" />
                ) : (
                  <Minus className="w-6 h-6 text-gray-600" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {trend.direction === 'up' ? 'Świetny postęp! 📈' : 
                   trend.direction === 'down' ? 'Skupmy się na poprawie 📉' : 
                   'Stabilny poziom 📊'}
                </h3>
                <p className="text-gray-600 text-sm">
                  Twoja średnia z ostatnich lekcji: <span className="font-medium">{trend.recentAvg}%</span>
                  {trend.direction !== 'stable' && (
                    <span className={`ml-2 ${trend.direction === 'up' ? 'text-green-600' : 'text-rose-600'}`}>
                      ({trend.change > 0 ? '+' : ''}{trend.change}% vs poprzednie)
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Okres:</span>
              <select
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as 'week' | 'month' | 'all')}
              >
                <option value="week">Ostatni tydzień</option>
                <option value="month">Ostatni miesiąc</option>
                <option value="all">Wszystkie</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Przedmiot:</span>
              <select
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
              >
                <option value="all">Wszystkie</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-600 ml-auto">
              Wyników: {filteredProgress.length}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subject Analysis */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200/60 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-50/50 rounded-xl flex items-center justify-center border border-purple-200/40">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Analiza per przedmiot</h2>
              </div>
              
              <div className="space-y-6">
                {subjectAnalysis.map(subject => (
                  <div key={subject.subject} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{subject.subject}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`font-semibold ${
                          subject.averageScore >= 90 ? 'text-green-600' : 
                          subject.averageScore >= 70 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {subject.averageScore}%
                        </span>
                        <span className="text-gray-500">
                          {subject.lessonsCount} {subject.lessonsCount === 1 ? 'lekcja' : 'lekcje'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          subject.averageScore >= 90 ? 'bg-green-500' : 
                          subject.averageScore >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(subject.averageScore, 100)}%` }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-3 bg-gray-50/50 rounded-lg">
                        <div className="font-semibold text-gray-900">{subject.accuracy}%</div>
                        <div className="text-xs text-gray-600">Celność</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50/50 rounded-lg">
                        <div className="font-semibold text-gray-900">{subject.perfectScores}</div>
                        <div className="text-xs text-gray-600">Perfekcyjne</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50/50 rounded-lg">
                        <div className="font-semibold text-gray-900">{subject.averageAttempts}</div>
                        <div className="text-xs text-gray-600">Śr. prób</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {subjectAnalysis.length === 0 && (
                  <EmptyState
                    icon={<Brain className="w-6 h-6 text-gray-400" />}
                    title="Brak danych"
                    description="Ukończ lekcje, aby zobaczyć analizę per przedmiot"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Recent Results */}
          <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50/50 rounded-xl flex items-center justify-center border border-blue-200/40">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Ostatnie wyniki</h2>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredProgress.map(p => {
                  const lesson = lessons?.find(l => l.id === p.lesson_id);
                  return (
                    <div key={p.id} className="p-4 bg-gray-50/50 rounded-lg border border-gray-200/30">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm truncate">
                            {lesson?.title || 'Nieznana lekcja'}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {lesson?.subject} • {lesson?.topic}
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ml-2 ${
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
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-semibold ${
                          p.score >= 90 ? 'text-green-600' : 
                          p.score >= 70 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {p.score}%
                        </span>
                        <span className="text-xs text-gray-500">
                          {p.correct_tasks}/{p.total_tasks} poprawnych
                        </span>
                      </div>
                      
                      <div className="bg-gray-200 rounded-full h-1.5 mb-2">
                        <div 
                          className={`h-1.5 rounded-full ${
                            p.score >= 90 ? 'bg-green-500' : 
                            p.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${p.score}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{new Date(p.completed_at).toLocaleDateString('pl-PL')}</span>
                        {p.attempts_count > 1 && (
                          <span>{p.attempts_count}. próba</span>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {filteredProgress.length === 0 && (
                  <EmptyState
                    icon={<Calendar className="w-6 h-6 text-gray-400" />}
                    title="Brak wyników"
                    description="Nie ma wyników w wybranym okresie"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200/60 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Szczegółowe statystyki</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50/30 rounded-lg border border-blue-200/30">
              <div className="text-2xl font-bold text-blue-600">{stats.totalLessons}</div>
              <div className="text-sm text-gray-600">Ukończone lekcje</div>
            </div>
            
            <div className="text-center p-4 bg-green-50/30 rounded-lg border border-green-200/30">
              <div className="text-2xl font-bold text-green-600">{stats.totalTasks}</div>
              <div className="text-sm text-gray-600">Zadania łącznie</div>
            </div>
            
            <div className="text-center p-4 bg-amber-50/30 rounded-lg border border-amber-200/30">
              <div className="text-2xl font-bold text-amber-600">{stats.correctTasks}</div>
              <div className="text-sm text-gray-600">Poprawne odpowiedzi</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50/30 rounded-lg border border-purple-200/30">
              <div className="text-2xl font-bold text-purple-600">{stats.perfectScores}</div>
              <div className="text-sm text-gray-600">Wyniki 100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}