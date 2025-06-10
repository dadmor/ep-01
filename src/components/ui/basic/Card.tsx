// Card Component
interface CardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
    return (
      <div className={`bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
        {children}
      </div>
    );
  };
  