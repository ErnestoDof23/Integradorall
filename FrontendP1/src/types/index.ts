export interface User {
  id: string;
  nombre: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

export interface Property {
  id?: string;
  nombre: string;
  cliente: string;
  direccion: string;
  estado: string;
  ciudad: string;
  tipo: string;
  fecha: string;
}

export interface Proyecto {
  id: string;
  nombre: string;
  cliente: string;
  direccion: string;
  estado: string;
  ciudad: string;
  tipo: string;
  fecha: string;
}

export interface Diagnostico {
  id: string;
  proyecto_id: string;
  estado: string;
  score_total?: number;
  max_score?: number;
  porcentaje?: number;
  recomendacion?: string;
  created_at?: string;
  completed_at?: string;
}

export type SectionStatus = 'pendiente' | 'en_proceso' | 'completado';

export interface Categoria {
  id: string;
  diagnostico_id: string;
  nombre: string;
  orden: number;
  total_preguntas: number;
  respondidas: number;
}

export interface Question {
  id: string;
  categoria_id: string;
  texto: string;
  orden: number;
}

export type AnswerLevel = 'optimo' | 'aceptable' | 'malo';

export interface Answer {
  pregunta_id: string;
  nivel: AnswerLevel;
  observaciones: string;
}

export interface Respuesta {
  id?: string;
  pregunta_id: string;
  diagnostico_id: string;
  nivel: AnswerLevel;
  observaciones: string;
}

export const SCORE_MAP: Record<AnswerLevel, number> = {
  optimo: 10,
  aceptable: 5,
  malo: 0,
};

export interface CategoryResult {
  categoria_id: string;
  nombre: string;
  score: number;
  max_score: number;
  porcentaje: number;
}

export interface DiagnosisResult {
  diagnostico_id: string;
  proyecto_nombre: string;
  score_total: number;
  max_score: number;
  porcentaje: number;
  categorias: CategoryResult[];
  recomendacion: string;
  completed_at: string;
}

export interface DiagnosisState {
  proyecto_id: string | null;
  diagnostico_id: string | null;
  property: Property | null;
  categorias: Categoria[];
  answers: Record<string, Answer>;
  currentCategoriaId: string | null;
  result: DiagnosisResult | null;
}
