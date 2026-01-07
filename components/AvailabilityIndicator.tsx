import { AvailabilityStatus } from '@/types/provider';

interface AvailabilityIndicatorProps {
  status: AvailabilityStatus;
  showLabel?: boolean;
}

const statusConfig = {
  today: {
    label: 'Disponible hoy',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  'this-week': {
    label: 'Disponible esta semana',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  unavailable: {
    label: 'No disponible',
    className: 'bg-gray-100 text-gray-500 border-gray-200',
    dot: 'bg-gray-400',
  },
};

export default function AvailabilityIndicator({
  status,
  showLabel = true,
}: AvailabilityIndicatorProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <span className={`h-2 w-2 rounded-full ${config.dot}`} />
      {showLabel && config.label}
    </span>
  );
}

