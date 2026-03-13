import React, { useState } from 'react';
import Button from './Button';
import Canchas from './Canchas';
import Users from './Users';
// use football image as sidebar background (fondo removed)
import fondoImg from '../assets/fut.jpg';

// cancha images imported from assets
// image imports removed; Canchas component handles its own assets

function Dashboard({ user, onLogout }) {
  // import background image for sidebar
  const sidebarStyle = {
    width: '260px',
    minHeight: '100vh',
    backgroundImage: `url(${fondoImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '40px',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    position: 'fixed',
  };
  // optional overlay: light transparency over the image, no green
  // pointerEvents none so that clicks pass through to the menu
  const sidebarOverlay = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255,255,255,0.25)',
    zIndex: 0,
    pointerEvents: 'none',
  };
  const avatarStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: '#1e7a34',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    marginTop: '20px',
  };
  const userNameStyle = {
    fontWeight: 600,
    marginBottom: '32px',
    textAlign: 'center',
    fontSize: '1rem',
  };
  const menuItem = {
    width: '100%',
    padding: '14px 24px',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'background 0.3s ease',
  };
  const mainStyle = {
    flex: 1,
    background: '#f5f5f5',
    position: 'relative',
    marginLeft: '260px',
    padding: '32px',
    boxSizing: 'border-box',
  };
  const cardsContainer = {
    display: 'flex',
    gap: '24px',
    marginBottom: '32px',
  };
  const card = {
    flex: 1,
    background: '#fff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };
  const chartPlaceholder = {
    flex: 1,
    background: '#fff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    minHeight: '240px',
  };

  // hardcoded dashboard data (easily replaceable with props or API calls)
  const dashboardData = {
    canchasActivas: 5,
    canchasDesactivadas: 1,
    registrosHoy: 12,
  };

  // section state for navigation, remember last selected in localStorage
  const [section, setSection] = useState(() => {
    return localStorage.getItem('dashboardSection') || 'dashboard';
  });

  // write section to storage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('dashboardSection', section);
  }, [section]);

  return (
    <div style={{ display: 'flex', margin: 0, padding: 0 }}>
      <aside style={sidebarStyle}>
        <div style={sidebarOverlay} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* SVG User Icon */}
          <svg width="100" height="100" viewBox="0 0 100 100" fill="#fff">
            <circle cx="50" cy="35" r="18" />
            <path d="M 20 75 Q 20 55 50 55 Q 80 55 80 75 Q 80 85 50 85 Q 20 85 20 75 Z" />
          </svg>
          <div style={userNameStyle}>{user?.fullName || user?.username}</div>
          <div
          style={{ ...menuItem, background: section === 'dashboard' ? 'rgba(255,255,255,0.2)' : 'transparent' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = section === 'dashboard' ? 'rgba(255,255,255,0.2)' : 'transparent')}
          onClick={() => setSection('dashboard')}
        >
          Dashboard
        </div>
        </div>
        {/* end inner container */}
        <div
          style={{ ...menuItem, background: section === 'canchas' ? 'rgba(255,255,255,0.2)' : 'transparent' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = section === 'canchas' ? 'rgba(255,255,255,0.2)' : 'transparent')}
          onClick={() => setSection('canchas')}
        >
          Canchas
        </div>
        <div
          style={{ ...menuItem, background: section === 'usuarios' ? 'rgba(255,255,255,0.2)' : 'transparent' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = section === 'usuarios' ? 'rgba(255,255,255,0.2)' : 'transparent')}
          onClick={() => setSection('usuarios')}
        >
          Usuarios
        </div>
      </aside>
      <main style={mainStyle}>
        {section === 'dashboard' && (
          <>
            <h2>Dashboard</h2>
            <div style={cardsContainer}>
              <div style={card}>
                <div style={{ fontSize: '2.4rem', fontWeight: 600 }}>{dashboardData.canchasActivas}</div>
                <div>Canchas Activas</div>
              </div>
              <div style={card}>
                <div style={{ fontSize: '2.4rem', fontWeight: 600 }}>{dashboardData.canchasDesactivadas}</div>
                <div>Canchas desactivadas</div>
              </div>
              <div style={card}>
                <div style={{ fontSize: '2.4rem', fontWeight: 600 }}>{dashboardData.registrosHoy}</div>
                <div>Total de registros para hoy</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={chartPlaceholder}>
                <div style={{ fontWeight: 600, marginBottom: '12px' }}>Registros semanales por horario</div>
                <div style={{ textAlign: 'center', marginTop: '60px' }}>Gráfico anillo</div>
              </div>
              <div style={chartPlaceholder}>
                <div style={{ fontWeight: 600, marginBottom: '12px' }}>Registros de la semana</div>
                <div style={{ textAlign: 'center', marginTop: '60px' }}>Gráfico de barras</div>
              </div>
            </div>
          </>
        )}
        {section === 'canchas' && <Canchas />}
        {section === 'usuarios' && <Users currentUser={user} />}
        {/* logout positioned top right of main area */}
        <Button
          text="Cerrar sesión"
          action={onLogout}
          style={{
            background: '#dc3545',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: '6px',
            position: 'absolute',
            top: '20px',
            right: '32px',
            fontSize: '0.95rem',
          }}
          hoverStyle={{ background: '#c82333' }}
        />
      </main>
    </div>
  );
}

export default Dashboard;
