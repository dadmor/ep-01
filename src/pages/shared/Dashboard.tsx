// src/pages/shared/Dashboard.tsx
import { useFetch } from '../api/hooks';

export const routeConfig = {
  path: "/dashboard",
  title: "Dashboard"
};

export default function Dashboard() {
  const { data, isLoading, error } = useFetch('users', 'users');
  return (
    <div>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
