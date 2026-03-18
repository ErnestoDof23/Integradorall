import React from 'react';
import { theme } from '../theme';

/**
 * Componente Table reutilizable - Material Design
 * Propiedades:
 * - headers: array de strings o objetos { key, label }
 * - rows: array de objetos
 * - onRowClick: function
 * - actions: array de acciones por fila
 */
function Table({ headers, rows, onRowClick, actions, striped = true }) {
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.neutral.white,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    boxShadow: theme.shadows[1],
  };

  const headerStyle = {
    backgroundColor: theme.primary.main,
    color: theme.primary.text,
    padding: theme.spacing[3],
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const getRowStyle = (index) => ({
    backgroundColor: striped && index % 2 === 1 ? theme.neutral[50] : theme.neutral.white,
    borderTop: `1px solid ${theme.neutral[200]}`,
    transition: theme.transitions.fast,
    cursor: onRowClick ? 'pointer' : 'default',
    '&:hover': {
      backgroundColor: onRowClick ? theme.neutral[100] : undefined,
    },
  });

  const cellStyle = {
    padding: theme.spacing[3],
    textAlign: 'left',
    fontSize: '0.95rem',
    color: theme.neutral[700],
  };

  const actionCellStyle = {
    ...cellStyle,
    display: 'flex',
    gap: theme.spacing[2],
    alignItems: 'center',
  };

  return (
    <div style={{ overflowX: 'auto', borderRadius: theme.borderRadius.lg }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} style={headerStyle}>
                {typeof header === 'string' ? header : header.label}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th style={headerStyle}>Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              style={getRowStyle(rowIdx)}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {headers.map((header, colIdx) => {
                const key = typeof header === 'string' ? header : header.key;
                return (
                  <td key={colIdx} style={cellStyle}>
                    {row[key]}
                  </td>
                );
              })}
              {actions && actions.length > 0 && (
                <td style={actionCellStyle}>
                  {actions.map((action, actionIdx) => (
                    <button
                      key={actionIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.handler(row);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: action.color || theme.primary.main,
                        fontSize: '0.9rem',
                        padding: 0,
                        transition: theme.transitions.fast,
                        '&:hover': {
                          opacity: 0.7,
                        },
                      }}
                      title={action.label}
                    >
                      {action.icon || action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
