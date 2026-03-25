import React from 'react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import { theme } from '../theme';
import { IconEdit, IconTrash } from './Icons';

/**
 * CanchaCard - Tarjeta para mostrar información de una cancha
 * Props:
 * - id: ID de la cancha
 * - nombre/name: nombre de la cancha
 * - foto/img: URL de la imagen
 * - descripcion/type: tipo de cancha
 * - estado/status: 'Reservadas' | 'Disponibles'
 * - reserved: horario de reserva (opcional)
 * - onEdit: función para editar
 * - onDelete: función para eliminar
 */
function CanchaCard({ id, nombre, name, foto, img, descripcion, type, estado, status, reserved, onEdit, onDelete }) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Mapear campos del backend al formato de componente
  const displayName = nombre || name || 'Sin nombre';
  const displayImg = foto || img || '';
  const displayType = descripcion || type || 'Cancha';
  const displayStatus = estado || status || 'Disponibles';

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: theme.transitions.fast,
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
  };

    imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    transition: theme.transitions.fast,
    filter: isHovered ? 'brightness(0.9)' : 'brightness(1)',
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[2],
    padding: theme.spacing[4],
  };

  const titleStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h5,
    color: theme.neutral[900],
  };

  const statusBadgeColor = displayStatus === 'Reservadas' ? 'error' : 'success';

  const infoStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body2,
    color: theme.neutral[600],
  };

  const actionsContainerStyle = {
    display: 'flex',
    gap: theme.spacing[2],
    marginTop: theme.spacing[3],
    paddingTop: theme.spacing[3],
    borderTop: `1px solid ${theme.neutral[200]}`,
  };

  return (
    <Card
      elevation={isHovered ? 3 : 1}
      style={cardContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={displayImg} alt={displayName} style={imageStyle} />
      <div style={contentStyle}>
        <div style={titleStyle}>{displayName}</div>
        
        <div style={{ display: 'flex', gap: theme.spacing[2], alignItems: 'center' }}>
          <span style={infoStyle}>Tipo:</span>
          <Badge label={displayType} color="secondary" size="small" />
        </div>

        <div style={{ display: 'flex', gap: theme.spacing[2], alignItems: 'center' }}>
          <span style={infoStyle}>Estado:</span>
          <Badge label={displayStatus} color={statusBadgeColor} size="small" />
        </div>

        {reserved && (
          <div style={infoStyle}>
            <span style={{ fontWeight: 500 }}>Reservado:</span> {reserved}
          </div>
        )}

        {/* Botones de Acción */}
        <div style={actionsContainerStyle}>
          <Button
            size="small"
            variant="contained"
            color="info"
            icon={<IconEdit size={16} color={theme.neutral.white} />}
            onClick={() => onEdit && onEdit(id)}
            style={{ flex: 1, gap: theme.spacing[1] }}
          >
            Modificar
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            icon={<IconTrash size={16} color={theme.neutral.white} />}
            onClick={() => onDelete && onDelete(id)}
            style={{ flex: 1, gap: theme.spacing[1] }}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default CanchaCard;
