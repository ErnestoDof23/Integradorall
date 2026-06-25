import { memo, useMemo } from 'react';

interface GaugeCircularProps {
  pct: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

function getColor(pct: number): string {
  if (pct >= 80) return '#16a34a';
  if (pct >= 60) return '#2563eb';
  if (pct >= 40) return '#d97706';
  return '#dc2626';
}

function getLabel(pct: number): string {
  if (pct >= 80) return 'EXCELENTE';
  if (pct >= 60) return 'BUENO';
  if (pct >= 40) return 'REGULAR';
  return 'DEFICIENTE';
}

function GaugeCircularInner({
  pct,
  size = 160,
  strokeWidth = 12,
  label,
}: GaugeCircularProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPct = Math.min(100, Math.max(0, pct));
  const offset = circumference - (clampedPct / 100) * circumference;
  const color = getColor(pct);
  const displayLabel = label || getLabel(pct);

  const circleProps = useMemo(
    () => ({
      cx: size / 2,
      cy: size / 2,
      r: radius,
      fill: 'none' as const,
      stroke: color,
      strokeWidth,
      strokeLinecap: 'round' as const,
      strokeDasharray: circumference,
      strokeDashoffset: offset,
    }),
    [size, radius, color, strokeWidth, circumference, offset]
  );

  return (
    <div className="relative inline-flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="-rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          className="dark:stroke-gray-600"
          strokeWidth={strokeWidth}
        />
        <circle
          {...circleProps}
          className="transition-all duration-1500 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold" style={{ color }}>
          {pct}%
        </span>
        <span className="mt-1 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400">
          {displayLabel}
        </span>
      </div>
    </div>
  );
}

const GaugeCircular = memo(GaugeCircularInner);
export default GaugeCircular;
