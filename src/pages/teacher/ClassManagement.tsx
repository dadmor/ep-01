// src/pages/teacher/ClassManagement.tsx
import { useFetch } from "../api/hooks";

export const routeConfig = {
  path: "/teacher/classes",
  title: "Zarządzanie klasami",
  roles: ["teacher"]
};

export default function ClassManagement() {
  const { data, isLoading, error } = useFetch("classes", "classes");
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
