// pages/Lesson.tsx - obsługa single-choice, multi-choice i text
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, BookOpen } from "lucide-react";
import { useFetch } from "@/pages/api/hooks";
import { StudentPageLayout } from "@/components/layout/StudentPageLayout";

interface Article {
  id: string;
  title: string;
  content: string;
}

type TaskType = 'single-choice' | 'multi-choice' | 'text';

interface Task {
  id: string;
  type: TaskType;
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
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  const currentTask = tasks?.[currentIndex];
  const allAnswered = tasks && tasks.every(task => selectedAnswers[task.id] !== undefined);

  const handleAnswerChange = (taskId: string, value: string | string[]) => {
    setSelectedAnswers(prev => ({ ...prev, [taskId]: value }));
  };

  const toggleMultiAnswer = (taskId: string, option: string) => {
    const current = selectedAnswers[taskId] as string[] || [];
    if (current.includes(option)) {
      handleAnswerChange(taskId, current.filter(o => o !== option));
    } else {
      handleAnswerChange(taskId, [...current, option]);
    }
  };

  const renderTask = () => {
    if (!currentTask) return null;
    const value = selectedAnswers[currentTask.id];

    switch (currentTask.type) {
      case 'text':
        return (
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Wpisz odpowiedź..."
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => handleAnswerChange(currentTask.id, e.target.value)}
            disabled={showResults}
          />
        );

      case 'multi-choice':
        return currentTask.options?.map((option, idx) => {
          const inputId = `task-${currentTask.id}-option-${idx}`;
          const checked = Array.isArray(value) && value.includes(option);
          return (
            <div key={idx}>
              <input
                id={inputId}
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={() => toggleMultiAnswer(currentTask.id, option)}
                disabled={showResults}
              />
              <label htmlFor={inputId} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${checked ? 'bg-blue-50/50 border-blue-200/60 shadow-sm' : 'bg-gray-50/30 border-gray-200/40 hover:bg-gray-50/60 hover:border-gray-300/60'}`}>
                <div className={`w-5 h-5 rounded border-2 ${checked ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                  {checked && <div className="w-full h-full bg-base-100 scale-[0.4] rounded" />}
                </div>
                <span className="flex-1 text-gray-700">{option}</span>
              </label>
            </div>
          );
        });

      case 'single-choice':
      default:
        return currentTask.options?.map((option, idx) => {
          const inputId = `task-${currentTask.id}-option-${idx}`;
          const checked = value === option;
          return (
            <div key={idx}>
              <input
                id={inputId}
                type="radio"
                name={`task-${currentTask.id}`}
                value={option}
                className="sr-only"
                onChange={() => handleAnswerChange(currentTask.id, option)}
                checked={checked}
                disabled={showResults}
              />
              <label htmlFor={inputId} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border ${checked ? 'bg-blue-50/50 border-blue-200/60 shadow-sm' : 'bg-gray-50/30 border-gray-200/40 hover:bg-gray-50/60 hover:border-gray-300/60'}`}>
                <div className={`w-5 h-5 rounded-full border-2 ${checked ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                  {checked && <div className="w-full h-full rounded-full bg-base-100 scale-[0.4]" />}
                </div>
                <span className="flex-1 text-gray-700">{option}</span>
              </label>
            </div>
          );
        });
    }
  };

  const LessonHeader = () => (
    <div className="bg-gradient-to-b from-purple-50/40 to-white border-b border-gray-200/40 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => window.history.back()}
            className="w-10 h-10 bg-base-100 rounded-xl border border-gray-200/60 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
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
  );

  const LessonContent = () => (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm">
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          <div className="space-y-8">
            {articles?.map((article) => (
              <div key={article.id} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
                <div className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            ))}

            {currentTask && !showResults && (
              <div key={currentTask.id} className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {tasks.length > 1 && (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mr-3">
                      {currentIndex + 1}
                    </span>
                  )}
                  {currentTask.question_text}
                </h3>

                {renderTask()}

                <div className="pt-6">
                  {selectedAnswers[currentTask.id] && (
                    currentIndex < tasks.length - 1 ? (
                      <button onClick={() => setCurrentIndex(i => i + 1)} className="btn btn-primary">Dalej</button>
                    ) : (
                      <button onClick={() => setShowResults(true)} className="btn btn-success">Sprawdź odpowiedzi</button>
                    )
                  )}
                </div>
              </div>
            )}

            {showResults && (
              <div className="text-center space-y-3">
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
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/30">
      <LessonHeader />
      {isLoading ? (
        <StudentPageLayout title="" subtitle="" isLoading={true} showPadding={false}>
          <></>
        </StudentPageLayout>
      ) : (
        <LessonContent />
      )}
    </div>
  );
}