// src/pages/student/ui.Courses.tsx
import { CourseCard } from '@/components/CourseCard';
import { HelpSection } from '@/components/HelpSection';
import { EmptyState, PageHeader, StatCard } from '@/components/ui_bloglike/base';
import { LoadingSpinner } from '@/components/ui_shdn/basic';
import { useFetch } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { 
  Book, 
  Clock, 
  CircleCheck, 
  Zap, 
  Trophy,
  Filter,
  Search,
  BookMarked,
  Lightbulb,
  Calculator,
  Globe,
  Palette,
  Music,
  Beaker,
  History,
  Languages
} from 'lucide-react';
import { useState, useMemo } from 'react';

export const routeConfig = { path: "/student/courses", title: "Courses" };

interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  education_level: string;
  grade: string;
  topic: string;
  author_id: string;
}

interface Progress {
  lesson_id: string;
  score: number;
  completed_at: string;
}

// Subject icons mapping
const subjectIcons: Record<string, any> = {
  'Matematyka': Calculator,
  'Język Polski': BookMarked,
  'Język Angielski': Languages,
  'Historia': History,
  'Geografia': Globe,
  'Biologia': Lightbulb,
  'Chemia': Beaker,
  'Fizyka': Zap,
  'Plastyka': Palette,
  'Muzyka': Music,
  'default': Book
};

// Subject colors
const subjectColors: Record<string, string> = {
  'Matematyka': 'blue',
  'Język Polski': 'purple',
  'Język Angielski': 'green',
  'Historia': 'amber',
  'Geografia': 'emerald',
  'Biologia': 'lime',
  'Chemia': 'orange',
  'Fizyka': 'cyan',
  'Plastyka': 'pink',
  'Muzyka': 'violet'
};

export default function StudentCourses() {
  const { user } = useAuth();
  const { data: lessons, isLoading: lessonsLoading } = useFetch<Lesson>('lessons', 'lessons');
  const { data: progress, isLoading: progressLoading } = useFetch<Progress>('student-progress', 'progress');
  
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const isLoading = lessonsLoading || progressLoading;

  // Process lessons with progress data
  const processedLessons = useMemo(() => {
    if (!lessons) return [];
    
    return lessons.map(lesson => {
      const lessonProgress = progress?.find(p => p.lesson_id === lesson.id);
      return {
        ...lesson,
        isCompleted: !!lessonProgress,
        score: lessonProgress?.score || 0,
        completedAt: lessonProgress?.completed_at
      };
    });
  }, [lessons, progress]);

  // Get unique subjects and grades
  const subjects = useMemo(() => {
    if (!processedLessons) return [];
    return Array.from(new Set(processedLessons.map(l => l.subject).filter(Boolean)));
  }, [processedLessons]);

  const grades = useMemo(() => {
    if (!processedLessons) return [];
    return Array.from(new Set(processedLessons.map(l => l.grade).filter(Boolean)));
  }, [processedLessons]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    if (!processedLessons) return [];
    
    return processedLessons.filter(lesson => {
      const matchesSubject = selectedSubject === 'all' || lesson.subject === selectedSubject;
      const matchesGrade = selectedGrade === 'all' || lesson.grade === selectedGrade;
      const matchesSearch = searchTerm === '' || 
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.topic?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSubject && matchesGrade && matchesSearch;
    });
  }, [processedLessons, selectedSubject, selectedGrade, searchTerm]);

  // Group lessons by subject
  const lessonsBySubject = useMemo(() => {
    const grouped: Record<string, typeof filteredLessons> = {};
    filteredLessons.forEach(lesson => {
      const subject = lesson.subject || 'Inne';
      if (!grouped[subject]) {
        grouped[subject] = [];
      }
      grouped[subject].push(lesson);
    });
    return grouped;
  }, [filteredLessons]);

  // Calculate stats
  const stats = useMemo(() => {
    if (!processedLessons) return { total: 0, completed: 0, inProgress: 0, totalHours: 0 };
    
    const completed = processedLessons.filter(l => l.isCompleted).length;
    const inProgress = processedLessons.filter(l => !l.isCompleted).length;
    const totalHours = Math.floor(completed * 0.5); // Assume 30min per lesson
    
    return {
      total: processedLessons.length,
      completed,
      inProgress,
      totalHours
    };
  }, [processedLessons]);

  if (isLoading) {
    return <LoadingSpinner message="Ładowanie kursów..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <PageHeader 
        title="Twoje Kursy"
        subtitle="Rozwijaj swoje umiejętności dzięki starannie przygotowanym kursom"
        variant="courses"
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {!processedLessons?.length ? (
          <div className="max-w-lg mx-auto">
            <EmptyState
              icon={<Book className="w-8 h-8 text-gray-400" />}
              title="Brak dostępnych kursów"
              description="Obecnie nie ma żadnych kursów do wyświetlenia"
              actionLabel="Odśwież stronę"
              onAction={() => window.location.reload()}
            />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Dostępne kursy"
                  value={stats.total}
                  icon={<Book className="w-5 h-5" />}
                  color="blue"
                />
                
                <StatCard
                  title="W trakcie"
                  value={stats.inProgress}
                  icon={<Clock className="w-5 h-5" />}
                  color="amber"
                />
                
                <StatCard
                  title="Ukończone"
                  value={stats.completed}
                  icon={<CircleCheck className="w-5 h-5" />}
                  color="green"
                />
                
                <StatCard
                  title="Godziny nauki"
                  value={`${stats.totalHours}h`}
                  icon={<Zap className="w-5 h-5" />}
                  color="purple"
                />
              </div>
            </div>

            {/* Filters & Search */}
            <div className="max-w-5xl mx-auto mb-8">
              <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-6">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  {/* Search */}
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Szukaj kursów..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="flex gap-3">
                    <select
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      <option value="all">Wszystkie przedmioty</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>

                    <select
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                    >
                      <option value="all">Wszystkie klasy</option>
                      {grades.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            {user && stats.completed > 0 && (
              <div className="max-w-5xl mx-auto mb-12">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/60 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">Świetna robota, {user.username}! 🎉</h3>
                      <p className="text-green-700 text-sm">
                        Ukończyłeś {stats.completed} z {stats.total} dostępnych kursów. 
                        Kontynuuj naukę, aby zdobyć więcej XP!
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-900">
                        {Math.round((stats.completed / stats.total) * 100)}%
                      </div>
                      <div className="text-sm text-green-600">ukończone</div>
                    </div>
                  </div>
                  <div className="mt-4 bg-green-200/50 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses by Subject */}
            <div className="max-w-5xl mx-auto space-y-12">
              {Object.entries(lessonsBySubject).map(([subject, subjectLessons]) => {
                const Icon = subjectIcons[subject] || subjectIcons.default;
                const color = subjectColors[subject] || 'gray';
                
                return (
                  <div key={subject} className="space-y-6">
                    {/* Subject Header */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-${color}-50/50 rounded-xl flex items-center justify-center border border-${color}-200/40`}>
                        <Icon className={`w-6 h-6 text-${color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900">{subject}</h2>
                        <p className="text-sm text-gray-600">
                          {subjectLessons.length} {subjectLessons.length === 1 ? 'kurs' : 'kursy'} • 
                          {subjectLessons.filter(l => l.isCompleted).length} ukończone
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {Math.round((subjectLessons.filter(l => l.isCompleted).length / subjectLessons.length) * 100)}%
                        </div>
                        <div className="text-xs text-gray-500">postęp</div>
                      </div>
                    </div>

                    {/* Subject Progress Bar */}
                    <div className="bg-gray-200 rounded-full h-1.5 ml-16">
                      <div 
                        className={`bg-${color}-500 h-1.5 rounded-full transition-all duration-500`}
                        style={{ 
                          width: `${(subjectLessons.filter(l => l.isCompleted).length / subjectLessons.length) * 100}%` 
                        }}
                      ></div>
                    </div>

                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-16">
                      {subjectLessons.map((lesson) => (
                        <CourseCard
                          key={lesson.id}
                          id={lesson.id}
                          title={lesson.title}
                          description={lesson.description}
                          subject={lesson.subject}
                          topic={lesson.topic}
                          grade={lesson.grade}
                          isCompleted={lesson.isCompleted}
                          score={lesson.score}
                          completedAt={lesson.completedAt}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No results */}
            {filteredLessons.length === 0 && (
              <div className="max-w-lg mx-auto mt-12">
                <EmptyState
                  icon={<Filter className="w-8 h-8 text-gray-400" />}
                  title="Brak wyników"
                  description="Nie znaleziono kursów pasujących do wybranych filtrów"
                  actionLabel="Wyczyść filtry"
                  onAction={() => {
                    setSelectedSubject('all');
                    setSelectedGrade('all');
                    setSearchTerm('');
                  }}
                />
              </div>
            )}

            <div className="max-w-4xl mx-auto mt-16">
              <HelpSection />
            </div>
          </>
        )}
      </div>
    </div>
  );
}