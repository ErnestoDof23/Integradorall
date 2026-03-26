import { useState } from "react";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/Dashboard";
import { theme } from "./theme";
import logoCircle from "./assets/utez1.jpeg";

/**
 * App - Componente raíz
 * Maneja la autenticación y renderiza Login o Dashboard
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [loginError, setLoginError] = useState('');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('dashboardSection');
  };

  const handleLogin = (userObj) => {
    if (userObj && (userObj.email || userObj.correoInstitucional)) {
      const userData = {
        id: userObj.idUsuario || userObj.id,
        email: userObj.correoInstitucional || userObj.email,
        fullName: userObj.nombre || userObj.fullName || 'Administrador',
        role: userObj.rolNombre || userObj.role || 'Usuario',
        bloqueado: userObj.bloqueado || false,
      };
      setIsLoggedIn(true);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      setLoginError('');
    } else {
      setLoginError('Usuario inválido');
    }
  };

  if (isLoggedIn) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // Login View
  const loginContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${theme.neutral.white} 0%, ${theme.neutral[50]} 100%)`,
    padding: theme.spacing[4],
    flexDirection: 'column',
    gap: theme.spacing[6],
  };

  const logoContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  };

  const logoStyle = {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: theme.shadows[4],
  };

  const titleStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.display,
    color: '#000000',
    margin: 0,
    letterSpacing: '1px',
    textAlign: 'center',
    marginTop: theme.spacing[4],
  };

  const subtitleStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h4,
    color: theme.neutral[600],
    margin: `${theme.spacing[3]} 0 0 0`,
    textAlign: 'center',
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '480px',
  };

  return (
    <div style={loginContainerStyle}>
      {/* Logo */}
      <div style={logoContainerStyle}>
        <img 
          src={logoCircle} 
          alt="Logo institucional" 
          style={logoStyle}
        />
      </div>

      {/* Títulos */}
      <div>
        <h1 style={titleStyle}>CAMPUS RESERVE</h1>
        <p style={subtitleStyle}>Sistema de Reservas Deportivas</p>
      </div>

      {/* Formulario de Login */}
      <div style={formContainerStyle}>
        <LoginForm
          error={loginError}
          onLogin={handleLogin}
        />
      </div>
    </div>
  );
}

export default App;
