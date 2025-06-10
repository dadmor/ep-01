// src/pages/student/Leaderboard.tsx
import { useFetch } from "../api/hooks";

export const routeConfig = {
  path: "/student/leaderboard",
  title: "Ranking",
  roles: ["student"]
};

export default function Leaderboard() {
  const { data, isLoading, error } = useFetch('rankings', 'student_rankings');
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}