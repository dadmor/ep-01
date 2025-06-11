// src/components/student/CurrentStats.tsx
import { StatCard } from '@/components/ui_bloglike/base';
import { Target, Zap, Flame } from 'lucide-react';

interface CurrentStatsProps {
  stats: { level: number; xp: number; streak: number; };
}

export function CurrentStats({ stats }: CurrentStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Aktualny poziom"
        value={stats.level}
        icon={<Target className="w-5 h-5" />}
        color="blue"
      />
      <StatCard
        title="Punkty doświadczenia"
        value={stats.xp}
        icon={<Zap className="w-5 h-5" />}
        color="amber"
      />
      <StatCard
        title="Seria dni"
        value={stats.streak}
        icon={<Flame className="w-5 h-5" />}
        color="rose"
      />
    </div>
  );
}