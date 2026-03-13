import { useState, useEffect } from "react";
import Button from "./Components/Button";
import LoginForm from "./Components/LoginForm";
import Dashboard from "./Components/Dashboard";

// logo de la institución. coloca un fichero llamado `logo.png` (u otro
// formato) dentro de `src/assets` y actualiza esta ruta si es necesario.
// inicialmente cargamos el `react.svg` que ya existe en la carpeta assets;
// puedes sustituirlo por el logo de tu institución (renombrándolo a
// `react.svg` o cambiando la ruta/imporción aquí).
// Logo superior institucional
import logoTop from "./assets/utez2.png";
// Logo circular al lado del login
import logoCircle from "./assets/utez1.jpeg";

function App() {
  // `isLoggedIn` indicates whether the user is authenticated. fixed
  // casing for readability.
  // initialize from localStorage so refresh doesn't kick us back to login
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [loginError, setLoginError] = useState('');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  if (isLoggedIn) {
    // once authenticated, render dashboard full‑screen using the logged user
    return (
      <Dashboard
        user={user}
        onLogout={() => {
          setIsLoggedIn(false);
          setUser(null);
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('user');
          localStorage.removeItem('dashboardSection');
        }}
      />
    );
  }

  // login view
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#fff', marginTop: '0', flexDirection: 'column', gap: '10px' }}>
        {/* Logo circular centered */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={logoCircle} alt="logo circular" style={{ width: '160px', height: '160px', borderRadius: '50%', border: '10px solid #b98c5a', background: '#2d3a2e', objectFit: 'cover', boxShadow: '0 2px 12px #0002' }} />
        </div>
        {/* Formulario */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '400px', maxWidth: '480px' }}>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 700, margin: 0, letterSpacing: '1px', textAlign: 'center' }}>BIENVENIDOS</h1>
          <p style={{ color: '#888', fontSize: '1.3rem', margin: '10px 0 32px 0', textAlign: 'center' }}>Sistema de Reservas Deportivas</p>
          <LoginForm
            error={loginError}
            onLogin={(userObj) => {
              if (userObj && userObj.email) {
                setIsLoggedIn(true);
                setUser(userObj);
                localStorage.setItem('user', JSON.stringify(userObj));
                localStorage.setItem('isLoggedIn', 'true');
                setLoginError('');
              } else {
                setLoginError('Usuario inválido');
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App
