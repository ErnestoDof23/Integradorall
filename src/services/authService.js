import apiService from './apiService';

class AuthService {
  constructor() {
    this.baseURL = apiService.baseURL;
  }

  /**
   * Login del usuario
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise} - Retorna token y datos del usuario
   */
  async login(email, password) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const error = await response.json();
        errorMessage = error.message || error.error || errorMessage;
      } catch (e) {
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Guardar token en localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  }

  /**
   * Logout del usuario
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Obtener token actual
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();
