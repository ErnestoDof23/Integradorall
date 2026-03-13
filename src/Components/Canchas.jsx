import React from 'react';
import CanchaCard from './CanchaCard';

// This component displays the list of canchas. Data is currently hardcoded,
// but in a real app it would be fetched from the backend and stored in state
// or passed down via props.

// load images via import instead of require for clarity
import imgBasket from '../assets/basket.jpeg';
import imgFut7 from '../assets/fut7.jpeg';
import imgFut from '../assets/fut.jpg';
import imgVoley from '../assets/voley.jpeg';
import imgPiscina from '../assets/piscina.jpeg';
import imgAuditorio from '../assets/auditorio.jpg';

function Canchas() {
  const canchasList = [
    { name: 'Basketball', img: imgBasket, status: 'Activa', reserved: '9am - 10am' },
    { name: 'Football 7', img: imgFut7, status: 'Activa', reserved: '9am - 10am' },
    { name: 'Football', img: imgFut, status: 'Activa', reserved: '9am - 10am' },
    { name: 'Volleyball', img: imgVoley, status: 'Inactiva' },
    { name: 'Piscina', img: imgPiscina, status: 'Activa', reserved: '9am - 10am' },
    { name: 'Auditorio', img: imgAuditorio, status: 'Inactiva' },
  ];

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))',
    gap: '24px',
  };

  return (
    <>
      <h2>Canchas</h2>
      <div style={gridStyle}>
        {canchasList.map((c, idx) => (
          <CanchaCard key={idx} {...c} />
        ))}
      </div>
    </>
  );
}

export default Canchas;
