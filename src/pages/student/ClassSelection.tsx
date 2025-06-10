// src/pages/student/ClassSelection.tsx
import { useFetch } from "../api/hooks";

export const routeConfig = {
  path: "/student/classes",
  title: "Wybór klasy",
  roles: ["student"]
};

export default function ClassSelection() {
  const { data, isLoading, error } = useFetch("classes", "classes");
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}