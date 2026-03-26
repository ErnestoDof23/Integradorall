import React, { useState, useEffect } from 'react';
import CanchaCard from './CanchaCard';
import CanchaModal from './CanchaModal';
import Button from './Button';
import { theme } from '../theme';
import { IconPlus } from './Icons';
import Swal from 'sweetalert2';
import apiService from '../services/apiService';

/**
 * Canchas - Componente para mostrar y gestionar canchas
 */
function Canchas() {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCancha, setEditingCancha] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Cargar canchas del backend
  useEffect(() => {
    const loadCanchas = async () => {
      try {
        setLoading(true);
        const data = await apiService.getInstalaciones();
        console.log('Datos recibidos del backend:', data);
        
        // Manejar diferentes formatos de respuesta
        let canchasArray = [];
        if (Array.isArray(data)) {
          canchasArray = data;
        } else if (data && typeof data === 'object') {
          // Si es un objeto, buscar el array dentro
          canchasArray = data.data || data.instalaciones || data.canchas || Object.values(data).find(arr => Array.isArray(arr)) || [];
        }
        
        console.log('Canchas procesadas:', canchasArray);
        setCanchas(canchasArray);
        
        if (canchasArray.length === 0) {
          console.warn('No se encontraron canchas en la respuesta');
        }
      } catch (error) {
        console.error('Error al cargar canchas:', error);
        setCanchas([]); // Establecer array vacío en caso de error
        Swal.fire({
          title: 'Error',
          text: `No se pudieron cargar las canchas: ${error.message}`,
          icon: 'error',
          confirmButtonColor: theme.primary.main,
        });
      } finally {
        setLoading(false);
      }
    };

    loadCanchas();
  }, []);

  // Calcular paginación
  const totalPages = Math.ceil(canchas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCanchas = canchas.slice(startIndex, endIndex);

  const handleOpenModal = () => {
    setEditingCancha(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCancha(null);
  };

  const handleAddCancha = async (formData) => {
    try {
      const result = await apiService.crearInstalacion(formData);
      
      // Recargar las canchas del backend
      const data = await apiService.getInstalaciones();
      const canchasArray = Array.isArray(data) ? data : data.data || [];
      setCanchas(canchasArray);
      
      handleCloseModal();

      Swal.fire({
        title: '¡Éxito!',
        text: `La cancha ha sido creada correctamente`,
        icon: 'success',
        confirmButtonColor: theme.primary.main,
        timer: 2500,
      });
    } catch (error) {
      console.error('Error al crear cancha:', error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudo crear la cancha',
        icon: 'error',
        confirmButtonColor: theme.primary.main,
      });
    }
  };

  const handleEditCancha = (id) => {
    const cancha = canchas.find(c => c.idInstalacion === id || c.id === id);
    setEditingCancha(cancha);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (formData) => {
    try {
      const id = editingCancha.idInstalacion || editingCancha.id;
      await apiService.actualizarInstalacion(id, formData);
      
      // Recargar las canchas del backend
      const data = await apiService.getInstalaciones();
      const canchasArray = Array.isArray(data) ? data : data.data || [];
      setCanchas(canchasArray);
      
      handleCloseModal();

      Swal.fire({
        title: '¡Actualizado!',
        text: `La cancha ha sido actualizada correctamente`,
        icon: 'success',
        confirmButtonColor: theme.primary.main,
        timer: 2500,
      });
    } catch (error) {
      console.error('Error al actualizar cancha:', error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudo actualizar la cancha',
        icon: 'error',
        confirmButtonColor: theme.primary.main,
      });
    }
  };

  const handleDeleteCancha = (id) => {
    const cancha = canchas.find(c => c.idInstalacion === id || c.id === id);
    
    Swal.fire({
      title: '¿Eliminar Cancha?',
      html: `
        <div style="text-align: left;">
          <p style="font-size: 16px; color: #333; margin-bottom: 16px;">
            ¿Estás seguro de que deseas eliminar la siguiente cancha?
          </p>
          <div style="
            background: #f5f5f5;
            border-radius: 8px;
            padding: 16px;
            border-left: 4px solid #2196F3;
            margin-bottom: 16px;
          ">
            <div style="font-weight: 600; font-size: 16px; color: #000; margin-bottom: 8px;">
              ${cancha.nombre || cancha.name}
            </div>
            <div style="font-size: 14px; color: #666;">
              <strong>Descripción:</strong> ${cancha.descripcion || cancha.type || 'Cancha'}<br/>
              <strong>Estado:</strong> ${cancha.estado || cancha.status}
            </div>
          </div>
          <p style="font-size: 14px; color: #f44336; font-weight: 500;">
            ⚠️ Esta acción no se puede deshacer
          </p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.error.main,
      cancelButtonColor: theme.neutral[400],
      confirmButtonText: 'Sí, Eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiService.eliminarInstalacion(id);
          
          // Recargar las canchas del backend
          const data = await apiService.getInstalaciones();
          const canchasArray = Array.isArray(data) ? data : data.data || [];
          setCanchas(canchasArray);
          
          if (currentPage > Math.ceil((canchasArray.length) / itemsPerPage)) {
            setCurrentPage(Math.max(1, currentPage - 1));
          }

          Swal.fire({
            title: '¡Eliminado!',
            text: `La cancha ha sido eliminada correctamente`,
            icon: 'success',
            confirmButtonColor: theme.primary.main,
            timer: 2500,
          });
        } catch (error) {
          console.error('Error al eliminar cancha:', error);
          Swal.fire({
            title: 'Error',
            text: error.message || 'No se pudo eliminar la cancha',
            icon: 'error',
            confirmButtonColor: theme.primary.main,
          });
        }
      }
    });
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

  const paginationStyle = {
    display: 'flex',
    gap: theme.spacing[2],
    justifyContent: 'center',
    marginTop: theme.spacing[4],
    flexWrap: 'wrap',
  };

  const pageButtonStyle = (isActive) => ({
    width: '40px',
    height: '40px',
    borderRadius: theme.borderRadius.md,
    border: 'none',
    background: isActive ? theme.primary.main : theme.neutral[200],
    color: isActive ? theme.neutral.white : theme.neutral[900],
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body2,
    cursor: 'pointer',
    transition: theme.transitions.fast,
    fontWeight: isActive ? 600 : 400,
  });

  const addButtonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    background: '#2196F3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: theme.shadows[4],
    transition: theme.transitions.fast,
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Canchas Disponibles</h2>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: theme.neutral[600] }}>
          <p>Cargando canchas...</p>
        </div>
      ) : (
        <>
          <div style={gridStyle}>
            {currentCanchas.map((c) => (
              <CanchaCard 
                key={c.idInstalacion || c.id} 
                id={c.idInstalacion || c.id}
                {...c} 
                onEdit={handleEditCancha}
                onDelete={handleDeleteCancha}
              />
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div style={paginationStyle}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  style={pageButtonStyle(page === currentPage)}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal para agregar/editar */}
      <CanchaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={editingCancha ? handleSaveEdit : handleAddCancha}
        cancha={editingCancha}
      />

      {/* Botón flotante para agregar */}
      <div 
        style={addButtonStyle}
        onClick={handleOpenModal}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = theme.shadows[6];
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = theme.shadows[4];
        }}
      >
        <IconPlus size={32} color={theme.neutral.white} />
      </div>
    </div>
  );
}

export default Canchas;
