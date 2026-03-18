import React from 'react';
import { theme } from '../theme';

/**
 * Componente Button reutilizable - Material Design
 * Propiedades:
 * - text: string (contenido del botón)
 * - action: function (manejador de click)
 * - variant: 'contained' | 'outlined' | 'text' (por defecto: 'contained')
 * - color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' (por defecto: 'primary')
 * - size: 'small' | 'medium' | 'large' (por defecto: 'medium')
 * - disabled: boolean
 * - fullWidth: boolean
 * - icon: ReactNode
 * - type: 'button' | 'submit' | 'reset'
 */
function Button({
  text,
  label,
  action,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  icon,
  type = 'button',
  children,
  style: customStyle,
  onClick,
}) {
  const displayText = text || label || children;
  const getColorStyles = () => {
    // Si es un color hexadecimal, usarlo directamente
    if (color && color.startsWith('#')) {
      return {
        main: color,
        dark: color,
        text: '#fff',
        light: color,
      };
    }
    const colors = {
      primary: theme.primary,
      secondary: theme.secondary,
      success: theme.success,
      error: theme.error,
      warning: theme.warning,
      info: theme.info,
    };
    return colors[color] || colors.primary;
  };

  const colorStyle = getColorStyles();

  const getSizeStyles = () => {
    const sizes = {
      small: {
        padding: `${theme.spacing[1]} ${theme.spacing[2]}`,
        fontSize: '0.75rem',
        minHeight: '28px',
      },
      medium: {
        padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
        fontSize: '0.875rem',
        minHeight: '36px',
      },
      large: {
        padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
        fontSize: '1rem',
        minHeight: '44px',
      },
    };
    return sizes[size] || sizes.medium;
  };

  const getVariantStyles = () => {
    const variants = {
      contained: {
        backgroundColor: colorStyle.main,
        color: colorStyle.text,
        border: `none`,
        boxShadow: theme.shadows[2],
        '&:hover': {
          backgroundColor: colorStyle.dark,
          boxShadow: theme.shadows[3],
        },
      },
      outlined: {
        backgroundColor: 'transparent',
        color: colorStyle.main,
        border: `2px solid ${colorStyle.main}`,
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: colorStyle.main,
          color: colorStyle.text,
        },
      },
      text: {
        backgroundColor: 'transparent',
        color: colorStyle.main,
        border: 'none',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: colorStyle.light,
        },
      },
    };
    return variants[variant] || variants.contained;
  };

  const baseStyle = {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    letterSpacing: '0.46px',
    borderRadius: theme.borderRadius.lg,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: theme.transitions.fast,
    border: 'none',
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    ...getSizeStyles(),
    ...getVariantStyles(),
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const finalStyle = {
    ...baseStyle,
    ...(isHovered && !disabled && {
      boxShadow: theme.shadows[3],
    }),
    ...customStyle,
  };

  return (
    <button
      type={type}
      onClick={onClick || action}
      disabled={disabled}
      style={finalStyle}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon && <span>{icon}</span>}
      {displayText}
    </button>
  );
}

export default Button;