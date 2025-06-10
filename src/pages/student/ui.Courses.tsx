// src/pages/student/ui.Courses.tsx
import { useFetch } from '@/pages/api/hooks';
import { Link } from 'react-router-dom';

export const routeConfig = { path: "/student/courses", title: "Courses" };

export default function StudentCourses() {
  const { data: lessons, isLoading } = useFetch('lessons', 'lessons');

  if (isLoading) return <div className="loading loading-spinner loading-lg"></div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">📚 Wszystkie kursy</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons?.map(lesson => (
          <div key={lesson.id} className="card bg-base-100 shadow hover:shadow-lg">
            <div className="card-body">
              <h2 className="card-title">{lesson.title}</h2>
              <p className="text-sm opacity-70">{lesson.description}</p>
              <div className="card-actions justify-end">
                <Link 
                  to={`/student/lesson/${lesson.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Rozpocznij
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
