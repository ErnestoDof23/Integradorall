import React, { useState, useMemo } from 'react';
import UserCard from './UserCard';
import Button from './Button';
import { showAlert } from './Alert';
import userImg from '../assets/user.png';
import usersData from '../data/usersData';
import { theme } from '../theme';

/**
 * Users - Componente para gestionar y mostrar usuarios
 * Props:
 * - currentUser: usuario actual
 */
function Users({ currentUser }) {
  const [users, setUsers] = useState(() => {
    const master = JSON.parse(localStorage.getItem('usersData') || JSON.stringify(usersData));
    const list = master.map((u) => ({ id: u.id, name: u.fullName, role: u.role, blocked: u.blocked }));
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  });
  const [page, setPage] = useState(1);

  const perPage = 6;
  const totalPages = Math.ceil(users.length / perPage);

  const pagedUsers = useMemo(() => {
    const start = (page - 1) * perPage;
    return users.slice(start, start + perPage);
  }, [users, page]);

  const toggleBlock = (id) => {
    if (!currentUser || currentUser.role !== 'Administrador') {
      showAlert(
        'Acceso denegado',
        'No tienes permisos para realizar esta acción.',
        'error'
      );
      return;
    }

    const master = JSON.parse(localStorage.getItem('usersData') || JSON.stringify(usersData));
    const target = master.find((m) => m.id === id);
    
    if (!target) {
      showAlert(
        'Error',
        'El usuario no existe en el sistema.',
        'error'
      );
      return;
    }

    const adminCount = master.filter((m) => m.role === 'Administrador').length;
    if (target.role === 'Administrador' && adminCount <= 1) {
      showAlert(
        'Operación no permitida',
        'No se puede bloquear el último administrador del sistema.',
        'warning'
      );
      return;
    }

    setUsers((u) => u.map((x) => (x.id === id ? { ...x, blocked: !x.blocked } : x)));
    const updatedMaster = master.map((m) => (m.id === id ? { ...m, blocked: !m.blocked } : m));
    localStorage.setItem('usersData', JSON.stringify(updatedMaster));

    const newTarget = updatedMaster.find((m) => m.id === id);
    if (newTarget.blocked) {
      showAlert(
        'Cuenta bloqueada',
        `La cuenta de ${newTarget.fullName} ha sido bloqueada correctamente.`,
        'success'
      );
    } else {
      showAlert(
        'Cuenta desbloqueada',
        `La cuenta de ${newTarget.fullName} ha sido desbloqueada correctamente.`,
        'success'
      );
    }
  };

  const toggleAdmin = (id) => {
    if (!currentUser || currentUser.role !== 'Administrador') {
      showAlert(
        'Acceso denegado',
        'No tienes permisos para realizar esta acción.',
        'error'
      );
      return;
    }

    const master = JSON.parse(localStorage.getItem('usersData') || JSON.stringify(usersData));
    const target = master.find((m) => m.id === id);

    if (!target) {
      showAlert(
        'Error',
        'El usuario no existe en el sistema.',
        'error'
      );
      return;
    }

    const adminCount = master.filter((m) => m.role === 'Administrador').length;
    if (target.role === 'Administrador' && adminCount <= 1) {
      showAlert(
        'Operación no permitida',
        'No se puede quitar permisos de administrador al último administrador del sistema.',
        'warning'
      );
      return;
    }

    setUsers((u) =>
      u.map((x) =>
        x.id === id
          ? { ...x, role: x.role === 'Administrador' ? 'Usuario' : 'Administrador' }
          : x
      )
    );

    const updatedMaster = master.map((m) =>
      m.id === id
        ? { ...m, role: m.role === 'Administrador' ? 'Usuario' : 'Administrador' }
        : m
    );
    localStorage.setItem('usersData', JSON.stringify(updatedMaster));

    const newTarget = updatedMaster.find((m) => m.id === id);
    showAlert(
      'Rol actualizado',
      `${newTarget.fullName} es ahora ${newTarget.role === 'Administrador' ? 'Administrador' : 'Usuario'}.`,
      'success'
    );
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[6],
  };

  const titleStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h3,
    color: theme.neutral[900],
    marginBottom: theme.spacing[2],
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: theme.spacing[6],
  };

  const paginationContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing[2],
    marginTop: theme.spacing[8],
  };

  const paginationButtonStyle = (isActive) => ({
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    borderRadius: theme.borderRadius.lg,
    border: `2px solid ${isActive ? theme.primary.main : theme.neutral[300]}`,
    backgroundColor: isActive ? theme.primary.main : theme.neutral.white,
    color: isActive ? theme.neutral.white : theme.neutral[700],
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    cursor: 'pointer',
    transition: theme.transitions.fast,
  });

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Gestión de Usuarios</h2>

      <div style={gridStyle}>
        {pagedUsers.map((u) => (
          <UserCard
            key={u.id}
            {...u}
            img={userImg}
            onToggleBlock={() => toggleBlock(u.id)}
            onToggleAdmin={() => toggleAdmin(u.id)}
            disableAdmin={u.id === 6}
            disableBlock={u.id === 6}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div style={paginationContainerStyle}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={paginationButtonStyle(page === i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
