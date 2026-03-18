// Datos de canchas - será reemplazado por API en el futuro
import imgBasket from '../assets/basket.jpeg';
import imgFut7 from '../assets/fut7.jpeg';
import imgFut from '../assets/fut.jpg';
import imgVoley from '../assets/voley.jpeg';
import imgPiscina from '../assets/piscina.jpeg';
import imgAuditorio from '../assets/auditorio.jpg';

const canchas = [
  { id: 1, name: 'Basketball', img: imgBasket, type: 'Cancha', status: 'Reservadas', reserved: '9am - 10am' },
  { id: 2, name: 'Football 7', img: imgFut7, type: 'Cancha', status: 'Reservadas', reserved: '9am - 10am' },
  { id: 3, name: 'Football', img: imgFut, type: 'Cancha', status: 'Reservadas', reserved: '9am - 10am' },
  { id: 4, name: 'Volleyball', img: imgVoley, type: 'Cancha', status: 'Disponibles' },
  { id: 5, name: 'Piscina', img: imgPiscina, type: 'Cancha', status: 'Reservadas', reserved: '9am - 10am' },
  { id: 6, name: 'Auditorio', img: imgAuditorio, type: 'Auditorio', status: 'Disponibles' },
];

export default canchas;
