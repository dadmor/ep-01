// src/pages/teacher/StudentProgress.tsx
import { useFetch } from "../api/hooks";

export const routeConfig = {
  path: "/teacher/progress",
  title: "Postęp uczniów",
  roles: ["teacher"]
};

export default function StudentProgress() {
  const { data, isLoading, error } = useFetch("progress", "progress");
  
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}