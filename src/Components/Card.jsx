import React from 'react';
import { theme } from '../theme';

/**
 * Componente Card reutilizable - Material Design
 * Propiedades:
 * - children: ReactNode
 * - title: string
 * - subtitle: string
 * - elevation: number (0-5)
 * - padding: string
 * - onClick: function
 * - hoverable: boolean
 */
function Card({
  children,
  title,
  subtitle,
  elevation = 1,
  padding = theme.spacing[6],
  onClick,
  hoverable = false,
  style: customStyle,
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  const cardStyle = {
    backgroundColor: theme.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding,
    boxShadow: theme.shadows[elevation],
    transition: theme.transitions.fast,
    cursor: hoverable ? 'pointer' : 'default',
    transform: isHovered && hoverable ? 'translateY(-4px)' : 'translateY(0)',
    ...customStyle,
  };

  const titleStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.h4,
    color: theme.neutral[900],
    marginBottom: subtitle ? theme.spacing[1] : 0,
  };

  const subtitleStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body2,
    color: theme.neutral[600],
    marginBottom: children ? theme.spacing[3] : 0,
  };

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={() => hoverable && setIsHovered(true)}
      onMouseLeave={() => hoverable && setIsHovered(false)}
    >
      {title && <div style={titleStyle}>{title}</div>}
      {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
      {children && children}
    </div>
  );
}

export default Card;
