
// src/pages/student/ovrerview.AchievementsOverview.tsx
import { OverviewCard } from '@/components/ui_bloglike/base/OverviewCard';
import { ProgressBar } from '@/components/ui_bloglike/base/ProgressBar';
import { Trophy, Target, Star, TrendingUp } from 'lucide-react';

interface AchievementsOverviewProps {
  stats: {
    earned: number;
    total: number;
    percentage: number;
    perfectScores: number;
    averageScore: number;
  };
}

export function AchievementsOverview({ stats }: AchievementsOverviewProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200/60 p-8 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard
          icon={<Trophy className="w-8 h-8 text-purple-600" />}
          value={stats.earned}
          label="Zdobyte odznaki"
          subLabel={`z ${stats.total} dostępnych`}
          color="purple"
        />
        <OverviewCard
          icon={<Target className="w-8 h-8 text-amber-600" />}
          value={`${stats.percentage}%`}
          label="Ukończone"
          color="amber"
        />
        <OverviewCard
          icon={<Star className="w-8 h-8 text-green-600" />}
          value={stats.perfectScores}
          label="Perfekcyjne wyniki"
          subLabel="100% poprawnych"
          color="green"
        />
        <OverviewCard
          icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
          value={`${stats.averageScore}%`}
          label="Średnia ocena"
          subLabel="ze wszystkich lekcji"
          color="blue"
        />
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Postęp osiągnięć</span>
          <span className="text-sm text-gray-600">{stats.earned} / {stats.total}</span>
        </div>
        <ProgressBar percentage={stats.percentage} />
      </div>
    </div>
  );
}