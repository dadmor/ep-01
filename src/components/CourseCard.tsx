// src/components/CourseCard.tsx
import { Link } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle2, 
  Star, 
  Play, 
  Trophy, 
  Target,
  BookOpen,
  Calendar
} from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  subject?: string;
  topic?: string;
  grade?: string;
  isCompleted?: boolean;
  score?: number;
  completedAt?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: number; // in minutes
}

export function CourseCard({
  id,
  title,
  description,
  subject,
  topic,
  grade,
  isCompleted = false,
  score = 0,
  completedAt,
  difficulty = 'beginner',
  estimatedTime = 30
}: CourseCardProps) {
  const difficultyColors = {
    beginner: 'text-green-600 bg-green-50 border-green-200',
    intermediate: 'text-amber-600 bg-amber-50 border-amber-200',
    advanced: 'text-rose-600 bg-rose-50 border-rose-200'
  };

  const difficultyLabels = {
    beginner: 'Podstawowy',
    intermediate: 'Średni',
    advanced: 'Zaawansowany'
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-amber-600 bg-amber-50';
    if (score >= 50) return 'text-orange-600 bg-orange-50';
    return 'text-rose-600 bg-rose-50';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <Link to={`/student/lesson/${id}`} className="block group">
      <div className="relative bg-white rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300/60 transition-all duration-200 overflow-hidden h-full">
        {/* Header with status indicator */}
        <div className="relative">
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {title}
                </h3>
                {topic && (
                  <p className="text-sm text-gray-600 mt-1">{topic}</p>
                )}
              </div>
              
              {/* Status indicator */}
              <div className="ml-3">
                {isCompleted ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Play className="w-4 h-4 text-blue-600 ml-0.5" />
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {description}
            </p>

            {/* Metadata row */}
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
              {grade && (
                <div className="flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  <span>{grade}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{estimatedTime} min</span>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs border ${difficultyColors[difficulty]}`}>
                {difficultyLabels[difficulty]}
              </div>
            </div>
          </div>

          {/* Progress section */}
          {isCompleted ? (
            <div className="px-6 pb-6">
              <div className="bg-gray-50/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-gray-900">Ukończono</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                </div>
                
                {completedAt && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(completedAt)}</span>
                  </div>
                )}

                {/* Score bar */}
                <div className="mt-3 bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      score >= 90 ? 'bg-green-500' :
                      score >= 70 ? 'bg-amber-500' :
                      score >= 50 ? 'bg-orange-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="px-6 pb-6">
              <div className="bg-blue-50/30 rounded-lg p-3 border border-blue-200/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Gotowy do rozpoczęcia</span>
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    Rozpocznij →
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/5 group-hover:to-transparent transition-all duration-200 pointer-events-none opacity-0 group-hover:opacity-50" />
      </div>
    </Link>
  );
}