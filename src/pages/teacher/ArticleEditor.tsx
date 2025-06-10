// src/pages/teacher/ArticleEditor.tsx
import React from 'react';
import { useInsert } from "../api/hooks";

export const routeConfig = {
  path: "/teacher/lessons/:lessonId/articles/:articleId?",
  title: "Edytor artykułu",
  roles: ["teacher"]
};

const mockArticle = { lesson_id: '', title: 'Tytuł', content: 'Treść' };

export default function ArticleEditor() {
  const mutation = useInsert('article', 'articles');

  return (
    <div>
      <button onClick={() => mutation.mutate(mockArticle)}>
        Wyślij dane testowe
      </button>
      {mutation.isPending && <p>Ładowanie...</p>}
      {mutation.error && <p>Błąd: {mutation.error.message}</p>}
      {mutation.data && <pre>{JSON.stringify(mutation.data, null, 2)}</pre>}
    </div>
  );
}
