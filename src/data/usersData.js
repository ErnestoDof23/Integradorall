// initial users dataset (hardcoded for now)
// fields: id, email, password, fullName, role, blocked
const users = [
  { id: 1, email: 'alan.salgado@utez.edu.mx', password: 'pass123', fullName: 'Alan Salgado Arias', role: 'Usuario', blocked: false },
  { id: 2, email: '20233tn194@utez.edu.mx', password: 'ernestoedf23', fullName: 'Ernesto Dominguez Figueroa', role: 'Administrador', blocked: false },
  { id: 3, email: 'izabella.campos@utez.edu.mx', password: 'pass123', fullName: 'Izabella Campos Nazario', role: 'Usuario', blocked: false },
  { id: 4, email: 'jacqueline.pilgram@utez.edu.mx', password: 'pass123', fullName: 'Jacqueline Pilgram Montes de Oca', role: 'Usuario', blocked: false },
  { id: 5, email: 'jorge.cano@utez.edu.mx', password: 'pass123', fullName: 'Jorge Emmanuel Cano Landa', role: 'Usuario', blocked: false },
  // keep legacy login address (JazminR...) for compatibility with earlier tests
  { id: 6, email: 'JazminR@utez.edu.mx', password: 'admi123', fullName: 'Jazmin Rogel Arizmendi', role: 'Administrador', blocked: false },
  { id: 7, email: 'santiago.acosta@utez.edu.mx', password: 'pass123', fullName: 'Santiago Acosta Sotelo', role: 'Usuario', blocked: false },
  { id: 8, email: 'luis.perez@utez.edu.mx', password: 'pass123', fullName: 'Luis Fernando Pérez', role: 'Usuario', blocked: false },
  { id: 9, email: 'maria.ortega@utez.edu.mx', password: 'pass123', fullName: 'María Luisa Ortega', role: 'Usuario', blocked: false },
  { id: 10, email: 'carlos.mejia@utez.edu.mx', password: 'pass123', fullName: 'Carlos Eduardo Mejía', role: 'Usuario', blocked: false },
  { id: 11, email: 'ana.ramirez@utez.edu.mx', password: 'pass123', fullName: 'Ana Sofía Ramírez', role: 'Usuario', blocked: false },
  { id: 12, email: 'miguel.torres@utez.edu.mx', password: 'pass123', fullName: 'Miguel Ángel Torres', role: 'Usuario', blocked: false },
  { id: 13, email: 'valeria.gonzalez@utez.edu.mx', password: 'pass123', fullName: 'Valeria González', role: 'Usuario', blocked: false },
  { id: 14, email: 'ricardo.hernandez@utez.edu.mx', password: 'pass123', fullName: 'Ricardo Hernández', role: 'Usuario', blocked: false },
  { id: 15, email: 'paola.martinez@utez.edu.mx', password: 'pass123', fullName: 'Paola Martínez', role: 'Usuario', blocked: false },
  { id: 16, email: 'diego.valdez@utez.edu.mx', password: 'pass123', fullName: 'Diego Valdez', role: 'Usuario', blocked: false },
  { id: 17, email: 'laura.cruz@utez.edu.mx', password: 'pass123', fullName: 'Laura Isabel Cruz', role: 'Usuario', blocked: false },
  { id: 18, email: 'jesus.reyes@utez.edu.mx', password: 'pass123', fullName: 'Jesús Antonio Reyes', role: 'Usuario', blocked: false },
];

export default users;
