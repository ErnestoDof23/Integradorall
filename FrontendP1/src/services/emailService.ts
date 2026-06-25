import api from './api';

export async function sendDiagnosticoEmail(
  diagnostico_id: string,
  email: string
): Promise<void> {
  await api.post('/notifications/diagnostico-completado', {
    diagnostico_id,
    email,
  });
}

export async function sendPdfEmail(
  diagnostico_id: string,
  email: string
): Promise<void> {
  await api.post('/notifications/pdf-generado', {
    diagnostico_id,
    email,
  });
}
