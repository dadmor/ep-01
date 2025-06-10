// src/pages/student/ui.Courses.tsx
import { CourseCard } from '@/components/CourseCard';
import { HelpSection } from '@/components/HelpSection';
import { EmptyState, PageHeader, StatCard } from '@/components/ui_bloglike/base';
import { LoadingSpinner } from '@/components/ui_shdn/basic';
import { useFetch } from '@/pages/api/hooks';
import { Book, Clock, CircleCheck, Zap } from 'lucide-react';

export const routeConfig = { path: "/student/courses", title: "Courses" };

export default function StudentCourses() {
  const { data: lessons, isLoading } = useFetch('lessons', 'lessons');

  if (isLoading) {
    return <LoadingSpinner message="Ładowanie kursów..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <PageHeader 
        title="Twoje Kursy"
        subtitle="Rozwijaj swoje umiejętności dzięki starannie przygotowanym kursom"
      />

      <div className="container mx-auto px-8 py-16">
        {!lessons?.length ? (
          <EmptyState
            icon={<Book className="text-slate-400" />}
            title="Brak dostępnych kursów"
            description="Obecnie nie ma żadnych kursów do wyświetlenia"
            actionLabel="Odśwież stronę"
            onAction={() => window.location.reload()}
          />
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <StatCard
                title="Dostępne kursy"
                value={lessons.length}
                icon={<Book className="w-6 h-6 text-blue-600" />}
                iconBg="bg-blue-50"
              />
              
              <StatCard
                title="W trakcie"
                value={0}
                icon={<Clock className="w-6 h-6 text-amber-600" />}
                iconBg="bg-amber-50"
              />
              
              <StatCard
                title="Ukończone"
                value={0}
                icon={<CircleCheck className="w-6 h-6 text-green-600" />}
                iconBg="bg-green-50"
              />
              
              <StatCard
                title="Godziny nauki"
                value="0h"
                icon={<Zap className="w-6 h-6 text-purple-600" />}
                iconBg="bg-purple-50"
              />
            </div>

            {/* Course grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lessons.map((lesson) => (
                <CourseCard
                  key={lesson.id}
                  id={lesson.id}
                  title={lesson.title}
                  description={lesson.description}
                />
              ))}
            </div>

            <HelpSection />
          </>
        )}
      </div>
    </div>
  );
}
