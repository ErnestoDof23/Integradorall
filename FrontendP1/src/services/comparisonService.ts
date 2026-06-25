import api from './api';

export interface ComparisonData {
  anterior: {
    porcentaje: number;
    categorias: { nombre: string; porcentaje: number }[];
  } | null;
  actual: {
    porcentaje: number;
    categorias: { nombre: string; porcentaje: number }[];
  };
}

export async function getComparisonData(
  diagnostico_id: string
): Promise<ComparisonData | null> {
  try {
    const { data } = await api.get<ComparisonData>(
      `/diagnosticos/${diagnostico_id}/comparar`
    );
    return data;
  } catch {
    return null;
  }
}
