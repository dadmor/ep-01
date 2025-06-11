// src/components/ui_bloglike/base/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Ładowanie..." }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-3xl shadow-xl border-2 border-blue-200">
        <div className="relative">
          <span className="loading loading-spinner loading-lg text-blue-500"></span>
          <div className="absolute inset-0 loading loading-spinner loading-lg text-purple-300 animate-pulse"></div>
        </div>
        <p className="text-gray-700 font-semibold text-lg">{message}</p>
      </div>
    </div>
  );
}