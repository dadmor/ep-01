// src/pages/teacher/ui.Lessons.tsx
import { useFetch, useInsert } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export const routeConfig = { path: "/teacher/lessons", title: "Manage Lessons" };

export default function TeacherLessons() {
  const { user } = useAuth();
  const { data: lessons, isLoading } = useFetch('teacher-lessons', `lessons?author_id=eq.${user?.id}`);

  if (isLoading) return <div className="loading loading-spinner loading-lg"></div>;

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📚 Moje lekcje</h1>
        <Link to="/teacher/lessons/create" className="btn btn-primary">
          ➕ Nowa lekcja
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons?.map(lesson => (
          <div key={lesson.id} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">{lesson.title}</h2>
              <p className="text-sm opacity-70">{lesson.description}</p>
              <div className="badge badge-outline">{lesson.subject}</div>
              
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
    </div>
  );
}