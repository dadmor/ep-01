// src/pages/student/TopicList.tsx
import { useFetch } from "../api/hooks";

export const routeConfig = {
  path: "/student/subjects/:subjectId/topics",
  title: "Lista tematów",
  roles: ["student"]
};

export default function TopicList() {
  const { data, isLoading, error } = useFetch('topics', 'tasks');
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}