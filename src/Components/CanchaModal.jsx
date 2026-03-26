import React, { useState, useEffect } from 'react';
import { theme } from '../theme';
import Button from './Button';
import Input from './Input';
import Swal from 'sweetalert2';
import { IconX, IconChevronDown } from './Icons';

/**
 * CanchaModal - Modal para crear/editar canchas
 * Props:
 * - isOpen: booleano para mostrar/ocultar modal
 * - onClose: función para cerrar modal
 * - onSave: función para guardar cancha
 * - cancha: cancha a editar (null si es crear)
 */
function CanchaModal({ isOpen, onClose, onSave, cancha }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: 'Cancha',
    foto: null,
    preview: null,
    estado: 'Disponible',
  });

  useEffect(() => {
    if (cancha) {
      setFormData({
        nombre: cancha.nombre || cancha.name || '',
        descripcion: cancha.descripcion || cancha.type || 'Cancha',
        foto: cancha.foto || cancha.img || null,
        preview: cancha.foto || cancha.img || null,
        estado: cancha.estado || 'Disponible',
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: 'Cancha',
        foto: null,
        preview: null,
        estado: 'Disponible',
      });
    }
  }, [cancha, isOpen]);

  const handleNameChange = (e) => {
    setFormData({ ...formData, nombre: e.target.value });
  };

  const handleTypeChange = (e) => {
    setFormData({ ...formData, descripcion: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar que el archivo sea jpg, jpeg o png
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          title: 'Error',
          text: 'Solo se permiten archivos JPG, JPEG o PNG',
          icon: 'error',
          confirmButtonColor: theme.primary.main,
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          foto: file,
          preview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingresa un nombre para la cancha',
        icon: 'error',
        confirmButtonColor: theme.primary.main,
      });
      return;
    }

    if (!formData.preview) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor selecciona una foto para la cancha',
        icon: 'error',
        confirmButtonColor: theme.primary.main,
      });
      return;
    }

    // Enviar con los nombres de campos que el backend espera
    onSave({
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      foto: formData.preview,
      estado: formData.estado,
    });

    setFormData({
      nombre: '',
      descripcion: 'Cancha',
      foto: null,
      preview: null,
      estado: 'Disponible',
    });
  };

  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const contentStyle = {
    background: theme.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[6],
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: theme.shadows[8],
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[4],
  };

  const titleStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h4,
    color: theme.neutral[900],
    margin: 0,
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[4],
  };

  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[2],
  };

  const labelStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body1,
    color: theme.neutral[900],
    fontWeight: 500,
  };

  const selectContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const selectStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body1,
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    paddingRight: theme.spacing[10],
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.neutral[300]}`,
    background: theme.neutral.white,
    color: theme.neutral[900],
    cursor: 'pointer',
    transition: theme.transitions.fast,
    width: '100%',
    appearance: 'none',
  };

  const chevronStyle = {
    position: 'absolute',
    right: theme.spacing[3],
    pointerEvents: 'none',
  };

  const previewStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: theme.borderRadius.md,
    border: `2px dashed ${theme.neutral[300]}`,
  };

  const imageInputContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[2],
  };

  const imageInputStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body1,
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    borderRadius: theme.borderRadius.md,
    border: `2px solid ${theme.info.main}`,
    background: theme.info.main,
    cursor: 'pointer',
    color: theme.neutral.white,
    textAlign: 'center',
    fontWeight: 600,
    transition: theme.transitions.fast,
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
  };

  const buttonsContainerStyle = {
    display: 'flex',
    gap: theme.spacing[3],
    marginTop: theme.spacing[4],
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{cancha ? 'Editar Cancha' : 'Agregar Nueva Cancha'}</h2>
          <button style={closeButtonStyle} onClick={onClose}>
            <IconX size={24} color={theme.neutral[600]} />
          </button>
        </div>

        <form style={formStyle} onSubmit={handleSubmit}>
          {/* Campo: Nombre */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Nombre de la Cancha</label>
            <Input
              type="text"
              placeholder="Ej: Basketball, Volleyball..."
              value={formData.nombre}
              onChange={handleNameChange}
              style={{ padding: `${theme.spacing[2]} ${theme.spacing[3]}` }}
            />
          </div>

          {/* Campo: Tipo con icono de flecha */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Tipo de Cancha</label>
            <div style={selectContainerStyle}>
              <select 
                style={selectStyle} 
                value={formData.descripcion} 
                onChange={handleTypeChange}
              >
                <option value="Cancha">Cancha</option>
                <option value="Auditorio">Auditorio</option>
              </select>
              <IconChevronDown 
                size={20} 
                color={theme.info.main} 
                style={chevronStyle} 
              />
            </div>
          </div>

          {/* Campo: Foto */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Foto de la Cancha</label>
            <div style={imageInputContainerStyle}>
              <label style={imageInputStyle}>
                📷 Seleccionar Foto
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
              {formData.preview && (
                <img src={formData.preview} alt="Preview" style={previewStyle} />
              )}
            </div>
          </div>

          {/* Botones con textos */}
          <div style={buttonsContainerStyle}>
            <Button
              label="Cancelar"
              variant="outlined"
              color="secondary"
              onClick={onClose}
              style={{ flex: 1 }}
            />
            <Button
              label={cancha ? 'Actualizar' : 'Crear Cancha'}
              variant="contained"
              color="info"
              type="submit"
              style={{ flex: 1 }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CanchaModal;
