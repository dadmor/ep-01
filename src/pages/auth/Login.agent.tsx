// src/pages/auth/Login.agent.tsx

import { useLogin } from "./hooks/useLogin";


export const routeConfig = {
  path: "/auth/login",
  title: "Login"
};

export default function LoginAgent() {
  const { loginWithTestData, isLoading, error, data } = useLogin();

  return (
    <div>
      <h2>Login Agent Mode</h2>
      <button onClick={loginWithTestData}>
        Wyślij dane testowe
      </button>
      {isLoading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}