// src/pages/student/ui.Achievements.tsx
import { EmptyState, LoadingSpinner, PageHeader } from '@/components/ui_bloglike/base';
import { useFetch } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { useState, useMemo } from 'react';
import { CurrentStats } from './stats.CurrentStats';
import { FilterTabs } from './filters.FilterTabs';
import { BadgeGrid } from './grid.BadgeGrid';
import { AchievementsOverview } from './overview.AchievementsOverview';

export const routeConfig = { path: "/student/achievements", title: "Osiągnięcia" };

export default function StudentAchievements() {
  const { user } = useAuth();
  const { data: allBadges, isLoading: badgesLoading } = useFetch('all-badges', 'badges');
  const { data: userBadges, isLoading: userBadgesLoading } = useFetch('user-badges', 'user_badges');
  const { data: badgeCriteria, isLoading: criteriaLoading } = useFetch('badge-criteria', 'badge_criteria');
  const { data: progress, isLoading: progressLoading } = useFetch('student-progress', 'progress');

  const [filter, setFilter] = useState<'all' | 'earned' | 'available'>('all');
  const isLoading = badgesLoading || userBadgesLoading || criteriaLoading || progressLoading;

  const achievementStats = useMemo(() => {
    const earned = userBadges?.length || 0;
    const total = allBadges?.length || 0;
    const percentage = total > 0 ? Math.round((earned / total) * 100) : 0;
    const perfectScores = progress?.filter(p => p.score === 100).length || 0;
    const averageScore = progress?.length
      ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length)
      : 0;

    return {
      earned,
      total,
      percentage,
      perfectScores,
      averageScore,
      level: user?.level || 1,
      xp: user?.xp || 0,
      streak: user?.streak || 0,
    };
  }, [user, userBadges, allBadges, progress]);

  const processedBadges = useMemo(() => {
    if (!allBadges) return [];
    return allBadges.map(badge => {
      const ub = userBadges?.find(ub => ub.badge_id === badge.id);
      const cr = badgeCriteria?.find(bc => bc.badge_id === badge.id);
      let isEarned = !!ub;
      let isAvailable = false;
      let progressValue = 0;
      let progressText = '';

      if (cr && user && !isEarned) {
        let current = 0;
        switch (cr.criteria_type) {
          case 'level': current = user?.level ?? 0; progressText = `Poziom ${current}/${cr.criteria_value}`; break;
          case 'xp':    current = user?.xp ?? 0;    progressText = `${current}/${cr.criteria_value} XP`;   break;
          case 'streak':current = user?.streak ?? 0;progressText = `${current}/${cr.criteria_value} dni`; break;
        }
        progressValue = Math.min((current / cr.criteria_value) * 100, 100);
        isAvailable = current >= cr.criteria_value;
      }

      return { ...badge, isEarned, isAvailable, progress: progressValue, progressText, awardedAt: ub?.awarded_at };
    });
  }, [allBadges, userBadges, badgeCriteria, user]);

  const filteredBadges = useMemo(() => {
    if (filter === 'earned') return processedBadges.filter(b => b.isEarned);
    if (filter === 'available') return processedBadges.filter(b => !b.isEarned && b.isAvailable);
    return processedBadges;
  }, [processedBadges, filter]);

  if (isLoading) return <LoadingSpinner message="Ładowanie osiągnięć..." />;

  return (
    <div className="min-h-screen bg-gray-50/30">
      <PageHeader
        title="Twoje Osiągnięcia"
        subtitle="Zdobywaj odznaki i śledź swoje sukcesy w nauce"
        variant="achievements"
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <AchievementsOverview stats={achievementStats} />
        <CurrentStats stats={achievementStats} />
        <FilterTabs
          filter={filter}
          counts={{ all: processedBadges.length, earned: achievementStats.earned, available: processedBadges.filter(b => !b.isEarned && b.isAvailable).length }}
          setFilter={setFilter}
        />
        <BadgeGrid badges={filteredBadges} />

        {filteredBadges.length === 0 && (
          <div className="text-center py-12">
            <EmptyState
              icon={<></>}
              title={filter === 'earned' ? 'Nie zdobyłeś jeszcze żadnych odznak' : filter === 'available' ? 'Nie ma dostępnych odznak do odebrania' : 'Nie ma żadnych odznak w systemie'}
              description={filter !== 'all' ? 'Zobacz wszystkie' : 'Rozpocznij naukę'}
              actionLabel={filter !== 'all' ? 'Zobacz wszystkie' : 'Rozpocznij naukę'}
              onAction={() => filter !== 'all' ? setFilter('all') : window.location.href = '/student/courses'}
            />
          </div>
        )}
      </div>
    </div>
  );
}
