// src/pages/admin/BadgeManagement.tsx
import { useFetch, useInsert } from "../api/hooks";

export const routeConfig = [
  { path: "/admin/badges", title: "Zarządzanie odznakami", roles: ["admin"] },
  { path: "/teacher/badges", title: "Zarządzanie odznakami", roles: ["teacher"] }
];

const mockBadge = { 
  name: 'Pierwsza odznaka', 
  description: 'Opis odznaki', 
  icon_url: 'https://example.com/icon.png' 
};

export default function BadgeManagement() {
  const { data, isLoading, error } = useFetch("badges", "badges");
  const mutation = useInsert('badges', 'badges');
  
  return (
    <div>
      <button onClick={() => mutation.mutate(mockBadge)}>
        Dodaj testową odznakę
      </button>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {mutation.isPending && <p>Dodawanie...</p>}
      {mutation.error && <p>Błąd dodawania: {mutation.error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}