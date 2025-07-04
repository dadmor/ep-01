// hooks/useStudentData.tsx
import { useMemo } from 'react';
import { useFetch } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';

interface StudentData {
  lessons: Lesson[];
  progress: Progress[];
  userBadges: UserBadge[];
  allBadges: Badge[];
  badgeCriteria: BadgeCriteria[];
  stats: StudentStats;
  isLoading: boolean;
}

interface StudentStats {
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
  totalTasks: number;
  correctTasks: number;
  perfectScores: number;
  badgesEarned: number;
  accuracy: number;
  level: number;
  xp: number;
  streak: number;
  percentage: number;
  totalAttempts: number;
  averageAttempts: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  education_level: string;
  grade: string;
  topic: string;
  author_id: string;
}

interface Progress {
  id: string;
  lesson_id: string;
  score: number;
  total_tasks: number;
  correct_tasks: number;
  completed_at: string;
  attempts_count: number;
}

interface UserBadge {
  id: string;
  badge_id: string;
  awarded_at: string;
  badge: {
    name: string;
    description: string;
    icon_url?: string;
  };
}

interface Badge {
  id: string;
  name: string;
  description: string;
}

interface BadgeCriteria {
  id: string;
  badge_id: string;
  criteria_type: string;
  criteria_value: number;
}

const calculateStats = (
  lessons: Lesson[], 
  progress: Progress[], 
  userBadges: UserBadge[], 
  user: any
): StudentStats => {
  const totalLessons = lessons?.length || 0;
  const completedLessons = progress?.length || 0;
  const totalTasks = progress?.reduce((sum, p) => sum + p.total_tasks, 0) || 0;
  const correctTasks = progress?.reduce((sum, p) => sum + p.correct_tasks, 0) || 0;
  const totalAttempts = progress?.reduce((sum, p) => sum + p.attempts_count, 0) || 0;
  const averageScore = completedLessons ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / completedLessons) : 0;
  const perfectScores = progress?.filter(p => p.score === 100).length || 0;
  const badgesEarned = userBadges?.length || 0;
  const accuracy = totalTasks ? Math.round((correctTasks / totalTasks) * 100) : 0;
  const percentage = totalLessons > 0 ? Math.round((badgesEarned / totalLessons) * 100) : 0;
  const averageAttempts = completedLessons ? (totalAttempts / completedLessons).toFixed(1) : '0';

  return {
    totalLessons,
    completedLessons,
    averageScore,
    totalTasks,
    correctTasks,
    perfectScores,
    badgesEarned,
    accuracy,
    level: user?.level || 1,
    xp: user?.xp || 0,
    streak: user?.streak || 0,
    percentage,
    totalAttempts,
    averageAttempts,
  };
};

export const useStudentData = (): StudentData => {
  const { user } = useAuth();
  
  const { data: lessons, isLoading: lessonsLoading } = useFetch<Lesson>('lessons', 'lessons');
  const { data: progress, isLoading: progressLoading } = useFetch<Progress>('student-progress', 'progress');
  const { data: userBadges, isLoading: userBadgesLoading } = useFetch<UserBadge>('user-badges', 'user_badges');
  const { data: allBadges, isLoading: allBadgesLoading } = useFetch<Badge>('all-badges', 'badges');
  const { data: badgeCriteria, isLoading: criteriaLoading } = useFetch<BadgeCriteria>('badge-criteria', 'badge_criteria');

  const isLoading = lessonsLoading || progressLoading || userBadgesLoading || allBadgesLoading || criteriaLoading;

  const processedData = useMemo(() => {
    const lessonsData = lessons || [];
    const progressData = progress || [];
    const userBadgesData = userBadges || [];
    const allBadgesData = allBadges || [];
    const badgeCriteriaData = badgeCriteria || [];

    return {
      lessons: lessonsData,
      progress: progressData,
      userBadges: userBadgesData,
      allBadges: allBadgesData,
      badgeCriteria: badgeCriteriaData,
      stats: calculateStats(lessonsData, progressData, userBadgesData, user),
      isLoading,
    };
  }, [lessons, progress, userBadges, allBadges, badgeCriteria, user, isLoading]);

  return processedData;
};