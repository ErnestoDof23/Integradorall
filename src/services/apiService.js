// Detectar automáticamente si es localhost o una IP remota
const getAPIBaseURL = () => {
  const host = window.location.hostname;
  const port = 8080;
  
  // Si es localhost o 127.0.0.1, usar localhost
  // Si es una IP, usar esa IP
  // Si es un dominio, usar ese dominio
  const apiUrl = `http://${host}:${port}/api`;
  return apiUrl;
};

const API_BASE_URL = getAPIBaseURL();

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async handleResponse(response) {
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const error = await response.json();
        errorMessage = error.message || error.error || errorMessage;
      } catch (e) {
        // Si no es JSON, usar el mensaje de estado
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    try {
      return await response.json();
    } catch (e) {
      // Si la respuesta no es JSON válido, retornar ok
      return { success: true };
    }
  }

  // INSTALACIONES (Canchas)
  async getInstalaciones() {
    const response = await fetch(`${this.baseURL}/instalacion`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async crearInstalacion(data) {
    const response = await fetch(`${this.baseURL}/instalacion`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async actualizarInstalacion(id, data) {
    const response = await fetch(`${this.baseURL}/instalacion/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async eliminarInstalacion(id) {
    const response = await fetch(`${this.baseURL}/instalacion/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar: ${response.status}`);
    }
    return response.ok;
  }

  // USUARIOS
  async getUsuarios() {
    const response = await fetch(`${this.baseURL}/usuario`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async crearUsuario(data) {
    const response = await fetch(`${this.baseURL}/usuario`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async actualizarUsuario(id, data) {
    const response = await fetch(`${this.baseURL}/usuario/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async eliminarUsuario(id) {
    const response = await fetch(`${this.baseURL}/usuario/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar: ${response.status}`);
    }
    return response.ok;
  }

  // HORARIOS
  async getHorarios() {
    const response = await fetch(`${this.baseURL}/horario`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async crearHorario(data) {
    const response = await fetch(`${this.baseURL}/horario`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async actualizarHorario(id, data) {
    const response = await fetch(`${this.baseURL}/horario/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async eliminarHorario(id) {
    const response = await fetch(`${this.baseURL}/horario/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar: ${response.status}`);
    }
    return response.ok;
  }

  // RESERVACIONES
  async getReservaciones() {
    const response = await fetch(`${this.baseURL}/reservacion`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  async crearReservacion(data) {
    const response = await fetch(`${this.baseURL}/reservacion`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async actualizarReservacion(id, data) {
    const response = await fetch(`${this.baseURL}/reservacion/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async cancelarReservacion(id) {
    const response = await fetch(`${this.baseURL}/reservacion/${id}/cancelar`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ estado: 'Cancelada' }),
    });
    return this.handleResponse(response);
  }

  async eliminarReservacion(id) {
    const response = await fetch(`${this.baseURL}/reservacion/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar: ${response.status}`);
    }
    return response.ok;
  }

  // ROLES
  async getRoles() {
    const response = await fetch(`${this.baseURL}/rol`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }
}

export default new ApiService();
