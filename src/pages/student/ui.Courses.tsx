// src/pages/student/ui.Courses.tsx
import { useFetch } from '@/pages/api/hooks';
import { Link } from 'react-router-dom';

export const routeConfig = { path: "/student/courses", title: "Courses" };

export default function StudentCourses() {
  const { data: lessons, isLoading } = useFetch('lessons', 'lessons');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-slate-600"></span>
          <p className="text-slate-500 font-medium">Ładowanie kursów...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Clean header */}
      <div className="bg-white border-b border-slate-200/60 shadow-sm">
        <div className="container mx-auto px-8 py-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-slate-900 mb-4 tracking-tight font-serif">
              Twoje Kursy
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-medium">
              Rozwijaj swoje umiejętności dzięki starannie przygotowanym kursom
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-16">
        {!lessons?.length ? (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3 font-serif tracking-tight">
              Brak dostępnych kursów
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Obecnie nie ma żadnych kursów do wyświetlenia
            </p>
            <button 
              className="btn btn-primary shadow-sm hover:shadow-md transition-shadow"
              onClick={() => window.location.reload()}
            >
              Odśwież stronę
            </button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">Dostępne kursy</p>
                    <p className="text-3xl font-bold text-slate-900 font-serif tracking-tight">{lessons.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">W trakcie</p>
                    <p className="text-3xl font-bold text-slate-900 font-serif tracking-tight">0</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">Ukończone</p>
                    <p className="text-3xl font-bold text-slate-900 font-serif tracking-tight">0</p>
                  </div>
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">Godziny nauki</p>
                    <p className="text-3xl font-bold text-slate-900 font-serif tracking-tight">0h</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Course grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lessons.map((lesson) => (
                <div key={lesson.id} className="bg-white border border-slate-200/60 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-200 shadow-sm">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm">
                        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">Kurs</div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 mb-3 font-serif tracking-tight leading-tight">
                      {lesson.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                      {lesson.description || "Odkryj fascynujące treści tego kursu i rozwijaj swoje umiejętności."}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>~30 min</span>
                      </div>
                      
                      <Link 
                        to={`/student/lesson/${lesson.id}`}
                        className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm hover:shadow-md"
                      >
                        Rozpocznij
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Help section */}
            <div className="mt-20">
              <div className="bg-white border border-slate-200/60 rounded-xl p-8 max-w-2xl mx-auto text-center shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 font-serif tracking-tight">
                  Potrzebujesz pomocy?
                </h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Skontaktuj się z nami, jeśli masz pytania dotyczące kursów
                </p>
                <button className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                  Skontaktuj się
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}