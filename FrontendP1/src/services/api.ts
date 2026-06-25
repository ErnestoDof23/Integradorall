import axios from 'axios';
import type {
  AuthResponse,
  LoginData,
  RegisterData,
  Proyecto,
  Diagnostico,
  Categoria,
  Question,
  Respuesta,
  DiagnosisResult,
} from '../types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const isLoginRequest = err.config?.url === '/auth/login' || err.config?.url === '/auth/register';
    if (err.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// --- Auth ---
export async function login(data: LoginData): Promise<AuthResponse> {
  const { data: res } = await api.post<AuthResponse>('/auth/login', data);
  return res;
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const { data: res } = await api.post<AuthResponse>('/auth/register', data);
  return res;
}

export async function getProfile(): Promise<{ user: import('../types').User }> {
  const { data } = await api.get('/auth/profile');
  return data;
}

// --- Proyectos ---
export async function createProyecto(data: {
  nombre: string;
  cliente: string;
  direccion: string;
  estado: string;
  ciudad: string;
  tipo: string;
  fecha: string;
}): Promise<Proyecto> {
  const { data: proyecto } = await api.post<Proyecto>('/proyectos', data);
  return proyecto;
}

export async function getProyecto(id: string): Promise<Proyecto> {
  const { data } = await api.get<Proyecto>(`/proyectos/${id}`);
  return data;
}

export async function listProyectos(): Promise<Proyecto[]> {
  const { data } = await api.get<Proyecto[]>('/proyectos');
  return data;
}

export async function deleteProyecto(id: string): Promise<void> {
  await api.delete(`/proyectos/${id}`);
}

// --- Diagnosticos ---
export async function createDiagnostico(
  proyecto_id: string
): Promise<Diagnostico> {
  const { data } = await api.post<Diagnostico>('/diagnosticos', {
    proyecto_id,
  });
  return data;
}

export async function getDiagnostico(id: string): Promise<Diagnostico> {
  const { data } = await api.get<Diagnostico>(`/diagnosticos/${id}`);
  return data;
}

export async function getResult(diagnostico_id: string): Promise<DiagnosisResult> {
  const { data } = await api.get<DiagnosisResult>(
    `/diagnosticos/${diagnostico_id}/resultado`
  );
  return data;
}

export async function finalizarDiagnostico(
  diagnostico_id: string
): Promise<DiagnosisResult> {
  const { data } = await api.post<DiagnosisResult>(
    `/diagnosticos/${diagnostico_id}/finalizar`
  );
  return data;
}

export interface ResultadoDetallado extends DiagnosisResult {
  recomendaciones_categoria?: { categoria_id: string; nombre: string; recomendacion: string }[];
  fortalezas?: string[];
  areas_mejora?: string[];
}

export async function getResultadoDetallado(
  diagnostico_id: string
): Promise<ResultadoDetallado> {
  const { data } = await api.get<ResultadoDetallado>(
    `/diagnosticos/${diagnostico_id}/resultado-detallado`
  );
  return data;
}

export interface DiagnosticoListItem {
  id: string;
  proyecto_nombre: string;
  fecha: string;
  created_at?: string;
  estado: string;
  porcentaje?: number;
  direccion?: string;
}

export async function listarDiagnosticos(): Promise<DiagnosticoListItem[]> {
  const { data } = await api.get<DiagnosticoListItem[]>('/diagnosticos');
  return data;
}

export async function downloadReport(
  diagnostico_id: string
): Promise<Blob> {
  const { data } = await api.get(
    `/diagnosticos/${diagnostico_id}/reporte`,
    { responseType: 'blob' }
  );
  return data;
}

// --- Categorias ---
export async function getCategorias(
  diagnostico_id: string
): Promise<Categoria[]> {
  const { data } = await api.get<Categoria[]>(
    `/diagnosticos/${diagnostico_id}/categorias`
  );
  return data;
}

// --- Preguntas ---
export async function getPreguntas(
  categoria_id: string
): Promise<Question[]> {
  const { data } = await api.get<Question[]>(
    `/categorias/${categoria_id}/preguntas`
  );
  return data;
}

// --- Respuestas ---
export async function saveRespuesta(respuesta: {
  pregunta_id: string;
  diagnostico_id: string;
  nivel: string;
  observaciones: string;
}): Promise<Respuesta> {
  const { data } = await api.post<Respuesta>('/respuestas', respuesta);
  return data;
}

export async function getRespuestas(
  diagnostico_id: string
): Promise<Respuesta[]> {
  const { data } = await api.get<Respuesta[]>(
    `/diagnosticos/${diagnostico_id}/respuestas`
  );
  return data;
}

export default api;
