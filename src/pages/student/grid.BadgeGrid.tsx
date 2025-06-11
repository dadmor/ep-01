// src/components/student/BadgeGrid.tsx
import { ProgressBar } from '@/components/ui_bloglike/base/ProgressBar';
import { Lock, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { badgeIcons } from './icons.badgeIcons';


interface BadgeItem {
  id: string;
  name: string;
  description: string;
  isEarned: boolean;
  isAvailable: boolean;
  progress: number;
  progressText: string;
  awardedAt?: string;
}

export function BadgeGrid({ badges }: { badges: BadgeItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {badges.map(badge => {
        const Icon = badgeIcons[badge.name] || badgeIcons.default;
        return (
          <div
            key={badge.id}
            className={`bg-white rounded-xl border shadow-sm p-6 transition-all duration-200 ${
              badge.isEarned
                ? 'border-green-200/60 hover:shadow-md'
                : badge.isAvailable
                ? 'border-amber-200/60 hover:shadow-md'
                : 'border-gray-200/60 opacity-75'
            }`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                badge.isEarned
                  ? 'bg-green-100 border-2 border-green-200'
                  : badge.isAvailable
                  ? 'bg-amber-100 border-2 border-amber-200'
                  : 'bg-gray-100 border-2 border-gray-200'
              }`}>
                {badge.isEarned ? (
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                ) : badge.isAvailable ? (
                  <Icon className="w-8 h-8 text-amber-600" />
                ) : (
                  <Lock className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className={`font-semibold mb-2 ${
                badge.isEarned ? 'text-green-900' :
                badge.isAvailable ? 'text-amber-900' : 'text-gray-500'
              }`}
              >
                {badge.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
              {badge.isEarned ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Zdobyta!</span>
                  </div>
                  {badge.awardedAt && (
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(badge.awardedAt).toLocaleDateString('pl-PL')}</span>
                    </div>
                  )}
                </div>
              ) : badge.isAvailable ? (
                <div className="text-amber-600">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Gotowa do odebrania!</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">{badge.progressText}</div>
                  {badge.progress > 0 && <ProgressBar percentage={badge.progress} />}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>)
}