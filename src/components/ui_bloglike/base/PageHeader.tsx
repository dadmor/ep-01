// src/components/ui_bloglike/base/PageHeader.tsx
interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/40">
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold text-slate-900 mb-3 tracking-tight font-serif">
            {title}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}