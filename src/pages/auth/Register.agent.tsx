// src/pages/auth/Register.agent.tsx
import React from 'react';
import { useInsert } from '../api/hooks';

export const routeConfig = {
  path: "/auth/register",
  title: "Register"
};

const mockRegister = {
  email: 'new@example.com',
  username: 'newuser',
  password: 'password123'
};

export default function RegisterAgent() {
  const mutation = useInsert('register', 'users');

  return (
    <div>
      <h2>Rejestracja – tryb agenta</h2>
      <button onClick={() => mutation.mutate(mockRegister)}>
        Wyślij dane testowe
      </button>
      {mutation.isPending && <p>Ładowanie…</p>}
      {mutation.error && <p>Błąd: {mutation.error.message}</p>}
      {mutation.data && <pre>{JSON.stringify(mutation.data, null, 2)}</pre>}
    </div>
  );
}
