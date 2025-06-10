// src/components/ui/CourseCard.tsx
import { Link } from "react-router-dom";
import { Card } from "./ui_bloglike/base";

interface CourseCardProps {
  id: string;
  title: string;
  description?: string;
}

export function CourseCard({ id, title, description }: CourseCardProps) {
  return (
    <Card hover className="overflow-hidden">
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 bg-info/10 rounded-xl flex items-center justify-center shadow-sm">
            <svg
              className="w-7 h-7 text-info"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="px-3 py-1 bg-base-300/50 text-base-content/70 text-xs font-medium rounded-full">
            Kurs
          </div>
        </div>

        <h3 className="text-xl font-semibold text-base-content mb-3 font-serif tracking-tight leading-tight">
          {title}
        </h3>
        <p className="text-base-content/70 text-sm mb-8 leading-relaxed">
          {description ||
            "Odkryj fascynujące treści tego kursu i rozwijaj swoje umiejętności."}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-base-content/50 font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>~30 min</span>
          </div>

          <Link
            to={`/student/lesson/${id}`}
            className="btn btn-primary btn-sm gap-2 shadow-sm hover:shadow-md"
          >
            Rozpocznij
          </Link>
        </div>
      </div>
    </Card>
  );
}