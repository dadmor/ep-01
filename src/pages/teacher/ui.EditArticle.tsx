// src/pages/teacher/ui.EditArticle.tsx
import { useFetch, useUpdate } from '@/pages/api/hooks';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const routeConfig = { path: "/teacher/lessons/:lessonId/articles/:articleId/edit", title: "Edit Article" };

export default function EditArticle() {
  const { lessonId, articleId } = useParams();
  const navigate = useNavigate();
  
  const { data: articles, isLoading } = useFetch('article-edit', `articles?id=eq.${articleId}`);
  const updateArticle = useUpdate('lesson-articles', 'articles');
  
  const [form, setForm] = useState({
    title: '',
    content: '',
    sort_order: 0
  });

  const articleData = articles?.[0];

  // Wypełnij formularz gdy dane się załadują
  useEffect(() => {
    if (articleData) {
      setForm({
        title: articleData.title || '',
        content: articleData.content || '',
        sort_order: articleData.sort_order || 0
      });
    }
  }, [articleData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleId) return;
    
    try {
      await updateArticle.mutateAsync({
        id: articleId, // Keep as string for UUID
        updates: form
      });
      navigate(`/teacher/lessons/${lessonId}`);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!articleData) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center">
            <h2 className="text-xl font-medium mb-2">Artykuł nie został znaleziony</h2>
            <p className="text-base-content/70 mb-4">Nie można znaleźć artykułu o podanym ID.</p>
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
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body py-4">
            <h1 className="card-title text-2xl">
              <span className="text-primary">✏️</span>
              Edytuj artykuł
            </h1>
            <p className="text-base-content/70">
              Lekcja ID: {lessonId} | Artykuł ID: {articleId}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Basic Info Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">📄 Informacje podstawowe</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                      <div className="form-control">
                        <label className="block text-sm font-medium mb-1">Tytuł artykułu</label>
                        <input 
                          type="text"
                          className="input input-bordered focus:input-primary w-full"
                          placeholder="Wprowadź tytuł artykułu..."
                          value={form.title}
                          onChange={(e) => setForm({...form, title: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-1">
                      <div className="form-control">
                        <label className="block text-sm font-medium mb-1">Kolejność</label>
                        <input 
                          type="number"
                          className="input input-bordered focus:input-primary w-full"
                          value={form.sort_order}
                          onChange={(e) => setForm({...form, sort_order: parseInt(e.target.value) || 0})}
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">📝 Treść artykułu</h2>
                <div className="form-control">
                  <label className="block text-sm font-medium mb-1">Zawartość</label>
                  <textarea 
                    className="textarea textarea-bordered focus:textarea-primary resize-none w-full"
                    style={{ height: '400px' }}
                    placeholder="Wpisz treść artykułu..."
                    value={form.content}
                    onChange={(e) => setForm({...form, content: e.target.value})}
                    required
                  />
                  <div className="label">
                    <span className="label-text-alt text-base-content/60">
                      Znaki: {form.content.length}
                    </span>
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
                    disabled={updateArticle.isPending}
                  >
                    {updateArticle.isPending ? (
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