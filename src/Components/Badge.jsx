import React from 'react';
import { theme } from '../theme';

/**
 * Componente Badge reutilizable - Material Design
 * Propiedades:
 * - label: string
 * - color: 'primary' | 'secondary' | 'success' | 'error' | 'warning'
 * - variant: 'filled' | 'outlined'
 * - size: 'small' | 'medium'
 */
function Badge({ label, color = 'primary', variant = 'filled', size = 'medium' }) {
  const getColorStyles = () => {
    const colors = {
      primary: theme.primary,
      secondary: theme.secondary,
      success: theme.success,
      error: theme.error,
      warning: theme.warning,
    };
    return colors[color] || colors.primary;
  };

  const colorStyle = getColorStyles();

  const getSizeStyles = () => {
    const sizes = {
      small: {
        padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
        fontSize: '0.75rem',
      },
      medium: {
        padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
        fontSize: '0.875rem',
      },
    };
    return sizes[size] || sizes.medium;
  };

  const badgeStyle = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    borderRadius: theme.borderRadius.full,
    display: 'inline-block',
    whiteSpace: 'nowrap',
    ...getSizeStyles(),
    ...(variant === 'filled' ? {
      backgroundColor: colorStyle.main,
      color: colorStyle.text,
      border: 'none',
    } : {
      backgroundColor: colorStyle.light,
      color: colorStyle.main,
      border: `1px solid ${colorStyle.main}`,
    }),
  };

  return <span style={badgeStyle}>{label}</span>;
}

export default Badge;
