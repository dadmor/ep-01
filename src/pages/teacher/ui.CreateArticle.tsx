// src/pages/teacher/ui.CreateArticle.tsx
import { useInsert } from '@/pages/api/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const routeConfig = { path: "/teacher/lessons/:lessonId/articles/create", title: "Add Content" };

export default function CreateArticle() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const insertArticle = useInsert('lesson-articles', 'articles');
  
  const [form, setForm] = useState({
    title: '',
    content: '',
    sort_order: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertArticle.mutateAsync({
        ...form,
        lesson_id: lessonId
      });
      navigate(`/teacher/lessons/${lessonId}`);
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📄 Dodaj treść</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tytuł treści</span>
          </label>
          <input 
            type="text"
            className="input input-bordered"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Kolejność</span>
          </label>
          <input 
            type="number"
            className="input input-bordered w-24"
            value={form.sort_order}
            onChange={(e) => setForm({...form, sort_order: parseInt(e.target.value)})}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Treść</span>
          </label>
          <textarea 
            className="textarea textarea-bordered h-96"
            value={form.content}
            onChange={(e) => setForm({...form, content: e.target.value})}
            placeholder="Wpisz treść lekcji..."
            required
          />
        </div>

        <div className="flex gap-2">
          <button 
            type="submit"
            className="btn btn-primary flex-1"
            disabled={insertArticle.isPending}
          >
            {insertArticle.isPending ? 'Dodawanie...' : '✅ Dodaj treść'}
          </button>
          <button 
            type="button"
            onClick={() => navigate(`/teacher/lessons/${lessonId}`)}
            className="btn btn-ghost"
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}