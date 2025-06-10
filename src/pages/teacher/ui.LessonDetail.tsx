// src/pages/teacher/ui.LessonDetail.tsx
import { useFetch } from '@/pages/api/hooks';
import { useParams, Link } from 'react-router-dom';

export const routeConfig = { path: "/teacher/lessons/:id", title: "Lesson Detail" };

export default function LessonDetail() {
  const { id } = useParams();
  const { data: lesson } = useFetch('lesson-detail', `lessons?id=eq.${id}`);
  const { data: articles } = useFetch('lesson-articles', `articles?lesson_id=eq.${id}&order=sort_order`);
  const { data: tasks } = useFetch('lesson-tasks', `tasks?lesson_id=eq.${id}`);

  const lessonData = lesson?.[0];

  if (!lessonData) return <div className="loading loading-spinner loading-lg"></div>;

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{lessonData.title}</h1>
        <p className="text-gray-600 mb-4">{lessonData.description}</p>
        <div className="flex gap-2 mb-4">
          <span className="badge badge-primary">{lessonData.subject}</span>
          <span className="badge badge-secondary">{lessonData.grade}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">📄 Treści ({articles?.length || 0})</h2>
              <Link 
                to={`/teacher/lessons/${id}/articles/create`}
                className="btn btn-sm btn-primary"
              >
                ➕ Dodaj treść
              </Link>
            </div>
            <div className="space-y-2">
              {articles?.map(article => (
                <div key={article.id} className="p-3 bg-base-200 rounded">
                  <div className="font-medium">{article.title}</div>
                  <div className="flex gap-2 mt-2">
                    <Link 
                      to={`/teacher/lessons/${id}/articles/${article.id}/edit`}
                      className="btn btn-xs btn-outline"
                    >
                      ✏️ Edytuj
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title">❓ Quizy ({tasks?.length || 0})</h2>
              <Link 
                to={`/teacher/lessons/${id}/tasks/create`}
                className="btn btn-sm btn-primary"
              >
                ➕ Dodaj quiz
              </Link>
            </div>
            <div className="space-y-2">
              {tasks?.map(task => (
                <div key={task.id} className="p-3 bg-base-200 rounded">
                  <div className="font-medium text-sm">{task.question_text}</div>
                  <div className="flex gap-2 mt-2">
                    <span className="badge badge-xs">{task.type}</span>
                    <span className="badge badge-xs badge-accent">{task.xp_reward} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}