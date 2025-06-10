// src/pages/teacher/QuizList.tsx
import { useFetch } from "../api/hooks";

export const routeConfig = {
  path: "/teacher/quizzes",
  title: "Lista quizów",
  roles: ["teacher"]
};

export default function QuizList() {
  const { data, isLoading, error } = useFetch("tasks", "tasks");
  
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}