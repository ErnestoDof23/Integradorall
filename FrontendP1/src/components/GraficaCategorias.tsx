import { memo } from 'react';
import type { CategoryResult } from '../types';

interface GraficaCategoriasProps {
  categories: CategoryResult[];
}

function getColor(pct: number): string {
  if (pct >= 70) return 'bg-success';
  if (pct >= 40) return 'bg-warning';
  return 'bg-danger';
}

function getTextColor(pct: number): string {
  if (pct >= 70) return 'text-success';
  if (pct >= 40) return 'text-warning';
  return 'text-danger';
}

function GraficaCategoriasInner({ categories }: GraficaCategoriasProps) {
  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div key={cat.categoria_id} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{cat.nombre}</span>
            <span className={`text-sm font-bold ${getTextColor(cat.porcentaje)}`}>
              {cat.porcentaje}%
            </span>
          </div>
          <div className="relative h-6 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-700 ${getColor(cat.porcentaje)}`}
              style={{ width: `${cat.porcentaje}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {cat.score} / {cat.max_score} pts
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const GraficaCategorias = memo(GraficaCategoriasInner);
export default GraficaCategorias;
