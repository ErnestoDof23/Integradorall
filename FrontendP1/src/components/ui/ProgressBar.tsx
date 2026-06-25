interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  color?: 'primary' | 'success' | 'warning';
}

const barColors = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
};

export default function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  color = 'primary',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs text-gray-500 dark:text-dark-text-secondary">
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${
          size === 'sm' ? 'h-1.5' : 'h-3'
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColors[color]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
