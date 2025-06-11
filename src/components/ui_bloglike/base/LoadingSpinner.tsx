// src/components/ui_bloglike/base/LoadingSpinner.tsx
interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Ładowanie..." }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/30">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 font-medium text-sm">{message}</p>
      </div>
    </div>
  );
}