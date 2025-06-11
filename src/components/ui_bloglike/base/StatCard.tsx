// src/components/ui_bloglike/base/StatCard.tsx
import { ReactNode } from 'react';
import { Card } from './Card';
import { colorPalette } from '../colors';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface TrendProps {
  value: string;
  direction: 'up' | 'down' | 'stable';
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'amber' | 'rose' | 'yellow';
  trend?: TrendProps;
}

export function StatCard({ title, value, icon, color = 'blue', trend }: StatCardProps) {
  const style = colorPalette[color];

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <ArrowUp className="w-3 h-3" />;
      case 'down':
        return <ArrowDown className="w-3 h-3" />;
      case 'stable':
        return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return 'text-green-600 bg-green-50';
      case 'down':
        return 'text-rose-600 bg-rose-50';
      case 'stable':
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card hover className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-500 tracking-wide">
              {title}
            </p>
            {trend && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getTrendColor(trend.direction)}`}>
                {getTrendIcon(trend.direction)}
                <span>{trend.value}</span>
              </div>
            )}
          </div>
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