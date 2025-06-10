// src/pages/student/QuizView.tsx
import { useFetch } from "../api/hooks";

export const routeConfig = {
  path: "/student/quizzes/:quizId",
  title: "Quiz",
  roles: ["student"]
};

export default function QuizView() {
  const { data, isLoading, error } = useFetch('quiz', 'tasks');
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}