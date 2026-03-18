import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Card from './Card';
import { showAlert } from './Alert';
import usersData from '../data/usersData';
import { theme } from '../theme';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (lockedUntil && Date.now() < lockedUntil) {
      showAlert(
        'Cuenta bloqueada',
        `Por favor espera ${remaining} segundos para volver a intentar.`,
        'warning'
      );
      return;
    }

    if (username.trim() === '' || password.trim() === '') {
      showAlert(
        'Campos vacíos',
        'Por favor rellena el correo electrónico y la contraseña.',
        'warning'
      );
      return;
    }

    setIsLoading(true);

    // Simulamos un pequeño delay para mejor UX
    setTimeout(() => {
      const master = JSON.parse(localStorage.getItem('usersData') || JSON.stringify(usersData));
      const found = master.find((u) => u.email.toLowerCase() === username.trim().toLowerCase());

      if (!found) {
        setIsLoading(false);
        showAlert(
          'Usuario no encontrado',
          'El correo electrónico ingresado no existe en el sistema.',
          'error'
        );
        return;
      }

      if (found.blocked) {
        setIsLoading(false);
        showAlert(
          'Cuenta bloqueada',
          'Esta cuenta ha sido bloqueada por un administrador.',
          'error'
        );
        return;
      }

      if (found.password !== password) {
        setIsLoading(false);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 3) {
          const until = Date.now() + 60_000; // 1 minuto
          setLockedUntil(until);
          setRemaining(60);
          localStorage.setItem('loginLockoutUntil', until.toString());
          showAlert(
            'Demasiados intentos',
            'Has superado el número de intentos permitidos. Tu cuenta ha sido bloqueada por 1 minuto.',
            'error'
          );
        } else {
          const remaining = 3 - newAttempts;
          showAlert(
            'Contraseña incorrecta',
            `Contraseña incorrecta. Tienes ${remaining} intento${remaining === 1 ? '' : 's'} restante${remaining === 1 ? '' : 's'}.`,
            'error'
          );
        }
        return;
      }

      if (found.role !== 'Administrador') {
        setIsLoading(false);
        showAlert(
          'Acceso denegado',
          'Solo los administradores pueden acceder a esta plataforma. Por favor contacta al administrador.',
          'error'
        );
        return;
      }

      // Login exitoso
      const user = {
        id: found.id,
        email: found.email,
        fullName: found.fullName,
        role: found.role,
        blocked: found.blocked,
      };
      onLogin(user);
      setAttempts(0);
      setUsername('');
      setPassword('');
      setIsLoading(false);
    }, 300);
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

        <form onSubmit={handleSubmit} style={formStyle}>
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="admin@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLocked || isLoading}
            required
            fullWidth
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLocked || isLoading}
            showPassword={showPassword}
            onPasswordToggle={() => setShowPassword(!showPassword)}
            showPasswordToggle
            required
            fullWidth
          />

          {isLocked && (
            <div
              style={{
                backgroundColor: theme.warning.background,
                border: `2px solid ${theme.warning.main}`,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing[3],
                color: theme.warning.main,
                textAlign: 'center',
                fontFamily: theme.typography.fontFamily,
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              Cuenta bloqueada. Espera {remaining}s para reintentar.
            </div>
          )}

          <Button
            text={isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            action={handleSubmit}
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            disabled={isLocked || isLoading}
            fullWidth
          />
        </form>
      </Card>

      {error && (
        <div
          style={{
            marginTop: theme.spacing[4],
            padding: theme.spacing[3],
            backgroundColor: theme.error.background,
            border: `2px solid ${theme.error.main}`,
            borderRadius: theme.borderRadius.lg,
            color: theme.error.main,
            textAlign: 'center',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default LoginForm;
