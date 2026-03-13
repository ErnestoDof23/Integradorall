import React from 'react';

// presentational card for a single cancha
// props:
//   name (string)
//   img (string url)
//   status ("Activa"|"Inactiva")
//   reserved (optional string)

function CanchaCard({ name, img, status, reserved }) {
  const cardStyle = {
    background: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
  };
  const headerStyle = {
    padding: '12px',
    fontWeight: 600,
    textAlign: 'center',
  };
  const imgStyle = {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
  };
  const footerStyle = {
    padding: '12px',
    textAlign: 'left',
    fontSize: '0.95rem',
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>{name}</div>
      <img src={img} alt={name} style={imgStyle} />
      <div style={footerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Estado:</span>
          <span>{status}</span>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: status === 'Activa' ? '#28a745' : '#dc3545',
            }}
          />
        </div>
        {reserved && <div>Reservado: {reserved}</div>}
      </div>
    </div>
  );
}

export default CanchaCard;
