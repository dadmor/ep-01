// src/pages/student/ProgressOverview.tsx
import { useFetch } from "../api/hooks";

export const routeConfig = {
  path: "/student/progress",
  title: "Postęp",
  roles: ["student"]
};

export default function ProgressOverview() {
  const { data, isLoading, error } = useFetch('progress', 'progress');
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}