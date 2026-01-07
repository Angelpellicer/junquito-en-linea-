import { TrustBadgeType } from '@/types/provider';
import { BadgeCheck, Star, Sparkles, Award } from 'lucide-react';

interface TrustBadgeProps {
  type: TrustBadgeType;
  size?: 'sm' | 'md';
}

const badgeConfig = {
  new: {
    label: 'Nuevo',
    icon: Sparkles,
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  recommended: {
    label: 'Recomendado',
    icon: Star,
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  verified: {
    label: 'Verificado',
    icon: BadgeCheck,
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  'top-local': {
    label: 'Top Local',
    icon: Award,
    className: 'bg-purple-50 text-purple-700 border-purple-200',
  },
};

export default function TrustBadge({ type, size = 'md' }: TrustBadgeProps) {
  if (!type) return null;

  const config = badgeConfig[type];
  const Icon = config.icon;
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';
  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-medium ${config.className} ${sizeClasses}`}
    >
      <Icon size={iconSize} />
      {config.label}
    </span>
  );
}

