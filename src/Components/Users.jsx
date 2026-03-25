import React, { useState, useMemo, useEffect } from 'react';
import UserCard from './UserCard';
import Button from './Button';
import { showAlert } from './Alert';
import userImg from '../assets/user.png';
import { theme } from '../theme';
import Swal from 'sweetalert2';
import apiService from '../services/apiService';

/**
 * Users - Componente para gestionar y mostrar usuarios
 * Props:
 * - currentUser: usuario actual
 */
function Users({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const perPage = 6;
  const totalPages = Math.ceil(users.length / perPage);

  const pagedUsers = useMemo(() => {
    const start = (page - 1) * perPage;
    return users.slice(start, start + perPage);
  }, [users, page]);

  // Cargar usuarios del backend
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await apiService.getUsuarios();
        const usersArray = Array.isArray(data) ? data : data.data || [];
        setUsers(usersArray);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los usuarios',
          icon: 'error',
          confirmButtonColor: theme.primary.main,
        });
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const toggleBlock = async (id) => {
    if (!currentUser || currentUser.role !== 'Administrador') {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'No tienes permisos para realizar esta acción.',
        icon: 'error',
        confirmButtonColor: theme.primary.main,
      });
      return;
    }

    const target = users.find((u) => u.id === id);
    
    if (!target) {
      Swal.fire({
        title: 'Error',
        text: 'El usuario no existe en el sistema.',
        icon: 'error',
        confirmButtonColor: theme.primary.main,
      });
      return;
    }

    try {
      // Actualizar el usuario en el backend
      const newState = !target.bloqueado; // O el campo correspondiente en el backend
      await apiService.actualizarUsuario(id, { ...target, bloqueado: newState });
      
      // Recargar usuarios del backend
      const data = await apiService.getUsuarios();
      const usersArray = Array.isArray(data) ? data : data.data || [];
      setUsers(usersArray);

      Swal.fire({
        title: newState ? 'Bloqueado' : 'Desbloqueado',
        text: `El usuario ha sido ${newState ? 'bloqueado' : 'desbloqueado'} correctamente.`,
        icon: 'success',
        confirmButtonColor: theme.primary.main,
        timer: 2500,
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudo actualizar el usuario',
        icon: 'error',
        confirmButtonColor: theme.primary.main,
      });
    }
  };

  const toggleAdmin = async (id) => {
    if (!currentUser || currentUser.role !== 'Administrador') {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'No tienes permisos para realizar esta acción.',
        icon: 'error',
        confirmButtonColor: theme.primary.main,
      });
      return;
    }

    const target = users.find((u) => u.id === id || u.idUsuario === id);

    if (!target) {
      Swal.fire({
        title: 'Error',
        text: 'El usuario no existe en el sistema.',
        icon: 'error',
        confirmButtonColor: theme.primary.main,
      });
      return;
    }

    const adminCount = users.filter((u) => u.rol?.nombre === 'Administrador' || u.rol === 'Administrador').length;
    if ((target.rol?.nombre === 'Administrador' || target.rol === 'Administrador') && adminCount <= 1) {
      Swal.fire({
        title: 'Operación no permitida',
        text: 'No se puede quitar permisos de administrador al último administrador del sistema.',
        icon: 'warning',
        confirmButtonColor: theme.primary.main,
      });
      return;
    }

    try {
      // Cambiar el rol del usuario
      const newRol = target.rol?.nombre === 'Administrador' || target.rol === 'Administrador' ? 2 : 1; // 1=Admin, 2=User (ajusta según tu BD)
      const updateData = {
        ...target,
        rol: { ...target.rol, idRol: newRol }
      };
      
      await apiService.actualizarUsuario(target.idUsuario || target.id, updateData);
      
      // Recargar usuarios del backend
      const data = await apiService.getUsuarios();
      const usersArray = Array.isArray(data) ? data : data.data || [];
      setUsers(usersArray);

      Swal.fire({
        title: 'Rol actualizado',
        text: `${target.nombre} ha sido actualizado correctamente.`,
        icon: 'success',
        confirmButtonColor: theme.primary.main,
        timer: 2500,
      });
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudo actualizar el rol',
        icon: 'error',
        confirmButtonColor: theme.primary.main,
      });
    }
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

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: theme.neutral[600] }}>
          <p>Cargando usuarios...</p>
        </div>
      ) : (
        <>
          <div style={gridStyle}>
            {pagedUsers.map((u) => (
              <UserCard
                key={u.idUsuario || u.id}
                id={u.idUsuario || u.id}
                nombre={u.nombre}
                correoInstitucional={u.correoInstitucional || u.email}
                rol={u.rol?.nombre || u.role}
                bloqueado={u.bloqueado}
                img={userImg}
                onToggleBlock={() => toggleBlock(u.idUsuario || u.id)}
                onToggleAdmin={() => toggleAdmin(u.idUsuario || u.id)}
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
        </>
      )}
    </div>
  );
}

export default Users;
