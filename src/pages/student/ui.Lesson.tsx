// src/pages/student/ui.Lesson.tsx
import { useParams } from 'react-router-dom';
import { useFetch } from '@/pages/api/hooks';

export const routeConfig = { path: "/student/lesson/:id", title: "Lesson" };

export default function StudentLesson() {
  const { id } = useParams();
  const { data: articles } = useFetch(`lesson-${id}-articles`, `articles?lesson_id=eq.${id}`);
  const { data: tasks } = useFetch(`lesson-${id}-tasks`, `tasks?lesson_id=eq.${id}`);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="space-y-6">
        {articles?.map(article => (
          <div key={article.id} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">{article.title}</h2>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        ))}

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">✏️ Zadania</h2>
            <div className="space-y-4">
              {tasks?.map(task => (
                <div key={task.id} className="p-4 bg-base-200 rounded">
                  <h3 className="font-bold mb-2">{task.question_text}</h3>
                  <div className="space-y-2">
                    {task.options?.map((option, idx) => (
                      <label key={idx} className="label cursor-pointer justify-start gap-2">
                        <input type="radio" name={`task-${task.id}`} className="radio radio-sm" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary">Sprawdź odpowiedzi</button>
          </div>
        </div>
      </div>
    </div>
  );
}