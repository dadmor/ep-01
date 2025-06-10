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

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="text-2xl font-bold mb-2">{lessonData.title}</h1>
            <p className="text-base-content/70 mb-4">{lessonData.description}</p>
            <div className="flex gap-2">
              <span className="badge badge-primary">{lessonData.subject}</span>
              <span className="badge badge-secondary">{lessonData.grade}</span>
              {lessonData.topic && <span className="badge badge-outline">{lessonData.topic}</span>}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Articles Card */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title text-lg">
                  <span className="text-primary">📄</span>
                  Treści ({articles?.length || 0})
                </h2>
                <Link 
                  to={`/teacher/lessons/${id}/articles/create`}
                  className="btn btn-sm btn-primary"
                >
                  ➕ Dodaj treść
                </Link>
              </div>
              
              <div className="space-y-3">
                {articles && articles.length > 0 ? (
                  articles.map(article => (
                    <div key={article.id} className="card bg-base-200 shadow-sm">
                      <div className="card-body py-3">
                        <div className="font-medium text-sm">{article.title}</div>
                        <div className="flex gap-2 mt-2">
                          <Link 
                            to={`/teacher/lessons/${id}/articles/${article.id}/edit`}
                            className="btn btn-xs btn-outline"
                          >
                            ✏️ Edytuj
                          </Link>
                          <Link 
                            to={`/teacher/lessons/${id}/articles/${article.id}`}
                            className="btn btn-xs btn-ghost"
                          >
                            👁️ Zobacz
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-base-content/50">
                    <div className="text-3xl opacity-30 mb-2">📄</div>
                    <p className="text-sm mb-3">Brak treści</p>
                    <Link 
                      to={`/teacher/lessons/${id}/articles/create`}
                      className="btn btn-sm btn-primary"
                    >
                      Dodaj pierwszą treść
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tasks Card */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title text-lg">
                  <span className="text-primary">❓</span>
                  Quizy ({tasks?.length || 0})
                </h2>
                <Link 
                  to={`/teacher/lessons/${id}/tasks/create`}
                  className="btn btn-sm btn-primary"
                >
                  ➕ Dodaj quiz
                </Link>
              </div>
              
              <div className="space-y-3">
                {tasks && tasks.length > 0 ? (
                  tasks.map(task => (
                    <div key={task.id} className="card bg-base-200 shadow-sm">
                      <div className="card-body py-3">
                        <div className="font-medium text-sm line-clamp-2">{task.question_text}</div>
                        <div className="flex gap-2 mt-2">
                          <span className="badge badge-xs badge-outline">{task.type}</span>
                          <span className="badge badge-xs badge-accent">{task.xp_reward} XP</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Link 
                            to={`/teacher/lessons/${id}/tasks/${task.id}/edit`}
                            className="btn btn-xs btn-outline"
                          >
                            ✏️ Edytuj
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-base-content/50">
                    <div className="text-3xl opacity-30 mb-2">❓</div>
                    <p className="text-sm mb-3">Brak quizów</p>
                    <Link 
                      to={`/teacher/lessons/${id}/tasks/create`}
                      className="btn btn-sm btn-primary"
                    >
                      Dodaj pierwszy quiz
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4">
              <span className="text-primary">⚡</span>
              Szybkie akcje
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link 
                to={`/teacher/lessons/${id}/edit`}
                className="btn btn-outline"
              >
                ✏️ Edytuj lekcję
              </Link>
              <Link 
                to="/teacher/lessons"
                className="btn btn-ghost"
              >
                ← Powrót do listy
              </Link>
              <Link 
                to={`/student/lessons/${id}`}
                className="btn btn-info"
              >
                👁️ Podgląd ucznia
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}