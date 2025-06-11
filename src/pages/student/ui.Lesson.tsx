
// src/pages/student/ui.Lesson.tsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui_shdn/basic";
import { useFetch } from "@/pages/api/hooks";
import { ArrowLeft, CheckCircle, BookOpen } from "lucide-react";

interface Article {
  id: string;
  title: string;
  content: string;
}

interface Task {
  id: string;
  question_text: string;
  options?: string[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
}

export const routeConfig = { path: "/student/lesson/:id", title: "Lesson" };

export default function StudentLesson() {
  const { id } = useParams<{ id: string }>();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const { data: lesson, isLoading: lessonLoading } = useFetch<Lesson>(
    `lesson-${id}`,
    `lessons?id=eq.${id}`
  );
  const { data: articles, isLoading: articlesLoading } = useFetch<Article>(
    `lesson-${id}-articles`,
    `articles?lesson_id=eq.${id}`
  );
  const { data: tasks, isLoading: tasksLoading } = useFetch<Task>(
    `lesson-${id}-tasks`,
    `tasks?lesson_id=eq.${id}`
  );

  const isLoading = lessonLoading || articlesLoading || tasksLoading;
  const currentLesson = lesson?.[0];

  if (isLoading) {
    return <LoadingSpinner message="Ładowanie lekcji..." />;
  }

  const handleAnswerChange = (taskId: string, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [taskId]: answer }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-50/40 to-white border-b border-gray-200/40">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => window.history.back()}
              className="w-10 h-10 bg-white rounded-xl border border-gray-200/60 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Lekcja</span>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {currentLesson?.title}
              </h1>
              {currentLesson?.description && (
                <p className="text-gray-600 mt-1">{currentLesson.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm">
          <div className="p-8 max-h-[70vh] overflow-y-auto">
            <div className="space-y-8">
              {/* Articles */}
              {articles?.map((article) => (
                <div key={article.id} className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {article.title}
                  </h2>
                  <div
                    className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              ))}

              {/* Divider */}
              {articles && articles.length > 0 && (tasks ?? []).length > 0 && (
                <div className="flex items-center gap-4 py-6">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-sm font-medium text-gray-500 px-4">ZADANIA</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
              )}

              {/* Tasks */}
              {tasks?.map((task, idx) => (
                <div key={task.id} className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {tasks.length > 1 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mr-3">
                        {idx + 1}
                      </span>
                    )}
                    {task.question_text}
                  </h3>

                  {task.options && (
                    <div className="space-y-3">
                      {task.options.map((option, optIdx) => (
                        <label
                          key={optIdx}
                          className={`
                            flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border
                            ${selectedAnswers[task.id] === option
                              ? 'bg-blue-50/50 border-blue-200/60 shadow-sm'
                              : 'bg-gray-50/30 border-gray-200/40 hover:bg-gray-50/60 hover:border-gray-300/60'
                            }
                            ${showResults ? 'cursor-default' : ''}
                          `}
                        >
                          <div className="relative">
                            <input
                              type="radio"
                              name={`task-${task.id}`}
                              value={option}
                              className="sr-only"
                              onChange={() => handleAnswerChange(task.id, option)}
                              disabled={showResults}
                            />
                            <div className={`
                              w-5 h-5 rounded-full border-2 transition-colors
                              ${selectedAnswers[task.id] === option
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                              }
                            `}>
                              {selectedAnswers[task.id] === option && (
                                <div className="w-full h-full rounded-full bg-white scale-[0.4]"></div>
                              )}
                            </div>
                          </div>
                          <span className="flex-1 text-gray-700">{option}</span>
                          {showResults && selectedAnswers[task.id] === option && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          {(tasks?.length ?? 0) > 0 && (
            <div className="p-6 border-t border-gray-200/40 bg-gray-50/30">
              <div className="text-center">
                {!showResults ? (
                  <button
                    className={`
                      px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm
                      ${Object.keys(selectedAnswers).length === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md'
                      }
                    `}
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length === 0}
                  >
                    Sprawdź odpowiedzi
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold text-lg">Świetnie!</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Odpowiedziałeś na {Object.keys(selectedAnswers).length} z {tasks?.length} pytań
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}