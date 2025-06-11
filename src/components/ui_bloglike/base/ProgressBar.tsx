// src/components/ui_bloglike/base/ProgressBar.tsx
interface ProgressBarProps {
    percentage: number;
  }
  
  export function ProgressBar({ percentage }: ProgressBarProps) {
    return (
      <div className="bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }