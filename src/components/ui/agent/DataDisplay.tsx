// src/components/ui/agents/DataDisplay.tsx

interface DataDisplayProps {
  data: any;
  title?: string;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

export const DataDisplay = ({
  data,
  title = "📋 Dane",
  isCollapsible = true,
  defaultExpanded = true,
  size = "xs",
}: DataDisplayProps) => {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  if (!isCollapsible) {
    return (
      <div className="mockup-code">
        <pre>
          <code className={sizeClasses[size]}>
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      </div>
    );
  }

  return (
    <div className="collapse collapse-arrow bg-base-200">
      <input type="checkbox" defaultChecked={defaultExpanded} />
      <div className="collapse-title text-sm font-medium">{title}</div>
      <div className="collapse-content">
        <div className="mockup-code">
          <pre>
            <code className={sizeClasses[size]}>
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
