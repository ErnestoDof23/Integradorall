import React from 'react';
import Card from './Card';
import Button from './Button';
import Badge from './Badge';
import { theme } from '../theme';
import { IconLock, IconUnlock, IconUserCheck, IconUser } from './Icons';

/**
 * UserCard - Tarjeta para mostrar información de un usuario
 * Props:
 * - id: ID del usuario
 * - nombre: nombre completo
 * - rol: 'Usuario' | 'Administrador' (puede ser string o objeto con nombre)
 * - correoInstitucional: email del usuario
 * - bloqueado: boolean
 * - img: URL de la imagen del usuario
 * - onToggleBlock: callback para bloquear/desbloquear
 * - onToggleAdmin: callback para cambiar rol
 */
function UserCard({
  id,
  nombre,
  name,
  rol,
  role,
  correoInstitucional,
  email,
  bloqueado,
  blocked,
  onToggleBlock,
  onToggleAdmin,
  img,
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Mapear campos del backend al formato de componente
  const displayName = nombre || name || 'Sin nombre';
  const displayRol = (typeof rol === 'object' ? rol?.nombre : rol) || role || 'Usuario';
  const displayEmail = correoInstitucional || email || '';
  const displayBlocked = bloqueado || blocked || false;

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing[4],
    transition: theme.transitions.fast,
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
  };

  const idStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.caption,
    color: theme.neutral[500],
    marginBottom: theme.spacing[2],
  };

  const avatarStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover',
    background: theme.neutral[200],
    marginBottom: theme.spacing[3],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const nameStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h5,
    color: theme.neutral[900],
    marginBottom: theme.spacing[1],
  };

  const infoRowStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing[2],
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  };

  const labelStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body2,
    color: theme.neutral[600],
    fontWeight: 500,
  };

  const buttonsContainerStyle = {
    display: 'flex',
    gap: theme.spacing[2],
    width: '100%',
    marginTop: theme.spacing[3],
  };

  const statusColor = displayBlocked ? 'error' : 'success';
  const statusLabel = displayBlocked ? 'Bloqueado' : 'Activo';

  return (
    <Card
      elevation={isHovered ? 3 : 1}
      style={cardContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={idStyle}>ID: {id}</div>
      
      {img ? (
        <img src={img} alt={displayName} style={avatarStyle} />
      ) : (
        <div style={avatarStyle}>
          <IconUser size={40} color={theme.primary.main} />
        </div>
      )}
      
      <div style={nameStyle}>{displayName}</div>

      <div style={infoRowStyle}>
        <span style={labelStyle}>Email:</span>
        <span style={{ ...labelStyle, color: theme.neutral[900], fontWeight: 500, fontSize: '12px' }}>{displayEmail}</span>
      </div>

      <div style={infoRowStyle}>
        <span style={labelStyle}>Rol:</span>
        <span style={{ ...labelStyle, color: theme.neutral[900], fontWeight: 500 }}>{displayRol}</span>
      </div>

      <div style={infoRowStyle}>
        <span style={labelStyle}>Estado:</span>
        <Badge label={statusLabel} color={statusColor} size="small" />
      </div>

      <div style={buttonsContainerStyle}>
        <Button
          text={displayBlocked ? 'Desbloquear' : 'Bloquear'}
          action={onToggleBlock}
          color={displayBlocked ? 'success' : 'error'}
          variant="contained"
          size="small"
          fullWidth
          icon={displayBlocked ? <IconUnlock size={16} color="white" /> : <IconLock size={16} color="white" />}
        />
        <Button
          text={displayRol === 'Administrador' ? 'Quitar Admin' : 'Admin'}
          action={onToggleAdmin}
          color="#2196F3"
          variant="contained"
          size="small"
          disabled={disableAdmin}
          fullWidth
          icon={<IconUserCheck size={16} color="white" />}
        />
      </div>
    </Card>
  );
}

export default UserCard;
