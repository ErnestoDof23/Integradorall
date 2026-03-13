import { useState, useEffect } from 'react';
import Button from './Button';
import usersData from '../data/usersData';

// simple login form with username/password fields and a submit handler
// props:
//  - onLogin(credentials) : called when user submits with both fields non-empty
//  - error : optional string to display above form

function LoginForm({ onLogin, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(() => {
    // restore lockout from localStorage if it exists and hasn't expired
    const stored = localStorage.getItem('loginLockoutUntil');
    if (stored) {
      const until = parseInt(stored, 10);
      if (Date.now() < until) {
        return until;
      } else {
        // lockout expired, clear it
        localStorage.removeItem('loginLockoutUntil');
        return null;
      }
    }
    return null;
  });
  const [remaining, setRemaining] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmptyWarning, setShowEmptyWarning] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showNonAdminAlert, setShowNonAdminAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if we're currently locked, do nothing (timers handle display)
    if (lockedUntil && Date.now() < lockedUntil) {
      return;
    }

    if (username.trim() === '' || password.trim() === '') {
      // indicate to user they must fill both inputs
      setShowEmptyWarning(true);
      return;
    }

    // find user by email
    const master = JSON.parse(localStorage.getItem('usersData') || JSON.stringify(usersData));
    const found = master.find((u) => u.email.toLowerCase() === username.trim().toLowerCase());
    if (!found) {
      setLoginError('Usuario no existe');
      return;
    }
    if (found.blocked) {
      setLoginError('Cuenta bloqueada');
      return;
    }
    if (found.password !== password) {
      setLoginError('Contraseña incorrecta');
      setAttempts((a) => a + 1);
      if (attempts + 1 >= 3) {
        const until = Date.now() + 60_000; // 1 minute
        setLockedUntil(until);
        setRemaining(60);
        // persist to localStorage
        localStorage.setItem('loginLockoutUntil', until.toString());
      }
      return;
    }

    // check if user is admin (web is admin-only)
    if (found.role !== 'Administrador') {
      setShowNonAdminAlert(true);
      return;
    }

    // success: return full user object (without password)
    const user = { id: found.id, email: found.email, fullName: found.fullName, role: found.role, blocked: found.blocked };
    onLogin(user);
    setAttempts(0);
    setShowEmptyWarning(false);
    setLoginError('');
    setShowNonAdminAlert(false);
  };

  // update remaining time every second when locked
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

  const containerStyle = {
    width: '100%',
    maxWidth: '400px',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: 'none',
    padding: 0,
    fontFamily: 'sans-serif',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    margin: '12px 0',
    borderRadius: '8px',
    border: '2px solid #28d463',
    boxSizing: 'border-box',
    outline: 'none',
    fontSize: '1.1rem',
    background: '#fff',
    color: '#222',
    transition: 'border-color 0.2s',
  };

  const errorStyle = {
    color: 'crimson',
    marginBottom: '0.5rem',
    textAlign: 'left',
    fontSize: '1rem',
  };

  return (
    <div style={containerStyle}>
      {/* warning shown when user submits with empty fields */}
      {showEmptyWarning && (
        <div
          style={{
            background: '#ffecec',
            border: '1px solid #f5aca6',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '16px',
            fontSize: '0.95rem',
            color: '#d8000c',
          }}
        >
          Los campos están vacíos. Por favor, rellena ambos campos.
        </div>
      )}
      {/* alert shown when user is not admin */}
      {showNonAdminAlert && (
        <div
          style={{
            background: '#ffecec',
            border: '1px solid #f5aca6',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '16px',
            fontSize: '0.95rem',
            color: '#d8000c',
          }}
        >
          Eres usuario
        </div>
      )}
      <label style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 0, marginTop: 0 }}>Correo Electrónico</label>
      {error && <div style={errorStyle}>{error}</div>}
      {loginError && <div style={errorStyle}>{loginError}</div>}
      {lockedUntil && Date.now() < lockedUntil && (
        <div
          style={{
            background: '#fff4e5',
            border: '1px solid #ffa502',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '16px',
            fontSize: '0.95rem',
            color: '#856404',
          }}
        >
          Has superado los 3 intentos. Por favor espera {remaining} segundos para volver a intentar.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative', marginBottom: '18px' }}>
          <input
            style={inputStyle}
            type="text"
            placeholder="user@email.com"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (showEmptyWarning && e.target.value.trim() && password.trim()) {
                setShowEmptyWarning(false);
              }
              if (showNonAdminAlert) {
                setShowNonAdminAlert(false);
              }
            }}
            disabled={lockedUntil && Date.now() < lockedUntil}
            autoComplete="username"
          />
          {/* Icono de usuario a la derecha del input */}
          <svg
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 24, height: 24, color: '#28d463' }}
            fill="none" stroke="#28d463" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <label style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: 0, marginTop: 0 }}>Contraseña</label>
        <div style={{ position: 'relative', marginBottom: '18px' }}>
          <input
            style={inputStyle}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (showEmptyWarning && username.trim() && e.target.value.trim()) {
                setShowEmptyWarning(false);
              }
              if (showNonAdminAlert) {
                setShowNonAdminAlert(false);
              }
            }}
            disabled={lockedUntil && Date.now() < lockedUntil}
            autoComplete="current-password"
          />
          <svg
            onClick={() => setShowPassword((v) => !v)}
            style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
            width="22" height="22" fill="none" stroke="#28d463" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
          >
            {showPassword
              ? <><path d="M1 1l22 22" stroke="#28d463" strokeWidth="2"/><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7.5a11.72 11.72 0 0 1 5.17-5.94"/><path d="M9.53 9.53A3.5 3.5 0 0 1 12 8.5c1.38 0 2.5 1.12 2.5 2.5 0 .47-.13.91-.35 1.29"/></>
              : <><path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z"/><circle cx="12" cy="12" r="3.5"/></>
            }
          </svg>
        </div>
        <Button
          text="Iniciar Sesión"
          type="submit"
          action={() => {}} /* form submit handles */
          style={{
            width: '100%',
            marginTop: '18px',
            background: '#28d463',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.15rem',
            borderRadius: '10px',
            boxShadow: 'none',
            border: 'none',
            padding: '14px 0',
            letterSpacing: '0.5px',
          }}
          hoverStyle={{ background: '#219e3f' }}
          disabled={lockedUntil && Date.now() < lockedUntil}
        />
      </form>
    </div>
  );
}

export default LoginForm;
