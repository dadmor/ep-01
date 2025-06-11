// src/pages/teacher/ui.ArticleDetail.tsx
import { SidebarLayout } from "@/components/layout/SidebarLayout";
import { useFetch } from "@/pages/api/hooks";
import { useParams, Link } from "react-router-dom";
import { TeacherMenu } from "./menu.TeacherMenu";

export const routeConfig = {
  path: "/teacher/lessons/:lessonId/articles/:articleId",
  title: "Article Detail",
};

export default function ArticleDetail() {
  const { lessonId, articleId } = useParams();

  const { data: articles } = useFetch(
    "article-detail",
    `articles?id=eq.${articleId}`
  );
  const { data: lesson } = useFetch(
    "lesson-detail-for-article",
    `lessons?id=eq.${lessonId}`
  );

  const articleData = articles?.[0];
  const lessonData = lesson?.[0];

  if (!articleData) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <SidebarLayout menuComponent={<TeacherMenu userRole="teacher" />}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body py-3">
            <div className="breadcrumbs text-sm">
              <ul>
                <li>
                  <Link to="/teacher/lessons">Lekcje</Link>
                </li>
                <li>
                  <Link to={`/teacher/lessons/${lessonId}`}>
                    {lessonData?.title || "Lekcja"}
                  </Link>
                </li>
                <li>Artykuł</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Article Header Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{articleData.title}</h1>
                <div className="flex gap-2 items-center">
                  <span className="badge badge-outline">
                    Kolejność: {articleData.sort_order}
                  </span>
                  <span className="text-sm text-base-content/60">
                    ID: {articleId}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/teacher/lessons/${lessonId}/articles/${articleId}/edit`}
                  className="btn btn-primary btn-sm"
                >
                  ✏️ Edytuj
                </Link>
              </div>
            </div>

            {lessonData && (
              <div className="alert alert-info">
                <div className="flex items-center gap-2">
                  <span className="text-info">📚</span>
                  <div>
                    <div className="font-medium">
                      Lekcja: {lessonData.title}
                    </div>
                    <div className="text-sm opacity-70">
                      {lessonData.subject} • {lessonData.grade}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Article Content Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4">
              <span className="text-primary">📄</span>
              Treść artykułu
            </h2>

            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-base leading-relaxed">
                {articleData.content}
              </div>
            </div>

            <div className="divider"></div>

            <div className="text-sm text-base-content/60">
              Liczba znaków: {articleData.content?.length || 0}
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4">
              <span className="text-primary">⚡</span>
              Szybkie akcje
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/teacher/lessons/${lessonId}/articles/${articleId}/edit`}
                className="btn btn-outline"
              >
                ✏️ Edytuj artykuł
              </Link>
              <Link
                to={`/teacher/lessons/${lessonId}`}
                className="btn btn-ghost"
              >
                ← Powrót do lekcji
              </Link>
              <Link
                to={`/teacher/lessons/${lessonId}/articles/create`}
                className="btn btn-primary"
              >
                ➕ Dodaj kolejny artykuł
              </Link>
              <Link
                to={`/student/lessons/${lessonId}/articles/${articleId}`}
                className="btn btn-info"
              >
                👁️ Podgląd ucznia
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
