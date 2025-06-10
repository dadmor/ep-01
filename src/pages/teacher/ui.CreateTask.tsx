// src/pages/teacher/ui.CreateTask.tsx
import { useInsert } from '@/pages/api/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const routeConfig = { path: "/teacher/lessons/:lessonId/tasks/create", title: "Create Quiz" };

export default function CreateTask() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const insertTask = useInsert('lesson-tasks', 'tasks');
  
  const [form, setForm] = useState({
    type: 'multiple_choice' as 'multiple_choice' | 'true_false' | 'fill_blank',
    question_text: '',
    options: ['', '', '', ''],
    correct_answer: '',
    explanation: '',
    xp_reward: 10
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        lesson_id: lessonId,
        type: form.type,
        question_text: form.question_text,
        options: form.type === 'multiple_choice' ? form.options.filter(opt => opt.trim()) : null,
        correct_answer: form.correct_answer,
        explanation: form.explanation,
        xp_reward: form.xp_reward
      };
      
      await insertTask.mutateAsync(payload);
      navigate(`/teacher/lessons/${lessonId}`);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">❓ Nowy quiz</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Typ pytania</span>
          </label>
          <select 
            className="select select-bordered"
            value={form.type}
            onChange={(e) => setForm({...form, type: e.target.value as any})}
          >
            <option value="multiple_choice">Wielokrotny wybór</option>
            <option value="true_false">Prawda/Fałsz</option>
            <option value="fill_blank">Uzupełnij lukę</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Pytanie</span>
          </label>
          <textarea 
            className="textarea textarea-bordered"
            value={form.question_text}
            onChange={(e) => setForm({...form, question_text: e.target.value})}
            required
          />
        </div>

        {form.type === 'multiple_choice' && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Opcje odpowiedzi</span>
            </label>
            {form.options.map((option, index) => (
              <input 
                key={index}
                type="text"
                className="input input-bordered mb-2"
                placeholder={`Opcja ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...form.options];
                  newOptions[index] = e.target.value;
                  setForm({...form, options: newOptions});
                }}
              />
            ))}
          </div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Poprawna odpowiedź</span>
          </label>
          {form.type === 'true_false' ? (
            <select 
              className="select select-bordered"
              value={form.correct_answer}
              onChange={(e) => setForm({...form, correct_answer: e.target.value})}
              required
            >
              <option value="">Wybierz</option>
              <option value="true">Prawda</option>
              <option value="false">Fałsz</option>
            </select>
          ) : (
            <input 
              type="text"
              className="input input-bordered"
              value={form.correct_answer}
              onChange={(e) => setForm({...form, correct_answer: e.target.value})}
              required
            />
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Wyjaśnienie (opcjonalne)</span>
          </label>
          <textarea 
            className="textarea textarea-bordered"
            value={form.explanation}
            onChange={(e) => setForm({...form, explanation: e.target.value})}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Punkty XP</span>
          </label>
          <input 
            type="number"
            className="input input-bordered w-24"
            value={form.xp_reward}
            onChange={(e) => setForm({...form, xp_reward: parseInt(e.target.value)})}
            min="1"
            required
          />
        </div>

        <div className="flex gap-2">
          <button 
            type="submit"
            className="btn btn-primary flex-1"
            disabled={insertTask.isPending}
          >
            {insertTask.isPending ? 'Tworzenie...' : '✅ Utwórz quiz'}
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