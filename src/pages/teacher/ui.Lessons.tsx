// src/pages/teacher/ui.Lessons.tsx
import { useFetch, useInsert } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { TeacherMenu } from './menu.TeacherMenu';

export const routeConfig = { path: "/teacher/lessons", title: "Manage Lessons" };

export default function TeacherLessons() {
  const { user } = useAuth();
  const { data: lessons, isLoading } = useFetch('teacher-lessons', `lessons?author_id=eq.${user?.id}`);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <SidebarLayout menuComponent={<TeacherMenu userRole="teacher" />}>
      <div className="max-w-6xl mx-auto space-y-6 p-6">
        
        {/* Header Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body py-4">
            <div className="flex justify-between items-center">
              <h1 className="card-title text-2xl">
                <span className="text-primary">📚</span>
                Moje lekcje
              </h1>
              <Link to="/teacher/lessons/create" className="btn btn-primary">
                ➕ Nowa lekcja
              </Link>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        {lessons && lessons.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map(lesson => (
              <div key={lesson.id} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="card-body">
                  <h2 className="card-title text-lg">{lesson.title}</h2>
                  <p className="text-sm opacity-70 line-clamp-3">{lesson.description}</p>
                  
                  <div className="flex gap-2 mt-2">
                    <div className="badge badge-outline">{lesson.subject}</div>
                    {lesson.grade && <div className="badge badge-ghost">{lesson.grade}</div>}
                  </div>
                  
                  <div className="card-actions justify-end mt-4">
                    <Link 
                      to={`/teacher/lessons/${lesson.id}/edit`}
                      className="btn btn-sm btn-outline"
                    >
                      ✏️ Edytuj
                    </Link>
                    <Link 
                      to={`/teacher/lessons/${lesson.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      👁️ Zobacz
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body py-16 text-center">
              <div className="text-6xl opacity-30 mb-4">📚</div>
              <h2 className="text-xl font-medium mb-2">Brak lekcji</h2>
              <p className="text-base-content/70 mb-6">Nie masz jeszcze żadnych lekcji. Utwórz swoją pierwszą lekcję!</p>
              <Link to="/teacher/lessons/create" className="btn btn-primary">
                ➕ Utwórz pierwszą lekcję
              </Link>
            </div>
          </div>
        )}
      </div>
      </SidebarLayout>
  );
}