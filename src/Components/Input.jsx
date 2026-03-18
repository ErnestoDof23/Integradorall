import React from 'react';
import { theme } from '../theme';

/**
 * Componente Input reutilizable - Material Design
 * Propiedades:
 * - label: string
 * - value: string
 * - onChange: function
 * - type: 'text' | 'email' | 'password' | 'number' etc
 * - placeholder: string
 * - disabled: boolean
 * - error: boolean
 * - helperText: string
 * - required: boolean
 * - icon: ReactNode
 * - fullWidth: boolean
 */
function Input({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  disabled = false,
  error = false,
  helperText = '',
  required = false,
  icon,
  fullWidth = false,
  showPasswordToggle = false,
  onPasswordToggle,
  showPassword = false,
}) {
  const [isFocused, setIsFocused] = React.useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[1],
    width: fullWidth ? '100%' : 'auto',
    marginBottom: theme.spacing[3],
  };

  const labelStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body2,
    fontWeight: 500,
    color: error ? theme.error.main : theme.neutral[700],
  };

  const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[2],
  };

  const inputStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.body1,
    width: fullWidth ? '100%' : '100%',
    padding: `${theme.spacing[3]} ${theme.spacing[3]}`,
    paddingRight: (icon || showPasswordToggle) ? theme.spacing[10] : theme.spacing[3],
    border: `2px solid ${error ? theme.error.main : isFocused ? theme.primary.main : theme.neutral[300]}`,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: disabled ? theme.neutral[100] : theme.neutral.white,
    color: disabled ? theme.neutral[500] : theme.neutral[900],
    transition: theme.transitions.fast,
    outline: 'none',
    boxShadow: isFocused ? `0 0 0 3px ${theme.primary.lighter}` : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',

    '&::placeholder': {
      color: theme.neutral[400],
    },
  };

  const iconStyle = {
    position: 'absolute',
    right: theme.spacing[3],
    display: 'flex',
    alignItems: 'center',
    color: theme.neutral[500],
  };

  const helperTextStyle = {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.caption,
    color: error ? theme.error.main : theme.neutral[600],
    marginTop: theme.spacing[1],
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: theme.error.main }}>*</span>}
        </label>
      )}
      <div style={inputWrapperStyle}>
        <input
          type={showPasswordToggle && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyle}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onPasswordToggle}
            style={{
              position: 'absolute',
              right: theme.spacing[3],
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme.neutral[600],
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              width: '24px',
              height: '24px',
            }}
          >
            {showPassword ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.1 18.1 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.1 18.1 0 0 1-2.26 3.74" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>
      {helperText && <div style={helperTextStyle}>{helperText}</div>}
    </div>
  );
}

export default Input;
