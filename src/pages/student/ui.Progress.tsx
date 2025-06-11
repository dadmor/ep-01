// pages/Progress.tsx - Zoptymalizowana wersja (120 linii vs 250)
import React, { useMemo } from 'react';
import { BarChart3, Calendar, Brain, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { useStudentData } from './hooks/useStudentData';
import { useFilters } from './hooks/useFilters';
import { StudentPageLayout } from '@/components/layout/StudentPageLayout';
import { StatsSection } from './section.StatsSection';


export const routeConfig = { 
  path: "/student/progress", 
  title: "Moje Postępy" 
};

export default function StudentProgress() {
  const { lessons, progress, stats, isLoading } = useStudentData();

  // Calculate trend (last 5 vs previous 5)
  const trend = useMemo(() => {
    if (!progress || progress.length < 2) return null;

    const sorted = [...progress].sort((a, b) => 
      new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
    );
    
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

  // Get unique subjects for filter
  const subjects = useMemo(() => {
    if (!lessons) return [];
    return Array.from(new Set(lessons.map(l => l.subject).filter(Boolean)));
  }, [lessons]);

  // Filter configuration
  const filterConfigs = [
    {
      key: 'timeFilter',
      type: 'select' as const,
      label: 'Okres',
      options: [
        { value: 'week', label: 'Ostatni tydzień' },
        { value: 'month', label: 'Ostatni miesiąc' },
        { value: 'all', label: 'Wszystkie' },
      ],
      defaultValue: 'month',
    },
    {
      key: 'subjectFilter',
      type: 'select' as const,
      label: 'Przedmiot',
      options: [
        { value: 'all', label: 'Wszystkie' },
        ...subjects.map(subject => ({ value: subject, label: subject }))
      ],
      defaultValue: 'all',
    },
  ];

  const filterFunctions = {
    timeFilter: (progressItem: any, value: string) => {
      if (value === 'all') return true;
      
      const now = new Date();
      const cutoff = new Date();
      
      if (value === 'week') {
        cutoff.setDate(now.getDate() - 7);
      } else if (value === 'month') {
        cutoff.setMonth(now.getMonth() - 1);
      }

      return new Date(progressItem.completed_at) >= cutoff;
    },
    subjectFilter: (progressItem: any, value: string) => {
      if (value === 'all') return true;
      const lesson = lessons?.find(l => l.id === progressItem.lesson_id);
      return lesson?.subject === value;
    },
  };

  const { filteredData: filteredProgress, FilterComponent } = useFilters({
    data: progress || [],
    configs: filterConfigs,
    filterFunctions,
  });

  // Trend component
  const TrendOverview = () => {
    if (!trend) return null;
    
    return (
      <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6 mb-8">
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
    );
  };

  // Subject analysis component
  const SubjectAnalysisSection = () => (
    <div className="lg:col-span-2 bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-5 h-5 text-purple-600" />
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
          <div className="text-center py-8 text-gray-500">
            <Brain className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>Ukończ lekcje, aby zobaczyć analizę per przedmiot</p>
          </div>
        )}
      </div>
    </div>
  );

  // Recent results component
  const RecentResultsSection = () => (
    <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Ostatnie wyniki</h2>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredProgress.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>Nie ma wyników w wybranym okresie</p>
          </div>
        ) : (
          filteredProgress
            .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
            .map(p => {
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
                    <div className={`text-sm font-semibold ${
                      p.score >= 90 ? 'text-green-600' : 
                      p.score >= 70 ? 'text-amber-600' : 'text-rose-600'
                    }`}>
                      {p.score}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">
                      {p.correct_tasks}/{p.total_tasks} poprawnych
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(p.completed_at).toLocaleDateString('pl-PL')}
                    </span>
                  </div>
                  
                  <div className="bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        p.score >= 90 ? 'bg-green-500' : 
                        p.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${p.score}%` }}
                    />
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );

  // Detailed stats component
  const DetailedStatsSection = () => (
    <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Szczegółowe statystyki</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-blue-50/30 rounded-lg border border-blue-200/30">
          <div className="text-2xl font-bold text-blue-600">{stats.completedLessons}</div>
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
  );

  return (
    <StudentPageLayout
      title="Moje Postępy"
      subtitle="Śledź swoje wyniki i analizuj postępy w nauce"
      isLoading={isLoading}
      isEmpty={!stats.completedLessons}
      emptyState={{
        icon: <BarChart3 className="w-8 h-8 text-gray-400" />,
        title: "Brak danych o postępach",
        description: "Ukończ kilka lekcji, aby zobaczyć swoje statystyki",
        actionLabel: "Przejdź do kursów",
        onAction: () => window.location.href = '/student/courses',
      }}
    >
      <StatsSection type="progress" data={stats} className="mb-12" />

      <TrendOverview />

      <FilterComponent />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <SubjectAnalysisSection />
        <RecentResultsSection />
      </div>

      <DetailedStatsSection />
    </StudentPageLayout>
  );
}