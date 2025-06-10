// src/components/ui/StatCard.tsx
import { ReactNode } from 'react';
import { Card } from '.';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBg: string;
}

export function StatCard({ title, value, icon, iconBg }: StatCardProps) {
  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">{title}</p>
          <p className="text-3xl font-bold text-slate-900 font-serif tracking-tight">{value}</p>
        </div>
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center shadow-sm`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}