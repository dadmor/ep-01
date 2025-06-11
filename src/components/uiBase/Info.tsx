// src/components/uiBase/Info.tsx
interface InfoProps {
  title: string;
  subtitle: string;
  size?: "sm" | "md";
  className?: string;
}

export function Info({
  title,
  subtitle,
  size = "md",
  className = "",
}: InfoProps) {
  const sizeClasses = {
    sm: {
      title: "scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl ",
      subtitle: "text-sm text-muted-foreground sm:text-base mt-1",
    },
    md: {
      title: "scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl",
      subtitle: "text-lg text-muted-foreground sm:text-xl mt-2",
    },
  };

  return (
    <div className={`${className}`}>
      <h1 className={sizeClasses[size].title}>{title}</h1>
      <p className={sizeClasses[size].subtitle}>{subtitle}</p>
    </div>
  );
}
