// Material Design Color Palette & Typography System
export const theme = {
  // Primary colors - Brand colors (Green from original design)
  primary: {
    main: '#28d463',      // Primary green
    light: '#5ADA8C',     // Lighter variant
    lighter: '#8CE5A8',   // Even lighter
    dark: '#1e9a3f',      // Darker variant
    text: '#FFFFFF',      // Text on primary
  },

  // Secondary colors - Accent colors
  secondary: {
    main: '#2D3A2E',      // Dark green from logo
    light: '#4A5950',     // Lighter variant
    dark: '#1A2219',      // Darker variant
    text: '#FFFFFF',      // Text on secondary
  },

  // Status colors
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
    text: '#FFFFFF',
    background: '#E8F5E9',
  },

  error: {
    main: '#F44336',
    light: '#EF5350',
    dark: '#D32F2F',
    text: '#FFFFFF',
    background: '#FFEBEE',
  },

  warning: {
    main: '#FF9800',
    light: '#FFB74D',
    dark: '#F57C00',
    text: '#FFFFFF',
    background: '#FFF3E0',
  },

  info: {
    main: '#2196F3',
    light: '#64B5F6',
    dark: '#1976D2',
    text: '#FFFFFF',
    background: '#E3F2FD',
  },

  // Neutral colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Typography
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    
    // Display styles (Largest)
    display: {
      fontSize: '2.125rem',      // 34px
      fontWeight: 500,
      lineHeight: 1.235,
      letterSpacing: 0,
    },

    // Heading styles
    h1: {
      fontSize: '1.875rem',      // 30px
      fontWeight: 500,
      lineHeight: 1.2,
      letterSpacing: 0,
    },

    h2: {
      fontSize: '1.5rem',        // 24px
      fontWeight: 500,
      lineHeight: 1.334,
      letterSpacing: 0,
    },

    h3: {
      fontSize: '1.25rem',       // 20px
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: 0,
    },

    h4: {
      fontSize: '1rem',          // 16px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: 0,
    },

    h5: {
      fontSize: '0.875rem',      // 14px
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: 0,
    },

    h6: {
      fontSize: '0.75rem',       // 12px
      fontWeight: 500,
      lineHeight: 1.66,
      letterSpacing: 0.4,
    },

    // Body styles
    body1: {
      fontSize: '1rem',          // 16px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: 0.5,
    },

    body2: {
      fontSize: '0.875rem',      // 14px
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: 0.25,
    },

    // Button text
    button: {
      fontSize: '0.875rem',      // 14px
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
    },

    // Caption
    caption: {
      fontSize: '0.75rem',       // 12px
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: 0.4,
    },

    // Overline
    overline: {
      fontSize: '0.75rem',       // 12px
      fontWeight: 500,
      lineHeight: 2.66,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
  },

  // Spacing system (8px base unit)
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
  },

  // Border radius
  borderRadius: {
    none: '0px',
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '12px',
    full: '999px',
  },

  // Shadows (Material Design elevation)
  shadows: {
    none: 'none',
    0: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
    1: '0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 2px 0px rgba(0, 0, 0, 0.24)',
    2: '0px 3px 6px 0px rgba(0, 0, 0, 0.15), 0px 2px 4px 0px rgba(0, 0, 0, 0.12)',
    3: '0px 10px 20px 0px rgba(0, 0, 0, 0.15), 0px 3px 6px 0px rgba(0, 0, 0, 0.10)',
    4: '0px 15px 25px 0px rgba(0, 0, 0, 0.15), 0px 5px 10px 0px rgba(0, 0, 0, 0.05)',
    5: '0px 20px 40px 0px rgba(0, 0, 0, 0.2)',
  },

  // Transitions
  transitions: {
    fast: '0.15s ease-in-out',
    base: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },

  // Breakpoints
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1264px',
    xl: '1904px',
  },
};

// Utility functions
export const getTypographyStyle = (variant, theme_) => {
  return {
    fontFamily: theme_.typography.fontFamily,
    ...theme_.typography[variant],
  };
};

export const getSpacingValue = (multiplier, theme_) => {
  return multiplier * 8; // 8px base unit
};
