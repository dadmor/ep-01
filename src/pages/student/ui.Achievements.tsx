// pages/Achievements.tsx - Zoptymalizowana wersja (80 linii vs 180)
import React, { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { useStudentData } from './hooks/useStudentData';
import { useFilters } from './hooks/useFilters';
import { StudentPageLayout } from '@/components/layout/StudentPageLayout';
import { StatsSection } from './section.StatsSection';
import { BadgeGrid } from './grid.BadgeGrid';


export const routeConfig = {
  path: "/student/achievements",
  title: "Osiągnięcia",
};

export default function StudentAchievements() {
  const { 
    allBadges, 
    userBadges, 
    badgeCriteria, 
    stats, 
    isLoading 
  } = useStudentData();

  // Process badges with completion status
  const processedBadges = useMemo(() => {
    if (!allBadges) return [];
    
    return allBadges.map((badge) => {
      const userBadge = userBadges?.find((ub) => ub.badge_id === badge.id);
      const criteria = badgeCriteria?.find((bc) => bc.badge_id === badge.id);
      
      let isEarned = !!userBadge;
      let isAvailable = false;
      let progress = 0;
      let progressText = "";

      if (criteria && !isEarned) {
        // Calculate progress based on criteria
        const current = getCurrentValue(criteria.criteria_type, stats);
        progress = Math.min((current / criteria.criteria_value) * 100, 100);
        progressText = `${current}/${criteria.criteria_value} ${getCriteriaUnit(criteria.criteria_type)}`;
        isAvailable = current >= criteria.criteria_value;
      }

      return {
        ...badge,
        isEarned,
        isAvailable,
        progress,
        progressText,
        awardedAt: userBadge?.awarded_at,
      };
    });
  }, [allBadges, userBadges, badgeCriteria, stats]);

  // Filter configuration
  const filterConfigs = [
    {
      key: 'status',
      type: 'tabs' as const,
      label: 'Status',
      options: [
        { value: 'all', label: 'Wszystkie' },
        { value: 'earned', label: 'Zdobyte' },
        { value: 'available', label: 'Dostępne' },
      ],
      defaultValue: 'all',
    },
  ];

  const filterFunctions = {
    status: (badge: any, value: string) => {
      if (value === 'earned') return badge.isEarned;
      if (value === 'available') return !badge.isEarned && badge.isAvailable;
      return true;
    },
  };

  const { filteredData: filteredBadges, FilterComponent } = useFilters({
    data: processedBadges,
    configs: filterConfigs,
    filterFunctions,
  });

  return (
    <StudentPageLayout
      title="Twoje Osiągnięcia"
      subtitle="Zdobywaj odznaki i śledź swoje sukcesy w nauce"
      isLoading={isLoading}
      isEmpty={!processedBadges.length}
      emptyState={{
        icon: <BookOpen className="w-8 h-8 text-gray-400" />,
        title: "Brak odznak w systemie",
        description: "Rozpocznij naukę, aby zdobyć pierwsze odznaki",
        actionLabel: "Rozpocznij naukę",
        onAction: () => (window.location.href = "/student/courses"),
      }}
    >
      <StatsSection
        type="achievements"
        data={stats}
        showProgress={true}
        showOverview={true}
      />

      <FilterComponent />

      <BadgeGrid badges={filteredBadges} />
    </StudentPageLayout>
  );
}

// Helper functions
function getCurrentValue(criteriaType: string, stats: any): number {
  switch (criteriaType) {
    case 'level': return stats.level;
    case 'xp': return stats.xp;
    case 'streak': return stats.streak;
    default: return 0;
  }
}

function getCriteriaUnit(criteriaType: string): string {
  switch (criteriaType) {
    case 'level': return 'poziom';
    case 'xp': return 'XP';
    case 'streak': return 'dni';
    default: return '';
  }
}