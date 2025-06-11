// src/pages/teacher/ui.Students.tsx
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { useFetch } from "@/pages/api/hooks";
import { TeacherMenu } from "./menu.TeacherMenu";
import { TeacherPageLayout } from "@/components/layout/TeacherPageLayout";

export const routeConfig = {
  path: "/teacher/students",
  title: "Students List",
};

export default function TeacherStudents() {
  const { data: students, isLoading } = useFetch(
    "students",
    "users?role=eq.student"
  );

  if (isLoading)
    return <div className="loading loading-spinner loading-lg"></div>;

  return (
    <TeacherPageLayout showPadding={true} title="Uczniowie" subtitle="Lista uczniów">
      <h1 className="text-3xl font-bold mb-6">👥 Lista uczniów</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Uczeń</th>
              <th>Email</th>
              <th>Poziom</th>
              <th>XP</th>
              <th>Seria</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student) => (
              <tr key={student.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-8">
                        <span className="text-xs">
                          {student.username?.[0] || "U"}
                        </span>
                      </div>
                    </div>
                    <span>{student.username || "Brak nazwy"}</span>
                  </div>
                </td>
                <td>{student.email}</td>
                <td>
                  <div className="badge badge-primary">{student.level}</div>
                </td>
                <td>{student.xp}</td>
                <td>
                  <div className="badge badge-secondary">{student.streak}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TeacherPageLayout>
  );
}
