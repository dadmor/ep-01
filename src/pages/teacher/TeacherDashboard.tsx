// src/pages/teacher/TeacherDashboard.tsx
import { useFetch } from "../api/hooks";

export const routeConfig = {
  path: "/teacher/dashboard",
  title: "Panel nauczyciela",
  roles: ["teacher"]
};

export default function TeacherDashboard() {
  const { data, isLoading, error } = useFetch("lessons", "lessons");
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}