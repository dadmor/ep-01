// src/pages/teacher/ui.EditTask.tsx
import { useFetch, useUpdate } from '@/pages/api/hooks';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const routeConfig = { path: "/teacher/lessons/:lessonId/tasks/:taskId/edit", title: "Edit Quiz" };

export default function EditTask() {
  const { lessonId, taskId } = useParams();
  const navigate = useNavigate();
  
  const { data: tasks, isLoading } = useFetch('task-edit', `tasks?id=eq.${taskId}`);
  const updateTask = useUpdate('lesson-tasks', 'tasks');

  const [form, setForm] = useState({
    type: 'multiple_choice' as 'multiple_choice' | 'true_false' | 'fill_blank',
    question_text: '',
    options: ['', '', '', ''],
    correct_answer: '',
    explanation: '',
    xp_reward: 10
  });

  const taskData = tasks?.[0];

  // Wypełnij formularz gdy dane się załadują
  useEffect(() => {
    if (taskData) {
      setForm({
        type: taskData.type || 'multiple_choice',
        question_text: taskData.question_text || '',
        options: taskData.options || ['', '', '', ''],
        correct_answer: taskData.correct_answer || '',
        explanation: taskData.explanation || '',
        xp_reward: taskData.xp_reward || 10
      });
    }
  }, [taskData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId) return;
    
    try {
      const payload = {
        type: form.type,
        question_text: form.question_text,
        options: form.type === 'multiple_choice' ? form.options.filter(opt => opt.trim()) : null,
        correct_answer: form.correct_answer,
        explanation: form.explanation,
        xp_reward: form.xp_reward
      };
      
      await updateTask.mutateAsync({
        id: taskId, // Keep as string for UUID
        updates: payload
      });
      navigate(`/teacher/lessons/${lessonId}`);
    } catch (error) {
      console.error('Error updating task:', error);
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
            <h2 className="text-xl font-medium mb-2">Zadanie nie zostało znalezione</h2>
            <p className="text-base-content/70 mb-4">Nie można znaleźć zadania o podanym ID.</p>
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
            <h1 className="card-title text-2xl">
              <span className="text-primary">✏️</span>
              Edytuj quiz
            </h1>
            <p className="text-base-content/70">
              Lekcja ID: {lessonId} | Zadanie ID: {taskId}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Question Type Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">❓ Typ pytania</h2>
                <div className="form-control">
                  <select 
                    className="select select-bordered focus:select-primary w-full"
                    value={form.type}
                    onChange={(e) => setForm({...form, type: e.target.value as any})}
                  >
                    <option value="multiple_choice">📝 Wielokrotny wybór</option>
                    <option value="true_false">✅ Prawda/Fałsz</option>
                    <option value="fill_blank">📝 Uzupełnij lukę</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">💭 Pytanie</h2>
                <div className="form-control">
                  <textarea 
                    className="textarea textarea-bordered focus:textarea-primary h-24 resize-none w-full"
                    placeholder="Wpisz treść pytania..."
                    value={form.question_text}
                    onChange={(e) => setForm({...form, question_text: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Options Card - tylko dla multiple choice */}
            {form.type === 'multiple_choice' && (
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body">
                  <h2 className="card-title text-lg mb-4">📋 Opcje odpowiedzi</h2>
                  <div className="space-y-3">
                    {form.options.map((option, index) => (
                      <div key={index} className="form-control">
                        <label className="block text-sm font-medium mb-1">
                          Opcja {index + 1}
                        </label>
                        <input 
                          type="text"
                          className="input input-bordered focus:input-primary w-full"
                          placeholder={`Wprowadź opcję ${index + 1}...`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...form.options];
                            newOptions[index] = e.target.value;
                            setForm({...form, options: newOptions});
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Correct Answer Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">✅ Poprawna odpowiedź</h2>
                <div className="form-control">
                  {form.type === 'true_false' ? (
                    <select 
                      className="select select-bordered focus:select-primary w-full"
                      value={form.correct_answer}
                      onChange={(e) => setForm({...form, correct_answer: e.target.value})}
                      required
                    >
                      <option value="">Wybierz odpowiedź</option>
                      <option value="true">✅ Prawda</option>
                      <option value="false">❌ Fałsz</option>
                    </select>
                  ) : (
                    <input 
                      type="text"
                      className="input input-bordered focus:input-primary w-full"
                      placeholder="Wpisz poprawną odpowiedź..."
                      value={form.correct_answer}
                      onChange={(e) => setForm({...form, correct_answer: e.target.value})}
                      required
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Explanation and XP Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">💡 Dodatkowe informacje</h2>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="block text-sm font-medium mb-1">
                      Wyjaśnienie (opcjonalne)
                    </label>
                    <textarea 
                      className="textarea textarea-bordered focus:textarea-primary h-20 resize-none w-full"
                      placeholder="Dodaj wyjaśnienie do odpowiedzi..."
                      value={form.explanation}
                      onChange={(e) => setForm({...form, explanation: e.target.value})}
                    />
                  </div>

                  <div className="form-control">
                    <label className="block text-sm font-medium mb-1">
                      Punkty XP za poprawną odpowiedź
                    </label>
                    <input 
                      type="number"
                      className="input input-bordered focus:input-primary w-32"
                      value={form.xp_reward}
                      onChange={(e) => setForm({...form, xp_reward: parseInt(e.target.value) || 0})}
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button 
                    type="button"
                    onClick={() => navigate(`/teacher/lessons/${lessonId}`)}
                    className="btn btn-ghost"
                  >
                    Anuluj
                  </button>
                  <button 
                    type="submit"
                    className="btn btn-primary"
                    disabled={updateTask.isPending}
                  >
                    {updateTask.isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Zapisywanie...
                      </>
                    ) : (
                      <>
                        <span>💾</span>
                        Zapisz zmiany
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}