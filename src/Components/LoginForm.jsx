import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Card from './Card';
import { theme } from '../theme';
import Swal from 'sweetalert2';
import authService from '../services/authService';

/**
 * LoginForm - Formulario de login con Material Design
 * Props:
 * - onLogin(user): Callback cuando login es exitoso
 * - error: String de error externo (legacy support)
 */
function LoginForm({ onLogin, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(() => {
    const stored = localStorage.getItem('loginLockoutUntil');
    if (stored) {
      const until = parseInt(stored, 10);
      if (Date.now() < until) {
        return until;
      } else {
        localStorage.removeItem('loginLockoutUntil');
        return null;
      }
    }
    return null;
  });
  const [remaining, setRemaining] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (lockedUntil && Date.now() < lockedUntil) {
      Swal.fire({
        title: 'Cuenta bloqueada',
        text: `Por favor espera ${remaining} segundos para volver a intentar.`,
        icon: 'warning',
        confirmButtonColor: theme.primary.main,
      });
      return;
    }

    if (username.trim() === '' || password.trim() === '') {
      Swal.fire({
        title: 'Campos vacíos',
        text: 'Por favor rellena el correo electrónico y la contraseña.',
        icon: 'warning',
        confirmButtonColor: theme.primary.main,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Intentar login con el backend
      const response = await authService.login(username.trim(), password);
      
      // Login exitoso
      const user = {
        id: response.usuario?.id || response.id,
        email: response.usuario?.email || response.email || username,
        fullName: response.usuario?.nombre || response.nombre || 'Usuario',
        role: response.usuario?.rol || response.rol || 'Usuario',
      };
      
      onLogin(user);
      setAttempts(0);
      setUsername('');
      setPassword('');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        const until = Date.now() + 60_000; // 1 minuto
        setLockedUntil(until);
        setRemaining(60);
        localStorage.setItem('loginLockoutUntil', until.toString());
        Swal.fire({
          title: 'Demasiados intentos',
          text: 'Has superado el número de intentos permitidos. Tu cuenta ha sido bloqueada por 1 minuto.',
          icon: 'error',
          confirmButtonColor: theme.primary.main,
        });
      } else {
        const remaining = 3 - newAttempts;
        Swal.fire({
          title: 'Error de login',
          text: `${error.message}. Tienes ${remaining} intento${remaining === 1 ? '' : 's'} restante${remaining === 1 ? '' : 's'}.`,
          icon: 'error',
          confirmButtonColor: theme.primary.main,
        });
      }
    }
  };

  // Update remaining time every second when locked
  useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const diff = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (diff <= 0) {
        setLockedUntil(null);
        setAttempts(0);
        setRemaining(0);
        localStorage.removeItem('loginLockoutUntil');
        clearInterval(id);
      } else {
        setRemaining(diff);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lockedUntil]);

  const isLocked = lockedUntil && Date.now() < lockedUntil;

  const containerStyle = {
    width: '100%',
    maxWidth: '420px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[4],
  };

  const titleStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h3,
    color: theme.neutral[900],
    textAlign: 'center',
    marginBottom: theme.spacing[2],
  };

  const subtitleStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body2,
    color: theme.neutral[600],
    textAlign: 'center',
    marginBottom: theme.spacing[4],
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: theme.spacing[2],
  };

  return (
    <div style={containerStyle}>
      <Card padding={theme.spacing[6]} elevation={2}>
        <div style={titleStyle}>Administrador</div>
        <div style={subtitleStyle}>Inicia sesión para continuar</div>

        <form style={formStyle} onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Ej: jazminrogel@utez.edu.mx"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLocked || isLoading}
          />

          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLocked || isLoading}
            showPasswordToggle={true}
            showPassword={showPassword}
            onPasswordToggle={() => setShowPassword(!showPassword)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLocked || isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        {error && (
          <div
            style={{
              marginTop: theme.spacing[3],
              padding: theme.spacing[3],
              backgroundColor: theme.error.light,
              color: theme.error.dark,
              borderRadius: theme.borderRadius.md,
              fontFamily: theme.typography.fontFamily,
              ...theme.typography.body2,
            }}
          >
            {error}
          </div>
        )}
      </Card>
    </div>
  );
}

export default LoginForm;
