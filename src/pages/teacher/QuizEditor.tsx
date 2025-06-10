// src/pages/teacher/QuizEditor.tsx
import { useInsert } from "../api/hooks";

export const routeConfig = [
  { path: "/teacher/quizzes/create", title: "Nowy quiz", roles: ["teacher"] },
  { path: "/teacher/quizzes/:quizId/edit", title: "Edytuj quiz", roles: ["teacher"] }
];

const mockTask = { 
  lesson_id: '', 
  type: 'multiple_choice', 
  question_text: 'Przykładowe pytanie', 
  options: ['A', 'B', 'C'], 
  correct_answer: 'A', 
  xp_reward: 10 
};

export default function QuizEditor() {
  const mutation = useInsert('tasks', 'tasks');
  
  return (
    <div>
      <button onClick={() => mutation.mutate(mockTask)}>
        Wyślij dane testowe
      </button>
      {mutation.isPending && <p>Ładowanie...</p>}
      {mutation.error && <p>Błąd: {mutation.error.message}</p>}
      {mutation.data && <pre>{JSON.stringify(mutation.data, null, 2)}</pre>}
    </div>
  );
}
