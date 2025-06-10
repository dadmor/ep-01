// src/components/ui/LoadingSpinner.tsx
interface LoadingSpinnerProps {
    message?: string;
  }
  
  export function LoadingSpinner({ message = "Ładowanie..." }: LoadingSpinnerProps) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-slate-600"></span>
          <p className="text-slate-500 font-medium">{message}</p>
        </div>
      </div>
    );
  }