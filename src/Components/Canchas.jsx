import React, { useState } from 'react';
import CanchaCard from './CanchaCard';
import CanchaModal from './CanchaModal';
import Button from './Button';
import { theme } from '../theme';
import { IconPlus } from './Icons';
import canchasData from '../data/canchasData';
import Swal from 'sweetalert2';

/**
 * Canchas - Componente para mostrar y gestionar canchas
 */
function Canchas() {
  const [canchas, setCanchas] = useState(canchasData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCancha, setEditingCancha] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const handleAddCancha = (formData) => {
    const newCancha = {
      id: Math.max(...canchas.map(c => c.id), 0) + 1,
      ...formData,
      status: 'Disponibles',
    };

    setCanchas([...canchas, newCancha]);
    handleCloseModal();

    Swal.fire({
      title: '¡Éxito!',
      text: `La cancha "${newCancha.name}" ha sido creada correctamente`,
      icon: 'success',
      confirmButtonColor: theme.primary.main,
      timer: 2500,
    });
  };

  const handleEditCancha = (id) => {
    const cancha = canchas.find(c => c.id === id);
    setEditingCancha(cancha);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (formData) => {
    setCanchas(canchas.map(c => 
      c.id === editingCancha.id 
        ? { ...c, ...formData }
        : c
    ));
    handleCloseModal();

    Swal.fire({
      title: '¡Actualizado!',
      text: `La cancha ha sido actualizada correctamente`,
      icon: 'success',
      confirmButtonColor: theme.primary.main,
      timer: 2500,
    });
  };

  const handleDeleteCancha = (id) => {
    const cancha = canchas.find(c => c.id === id);
    
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
              ${cancha.name}
            </div>
            <div style="font-size: 14px; color: #666;">
              <strong>Tipo:</strong> ${cancha.type || 'Cancha'}<br/>
              <strong>Estado:</strong> ${cancha.status}
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
    }).then((result) => {
      if (result.isConfirmed) {
        setCanchas(canchas.filter(c => c.id !== id));
        if (currentPage > Math.ceil((canchas.length - 1) / itemsPerPage)) {
          setCurrentPage(Math.max(1, currentPage - 1));
        }

        Swal.fire({
          title: '¡Eliminado!',
          text: `"${cancha.name}" ha sido eliminada correctamente`,
          icon: 'success',
          confirmButtonColor: theme.primary.main,
          timer: 2500,
        });
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
      
      <div style={gridStyle}>
        {currentCanchas.map((c) => (
          <CanchaCard 
            key={c.id} 
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
