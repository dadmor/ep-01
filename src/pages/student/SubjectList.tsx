// src/pages/student/SubjectList.tsx
import { useFetch } from "../api/hooks";

export const routeConfig = {
  path: "/student/subjects",
  title: "Lista przedmiotów",
  roles: ["student"]
};

export default function SubjectList() {
  const { data, isLoading, error } = useFetch('subjects', 'lessons');
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}