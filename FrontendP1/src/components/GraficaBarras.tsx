import { memo } from 'react';

interface GraficaBarrasItem {
  label: string;
  value: number;
  max?: number;
  sublabel?: string;
}

interface GraficaBarrasProps {
  data: GraficaBarrasItem[];
}

function getColor(pct: number): { bg: string; text: string } {
  if (pct >= 70) return { bg: 'bg-success', text: 'text-success' };
  if (pct >= 40) return { bg: 'bg-warning', text: 'text-warning' };
  return { bg: 'bg-danger', text: 'text-danger' };
}

function getTooltip(pct: number): string {
  if (pct >= 70) return 'Buen estado - mantener condiciones actuales';
  if (pct >= 40) return 'Requiere mejoras - atencion moderada';
  return 'Estado critico - intervencion urgente';
}

function GraficaBarrasInner({ data }: GraficaBarrasProps) {
  return (
    <div className="space-y-4">
      {data.map((item, idx) => {
        const max = item.max || 100;
        const pct = Math.min(100, (item.value / max) * 100);
        const colors = getColor(pct);
        return (
          <div key={idx} className="space-y-1.5" title={getTooltip(pct)}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary" id={`bar-label-${idx}`}>{item.label}</span>
              <span className={`text-sm font-bold ${colors.text}`}>
                {pct.toFixed(0)}% {item.sublabel && <span className="text-xs font-normal text-gray-500 dark:text-gray-400">({item.sublabel})</span>}
              </span>
            </div>
            <div
              className="h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-labelledby={`bar-label-${idx}`}
              aria-label={`${item.label}: ${pct}%`}
            >
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${colors.bg}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const GraficaBarras = memo(GraficaBarrasInner);
export default GraficaBarras;
