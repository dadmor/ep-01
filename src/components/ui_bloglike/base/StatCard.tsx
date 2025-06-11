// src/components/ui_bloglike/base/StatCard.tsx
import { ReactNode } from 'react';
import { Card } from './Card';
import { colorPalette } from '../colors';


interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'yellow';
}

export function StatCard({ title, value, icon, color = 'blue' }: StatCardProps) {
  const style = colorPalette[color];

  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-2 tracking-wide">
            {title}
          </p>
          <p className={`text-2xl font-bold ${style.text} tracking-tight`}>
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center border border-gray-200/40`}>
          <div className={style.text}>
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
}
