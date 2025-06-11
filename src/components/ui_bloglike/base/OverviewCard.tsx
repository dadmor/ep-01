// src/components/ui_bloglike/base/OverviewCard.tsx
import { ReactNode } from "react";
import { colorPalette } from "../colors";

interface OverviewCardProps {
  icon: ReactNode;
  value: number | string;
  label: string;
  subLabel?: string;
  color: "purple" | "amber" | "green" | "blue";
}

export function OverviewCard({
  icon,
  value,
  label,
  subLabel,
  color,
}: OverviewCardProps) {
  const style = colorPalette[color];

  return (
    <div className="text-center">
      <div
        className={`w-16 h-16 ${style.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}
      >
        {icon}
      </div>
      <div className={`text-3xl font-bold ${style.text}`}>{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {subLabel && (
        <div className={`text-xs ${style.text} mt-1`}>{subLabel}</div>
      )}
    </div>
  );
}
