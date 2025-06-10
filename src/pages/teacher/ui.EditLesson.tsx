// src/pages/teacher/ui.EditLesson.tsx
import { useFetch, useUpdate } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const routeConfig = { path: "/teacher/lessons/:id/edit", title: "Edit Lesson" };

export default function EditLesson() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: lessons, isLoading } = useFetch('lesson-edit', `lessons?id=eq.${id}`);
  const updateLesson = useUpdate('teacher-lessons', 'lessons');
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    subject: '',
    grade: '',
    topic: ''
  });

  const lessonData = lessons?.[0];

  // Wypełnij formularz gdy dane się załadują
  useEffect(() => {
    if (lessonData) {
      setForm({
        title: lessonData.title || '',
        description: lessonData.description || '',
        subject: lessonData.subject || '',
        grade: lessonData.grade || '',
        topic: lessonData.topic || ''
      });
    }
  }, [lessonData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    try {
      // Don't parse id as integer - keep it as string since it's a UUID
      await updateLesson.mutateAsync({
        id: id, // Keep as string
        updates: form
      });
      navigate(`/teacher/lessons/${id}`);
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center">
            <h2 className="text-xl font-medium mb-2">Lekcja nie została znaleziona</h2>
            <p className="text-base-content/70 mb-4">Nie można znaleźć lekcji o podanym ID.</p>
            <button 
              onClick={() => navigate('/teacher/lessons')}
              className="btn btn-primary"
            >
              ← Powrót do listy lekcji
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
              Edytuj lekcję
            </h1>
            <p className="text-base-content/70">ID: {id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Cards */}
          <div className="space-y-4">
            {/* Basic Info Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">📖 Podstawowe informacje</h2>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="block text-sm font-medium mb-1">Tytuł lekcji</label>
                    <input 
                      type="text"
                      className="input input-bordered focus:input-primary w-full"
                      placeholder="Wprowadź tytuł lekcji..."
                      value={form.title}
                      onChange={(e) => setForm({...form, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="block text-sm font-medium mb-1">Opis</label>
                    <textarea 
                      className="textarea textarea-bordered focus:textarea-primary h-24 resize-none w-full"
                      placeholder="Opisz czego dotyczy lekcja..."
                      value={form.description}
                      onChange={(e) => setForm({...form, description: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Classification Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">🏷️ Klasyfikacja</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="block text-sm font-medium mb-1">Przedmiot</label>
                      <select 
                        className="select select-bordered focus:select-primary w-full"
                        value={form.subject}
                        onChange={(e) => setForm({...form, subject: e.target.value})}
                      >
                        <option value="">Wybierz przedmiot</option>
                        <option value="Matematyka">📐 Matematyka</option>
                        <option value="Polski">📚 Polski</option>
                        <option value="Historia">🏛️ Historia</option>
                        <option value="Biologia">🧬 Biologia</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="block text-sm font-medium mb-1">Klasa</label>
                      <select 
                        className="select select-bordered focus:select-primary w-full"
                        value={form.grade}
                        onChange={(e) => setForm({...form, grade: e.target.value})}
                      >
                        <option value="">Wybierz klasę</option>
                        <option value="Klasa 1">🥇 Klasa 1</option>
                        <option value="Klasa 2">🥈 Klasa 2</option>
                        <option value="Klasa 3">🥉 Klasa 3</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="block text-sm font-medium mb-1">Temat</label>
                    <input 
                      type="text"
                      className="input input-bordered focus:input-primary w-full"
                      placeholder="Główny temat lekcji..."
                      value={form.topic}
                      onChange={(e) => setForm({...form, topic: e.target.value})}
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
                    onClick={() => navigate(`/teacher/lessons/${id}`)}
                    className="btn btn-ghost"
                  >
                    Anuluj
                  </button>
                  <button 
                    type="submit"
                    className="btn btn-primary"
                    disabled={updateLesson.isPending}
                  >
                    {updateLesson.isPending ? (
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