// src/pages/teacher/ui.TaskDetail.tsx
import { useFetch, useDelete } from '@/pages/api/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const routeConfig = { path: "/teacher/lessons/:lessonId/tasks/:taskId", title: "Quiz Details" };

export default function TaskDetail() {
  const { lessonId, taskId } = useParams();
  const navigate = useNavigate();
  
  const { data: tasks, isLoading } = useFetch('task-detail', `tasks?id=eq.${taskId}`);
  const deleteTask = useDelete('lesson-tasks', 'tasks');

  const taskData = tasks?.[0];

  const handleDelete = async () => {
    if (window.confirm('Czy na pewno chcesz usunąć ten quiz?')) {
      try {
        await deleteTask.mutateAsync({ id: taskId! });
        navigate(`/teacher/lessons/${lessonId}`);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple_choice': return '📝 Wielokrotny wybór';
      case 'true_false': return '✅ Prawda/Fałsz';
      case 'fill_blank': return '📝 Uzupełnij lukę';
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!taskData) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center">
            <h2 className="text-xl font-medium mb-2">Quiz nie został znaleziony</h2>
            <p className="text-base-content/70 mb-4">Nie można znaleźć quizu o podanym ID.</p>
            <button 
              onClick={() => navigate(`/teacher/lessons/${lessonId}`)}
              className="btn btn-primary"
            >
              ← Powrót do lekcji
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="card-title text-2xl">
                  <span className="text-primary">❓</span>
                  Szczegóły quizu
                </h1>
                <p className="text-base-content/70">
                  Lekcja ID: {lessonId} | Quiz ID: {taskId}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate(`/teacher/lessons/${lessonId}/tasks/${taskId}/edit`)}
                  className="btn btn-primary btn-sm"
                >
                  <span>✏️</span>
                  Edytuj
                </button>
                <button 
                  onClick={handleDelete}
                  className="btn btn-error btn-sm"
                  disabled={deleteTask.isPending}
                >
                  {deleteTask.isPending ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <span>🗑️</span>
                  )}
                  Usuń
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Type and Question Card */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">🎯 Podstawowe informacje</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-base-content/70">
                    Typ pytania
                  </label>
                  <div className="badge badge-primary badge-lg">
                    {getTypeLabel(taskData.type)}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-base-content/70">
                    Pytanie
                  </label>
                  <div className="bg-base-200 p-4 rounded-lg border-l-4 border-primary">
                    {taskData.question_text}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-base-content/70">
                    Punkty XP za poprawną odpowiedź
                  </label>
                  <div className="badge badge-accent badge-lg">
                    ⭐ {taskData.xp_reward} XP
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Options Card - tylko dla multiple choice */}
          {taskData.type === 'multiple_choice' && taskData.options && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">📋 Opcje odpowiedzi</h2>
                <div className="space-y-3">
                  {taskData.options.map((option: string, index: number) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border-l-4 ${
                        option === taskData.correct_answer 
                          ? 'bg-success/10 border-success' 
                          : 'bg-base-200 border-base-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          <span className="font-semibold mr-2">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          {option}
                        </span>
                        {option === taskData.correct_answer && (
                          <span className="badge badge-success badge-sm">
                            ✓ Poprawna
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Correct Answer Card - dla non-multiple choice */}
          {taskData.type !== 'multiple_choice' && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">✅ Poprawna odpowiedź</h2>
                <div className="bg-success/10 border-l-4 border-success p-4 rounded-lg">
                  <span className="font-medium">
                    {taskData.type === 'true_false' 
                      ? (taskData.correct_answer === 'true' ? '✅ Prawda' : '❌ Fałsz')
                      : taskData.correct_answer
                    }
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Explanation Card */}
          {taskData.explanation && (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">💡 Wyjaśnienie</h2>
                <div className="bg-info/10 border-l-4 border-info p-4 rounded-lg">
                  {taskData.explanation}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Card */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <div className="card-actions">
                <button 
                  onClick={() => navigate(`/teacher/lessons/${lessonId}`)}
                  className="btn btn-ghost"
                >
                  ← Powrót do lekcji
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}