// src/pages/teacher/LessonEditor.tsx
import { useInsert } from "../api/hooks";

export const routeConfig = [
  { path: "/teacher/lessons/create", title: "Nowa lekcja", roles: ["teacher"] },
  { path: "/teacher/lessons/:lessonId/edit", title: "Edytuj lekcję", roles: ["teacher"] }
];

const mockLesson = { title: 'Nowa lekcja', description: 'Opis', author_id: '' };

export default function LessonEditor() {
  const mutation = useInsert('lesson', 'lessons');
  return (
    <div>
      <button onClick={() => mutation.mutate(mockLesson)}>
        Wyślij dane testowe
      </button>
      {mutation.isPending && <p>Ładowanie...</p>}
      {mutation.error && <p>Błąd: {mutation.error.message}</p>}
      {mutation.data && <pre>{JSON.stringify(mutation.data, null, 2)}</pre>}
    </div>
  );
}