import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface PurineBadgeProps {
  category: string;
  value?: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showValue?: boolean;
}

export function PurineBadge({
  category,
  value,
  size = 'md',
  showIcon = true,
  showValue = false,
}: PurineBadgeProps) {
  const isLow = category?.toLowerCase() === 'low';
  const isModerate = category?.toLowerCase() === 'moderate';
  const isHigh = category?.toLowerCase() === 'high';

  const colors = {
    low: 'bg-emerald-50 text-emerald-950 border-emerald-400',
    moderate: 'bg-amber-50 text-amber-950 border-amber-400',
    high: 'bg-red-50 text-red-950 border-red-400',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const Icon = isLow
    ? CheckCircle
    : isModerate
    ? AlertTriangle
    : AlertCircle;

  const colorClass = isLow
    ? colors.low
    : isModerate
    ? colors.moderate
    : colors.high;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        colorClass,
        sizeClasses[size]
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      <span className="capitalize">{category || 'Unknown'}</span>
      {showValue && value !== undefined && (
        <span className="font-normal">({value.toFixed(1)}mg)</span>
      )}
    </span>
  );
}
