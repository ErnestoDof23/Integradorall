import React from 'react';

// card for a single user
// props:
//   id (number)
//   name (string)
//   role ("Usuario"|"Administrador")
//   blocked (boolean)
//   onToggleBlock()
//   onToggleAdmin()
//   img (string url)

function UserCard({ id, name, role, blocked, onToggleBlock, onToggleAdmin, img, disableAdmin, disableBlock }) {
  const cardStyle = {
    background: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };
  const headerStyle = {
    padding: '12px',
    fontWeight: 600,
    textAlign: 'center',
  };
  const imgStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    background: '#f0f0f0',
    display: 'block',
    margin: '0 auto',
    borderRadius: '50%',
  };
  const footerStyle = {
    padding: '12px',
    textAlign: 'left',
    fontSize: '0.95rem',
    flex: 1,
  };
  const buttonRow = {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
    justifyContent: 'center',
  };
  const buttonStyle = {
    padding: '6px 10px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.85rem',
  };

  const [hoverBlock, setHoverBlock] = React.useState(false);
  const [hoverAdmin, setHoverAdmin] = React.useState(false);
  // `disableBlock` is received as a prop; when true the block button is
  // disabled to prevent locking important accounts.
  // (no local default needed, prop will default undefined -> falsy)

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>ID: {id}</div>
      <img src={img} alt="usuario" style={imgStyle} />
      <div style={footerStyle}>
        <div>Rol : {role}</div>
        <div>Nombre: {name}</div>
        <div style={buttonRow}>
          <button
            onClick={onToggleBlock}
            disabled={disableBlock}
            onMouseEnter={() => setHoverBlock(true)}
            onMouseLeave={() => setHoverBlock(false)}
            style={{
              ...buttonStyle,
              background: blocked
                ? hoverBlock
                  ? '#218838'
                  : '#28a745'
                : hoverBlock
                ? '#c82333'
                : '#dc3545',
              color: '#fff',
              opacity: disableBlock ? 0.6 : 1,
              cursor: disableBlock ? 'not-allowed' : 'pointer',
            }}
          >
            {blocked ? (
              <>
                {/* unlock icon */}
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11 1a2 2 0 0 1 2 2v2h-1V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2H3V3a2 2 0 0 1 2-2h6z" />
                  <path d="M4 7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H4zm4 1a1 1 0 0 1 1 1v1H7v-1a1 1 0 0 1 1-1z" />
                </svg>
                Desbloquear
              </>
            ) : (
              <>
                {/* lock icon */}
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a3 3 0 0 0-3 3v3H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-1V4a3 3 0 0 0-3-3zM5 4a3 3 0 1 1 6 0v3H5V4z"/>
                </svg>
                Bloquear
              </>
            )}
          </button>
          <button
            onClick={onToggleAdmin}
            disabled={disableAdmin}
            onMouseEnter={() => setHoverAdmin(true)}
            onMouseLeave={() => setHoverAdmin(false)}
            style={{
              ...buttonStyle,
              background: role === 'Administrador'
                ? hoverAdmin
                  ? '#5a6268'
                  : '#6c757d'
                : hoverAdmin
                ? '#0069d9'
                : '#007bff',
              color: '#fff',
              opacity: disableAdmin ? 0.6 : 1,
              cursor: disableAdmin ? 'not-allowed' : 'pointer',
            }}
          >
            {/* user icon */}
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            {role === 'Administrador' ? 'Quitar admin' : 'Añadir admin'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
