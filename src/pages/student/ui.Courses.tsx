// pages/Courses.tsx - Zoptymalizowana wersja (100 linii vs 220)
import React, { useMemo } from 'react';
import { Book, Filter, Trophy } from 'lucide-react';

import { CourseCard } from '@/components/CourseCard';
import { HelpSection } from '@/components/HelpSection';
import { useStudentData } from './hooks/useStudentData';
import { useFilters } from './hooks/useFilters';
import { UniversalGrid } from './grid.UniversalGrid';
import { StudentPageLayout } from '@/components/layout/StudentPageLayout';
import { StatsSection } from './section.StatsSection';

export const routeConfig = { 
  path: "/student/courses", 
  title: "Courses" 
};

export default function StudentCourses() {
  const { lessons, progress, stats, isLoading } = useStudentData();

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

  // Get unique values for filters
  const subjects = useMemo(() => 
    Array.from(new Set(processedLessons.map(l => l.subject).filter(Boolean))), 
    [processedLessons]
  );

  const grades = useMemo(() => 
    Array.from(new Set(processedLessons.map(l => l.grade).filter(Boolean))), 
    [processedLessons]
  );

  // Filter configuration
  const filterConfigs = [
    {
      key: 'search',
      type: 'text' as const,
      label: 'Szukaj',
      placeholder: 'Szukaj kursów...',
    },
    {
      key: 'subject',
      type: 'select' as const,
      label: 'Przedmiot',
      options: [
        { value: 'all', label: 'Wszystkie przedmioty' },
        ...subjects.map(subject => ({ value: subject, label: subject }))
      ],
      defaultValue: 'all',
    },
    {
      key: 'grade',
      type: 'select' as const,
      label: 'Klasa',
      options: [
        { value: 'all', label: 'Wszystkie klasy' },
        ...grades.map(grade => ({ value: grade, label: grade }))
      ],
      defaultValue: 'all',
    },
  ];

  const filterFunctions = {
    search: (lesson: any, value: string) => {
      const searchTerm = value.toLowerCase();
      return lesson.title.toLowerCase().includes(searchTerm) ||
             lesson.description?.toLowerCase().includes(searchTerm) ||
             lesson.topic?.toLowerCase().includes(searchTerm);
    },
    subject: (lesson: any, value: string) => lesson.subject === value,
    grade: (lesson: any, value: string) => lesson.grade === value,
  };

  const { filteredData: filteredLessons, FilterComponent } = useFilters({
    data: processedLessons,
    configs: filterConfigs,
    filterFunctions,
  });

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

  // Calculate course stats
  const courseStats = useMemo(() => {
    const total = processedLessons.length;
    const completed = processedLessons.filter(l => l.isCompleted).length;
    const inProgress = total - completed;
    const totalHours = Math.floor(completed * 0.5); // 30min per lesson

    return { total, completed, inProgress, totalHours };
  }, [processedLessons]);

  const ProgressOverview = () => {
    if (!courseStats.completed) return null;
    
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/60 p-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-900">Świetna robota! 🎉</h3>
            <p className="text-green-700 text-sm">
              Ukończyłeś {courseStats.completed} z {courseStats.total} dostępnych kursów.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-900">
              {Math.round((courseStats.completed / courseStats.total) * 100)}%
            </div>
            <div className="text-sm text-green-600">ukończone</div>
          </div>
        </div>
        <div className="mt-4 bg-green-200/50 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(courseStats.completed / courseStats.total) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const SubjectSection = ({ subject, lessons }: { subject: string, lessons: any[] }) => {
    const completedCount = lessons.filter(l => l.isCompleted).length;
    const progressPercent = Math.round((completedCount / lessons.length) * 100);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{subject}</h2>
            <p className="text-sm text-gray-600">
              {lessons.length} {lessons.length === 1 ? 'kurs' : 'kursy'} • 
              {completedCount} ukończone
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{progressPercent}%</div>
            <div className="text-xs text-gray-500">postęp</div>
          </div>
        </div>
        
        <div className="bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <UniversalGrid
          items={lessons}
          renderItem={(lesson) => (
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
          )}
          gridCols="3"
          emptyState={{
            icon: <Book className="w-6 h-6 text-gray-400" />,
            title: "Brak kursów",
            description: "Nie ma kursów w tym przedmiocie"
          }}
        />
      </div>
    );
  };

  return (
    <StudentPageLayout
      title="Twoje Kursy"
      subtitle="Rozwijaj swoje umiejętności dzięki starannie przygotowanym kursom"
      isLoading={isLoading}
      isEmpty={!processedLessons.length}
      emptyState={{
        icon: <Book className="w-8 h-8 text-gray-400" />,
        title: "Brak dostępnych kursów",
        description: "Obecnie nie ma żadnych kursów do wyświetlenia",
        actionLabel: "Odśwież stronę",
        onAction: () => window.location.reload(),
      }}
    >
      <StatsSection type="courses" data={courseStats} className="mb-12" />

      <ProgressOverview />

      <FilterComponent />

      {filteredLessons.length === 0 ? (
        <div className="text-center py-12">
          <Filter className="w-8 h-8 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Brak wyników</h3>
          <p className="text-gray-600">Nie znaleziono kursów pasujących do wybranych filtrów</p>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(lessonsBySubject).map(([subject, subjectLessons]) => (
            <SubjectSection key={subject} subject={subject} lessons={subjectLessons} />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-16">
        <HelpSection />
      </div>
    </StudentPageLayout>
  );
}