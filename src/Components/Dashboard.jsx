import React, { useState } from 'react';
import Button from './Button';
import Card from './Card';
import Canchas from './Canchas';
import Users from './Users';
import { theme } from '../theme';
import fondoImg from '../assets/fut.jpg';
import { IconUser, IconDashboard, IconBall, IconUsers } from './Icons';

/**
 * Dashboard - Componente principal con layout sidebar + contenido
 * Props:
 * - user: objeto usuario actual
 * - onLogout: callback para cerrar sesión
 */
function Dashboard({ user, onLogout }) {
  const [section, setSection] = useState(() => {
    return localStorage.getItem('dashboardSection') || 'dashboard';
  });

  React.useEffect(() => {
    localStorage.setItem('dashboardSection', section);
  }, [section]);

  // Dashboard stats
  const dashboardData = {
    canchasActivas: 5,
    canchasDesactivadas: 1,
    registrosHoy: 12,
  };

  // Estilos del sidebar
  const sidebarStyle = {
    width: '280px',
    minHeight: '100vh',
    backgroundImage: `url(${fondoImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: theme.neutral.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing[10],
    boxSizing: 'border-box',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 100,
  };

  const sidebarOverlay = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
    pointerEvents: 'none',
  };

  const sidebarContentStyle = {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const avatarStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[4],
    boxShadow: theme.shadows[3],
  };

  const userNameStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h5,
    color: theme.neutral.white,
    textAlign: 'center',
    marginBottom: theme.spacing[8],
  };

  const menuItemStyle = (isActive) => ({
    width: '100%',
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    fontSize: '1rem',
    fontWeight: 500,
    transition: theme.transitions.fast,
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    borderLeft: isActive ? `4px solid ${theme.primary.light}` : '4px solid transparent',
    color: theme.neutral.white,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
  });

  // Estilos del main
  const mainStyle = {
    flex: 1,
    background: theme.neutral[100],
    position: 'relative',
    marginLeft: '280px',
    padding: theme.spacing[8],
    boxSizing: 'border-box',
    minHeight: '100vh',
  };

  const pageHeaderStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h2,
    color: theme.neutral[900],
    marginBottom: theme.spacing[6],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing[6],
    marginBottom: theme.spacing[8],
  };

  const statCardStyle = {
    textAlign: 'center',
  };

  const statNumberStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.display,
    color: theme.primary.main,
    marginBottom: theme.spacing[2],
  };

  const statLabelStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body2,
    color: theme.neutral[600],
  };

  const chartsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: theme.spacing[6],
  };

  const logoutButtonStyle = {
    position: 'absolute',
    top: theme.spacing[6],
    right: theme.spacing[8],
  };

  // Renderizar contenido por sección
  const renderContent = () => {
    switch (section) {
      case 'canchas':
        return <Canchas />;
      case 'usuarios':
        return <Users currentUser={user} />;
      case 'dashboard':
      default:
        return (
          <>
            <div style={cardsContainerStyle}>
              <Card elevation={1} style={statCardStyle}>
                <div style={statNumberStyle}>{dashboardData.canchasActivas}</div>
                <div style={statLabelStyle}>Canchas Activas</div>
              </Card>
              <Card elevation={1} style={statCardStyle}>
                <div style={statNumberStyle}>{dashboardData.canchasDesactivadas}</div>
                <div style={statLabelStyle}>Canchas Desactivadas</div>
              </Card>
              <Card elevation={1} style={statCardStyle}>
                <div style={statNumberStyle}>{dashboardData.registrosHoy}</div>
                <div style={statLabelStyle}>Registros Hoy</div>
              </Card>
            </div>

            <div style={chartsContainerStyle}>
              <Card elevation={1} title="Registros Semanales por Horario">
                <div style={{ 
                  textAlign: 'center', 
                  padding: theme.spacing[6],
                  color: theme.neutral[400],
                  fontFamily: theme.typography.fontFamily,
                }}>
                  📊 Gráfico anillo
                </div>
              </Card>
              <Card elevation={1} title="Registros de la Semana">
                <div style={{
                  textAlign: 'center',
                  padding: theme.spacing[6],
                  color: theme.neutral[400],
                  fontFamily: theme.typography.fontFamily,
                }}>
                  📈 Gráfico de barras
                </div>
              </Card>
            </div>
          </>
        );
    }
  };

  return (
    <div style={{ display: 'flex', margin: 0, padding: 0, minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={sidebarOverlay} />
        <div style={sidebarContentStyle}>
          {/* Avatar */}
          <div style={avatarStyle}>
            <IconUser size={60} color={theme.neutral.white} />
          </div>
          
          {/* User Name */}
          <div style={userNameStyle}>{user?.fullName || 'Administrador'}</div>

          {/* Menu Items */}
          <div
            style={menuItemStyle(section === 'dashboard')}
            onClick={() => setSection('dashboard')}
            onMouseEnter={(e) => {
              if (section !== 'dashboard') {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (section !== 'dashboard') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <IconDashboard size={20} color={theme.neutral.white} />
            Dashboard
          </div>

          <div
            style={menuItemStyle(section === 'canchas')}
            onClick={() => setSection('canchas')}
            onMouseEnter={(e) => {
              if (section !== 'canchas') {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (section !== 'canchas') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <IconBall size={20} color={theme.neutral.white} />
            Canchas
          </div>

          <div
            style={menuItemStyle(section === 'usuarios')}
            onClick={() => setSection('usuarios')}
            onMouseEnter={(e) => {
              if (section !== 'usuarios') {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (section !== 'usuarios') {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <IconUsers size={20} color={theme.neutral.white} />
            Usuarios
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={mainStyle}>
        <div style={pageHeaderStyle}>
          {section === 'dashboard' && 'Panel Principal'}
          {section === 'canchas' && 'Canchas'}
          {section === 'usuarios' && 'Usuarios'}

          <Button
            text="Cerrar sesión"
            action={onLogout}
            color="error"
            variant="contained"
            size="medium"
            style={logoutButtonStyle}
          />
        </div>

        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;
