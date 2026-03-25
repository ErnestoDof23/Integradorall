# Campus Reserve - Sistema de Gestión de Instalaciones Deportivas

Sistema integral de reserva de instalaciones deportivas del campus universitario, desarrollado con React 18 (frontend), Spring Boot 3.2 (backend) y MySQL 8.0 (base de datos).

## 📋 Descripción del Proyecto

Campus Reserve es una aplicación web que permite a estudiantes y personal del campus consultar disponibilidad, realizar reservaciones de instalaciones deportivas, y a administradores gestionar espacios, horarios y reservaciones.

## 🚀 Características Principales

- **Autenticación segura** con JWT tokens (24 horas de expiración)
- **CRUD completo** de instalaciones, usuarios y reservaciones
- **Interfaz responsiva** con Material Design System personalizado
- **Panel administrativo** para gestión de espacios
- **Notificaciones** con Sweet Alert 2
- **Paginación** inteligente de listados
- **Validación** de datos en frontend y backend
- **Base de datos relacional** con 5 entidades y relaciones JPA

## 📁 Estructura del Proyecto

```
Integradora/
├── frontend/                    # Aplicación React + Vite
│   ├── src/
│   │   ├── Components/         # Componentes reutilizables
│   │   ├── services/           # Servicios API (apiService, authService)
│   │   ├── theme.js            # Sistema de diseño
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # API Spring Boot
│   ├── src/main/java/
│   │   └── com/integradora/campusreserve/
│   │       ├── controller/     # Endpoints REST
│   │       ├── service/        # Lógica de negocio
│   │       ├── entity/         # Entidades JPA (5)
│   │       ├── repository/     # Acceso a datos
│   │       ├── dto/            # Transfer Objects
│   │       ├── security/       # JWT Provider
│   │       └── ...
│   ├── pom.xml
│   └── README.md
│
└── INTEGRADORA_DOCUMENTACION.md  # Documentación completa
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 18
- Vite
- JavaScript ES6+
- Fetch API
- Sweet Alert 2
- LocalStorage

### Backend
- Spring Boot 3.2.0
- Java 17
- Spring Data JPA
- Spring Security
- JWT
- MySQL 8.0

### DevOps
- Git/GitHub
- Maven
- npm
- Docker (opcional)

## 📊 Relaciones de Base de Datos

El proyecto implementa 4 relaciones JPA (Uno a Muchos):

```
Rol (1:N) Usuario
Usuario (1:N) Reservacion
Instalacion (1:N) Horario
Horario (1:N) Reservacion
```

Todas son relaciones **bidireccionales** con `mappedBy` en el lado propietario.

## 🔧 Instalación

### Requisitos Previos
- Node.js 16+
- Java 17+
- Maven 3.8.0+
- MySQL 8.0+
- Git

### Pasos de Instalación

1. **Clonar repositorio**
   ```bash
   git clone https://github.com/ErnestoDof23/Integradorall.git
   cd Integradorall
   ```

2. **Configurar Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   # Accesible en http://localhost:5174
   ```

3. **Configurar Backend**
   ```bash
   cd ../backend
   mvn clean compile
   mvn spring-boot:run
   # API en http://localhost:8080/api
   ```

4. **Base de Datos**
   ```bash
   mysql -u ADMIN -p
   # Contraseña: SanShaggyTadeo123
   CREATE DATABASE campus_reserve;
   ```

   Las tablas se crean automáticamente con Hibernate.

## 📡 API Endpoints Principales

### Autenticación
- `POST /api/auth/login` - Login usuario

### Instalaciones
- `GET /api/instalaciones` - Listar todas
- `POST /api/instalaciones` - Crear (Admin)
- `PUT /api/instalaciones/{id}` - Editar (Admin)
- `DELETE /api/instalaciones/{id}` - Eliminar (Admin)

### Usuarios
- `GET /api/usuarios` - Listar todos
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/{id}` - Editar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario

### Horarios
- `GET /api/horarios` - Listar horarios
- `POST /api/horarios` - Crear horario

### Reservaciones
- `GET /api/reservaciones` - Listar reservaciones
- `POST /api/reservaciones` - Crear reservación

**Todas las requests requieren Authorization header con JWT:**
```
Authorization: Bearer {token}
```

## 🔐 Autenticación

- Método: JWT (JSON Web Tokens)
- Expiración: 24 horas
- Almacenamiento: localStorage (frontend)
- Algoritmo: HS512
- Contraseña: Hasheada con BCrypt

## 📚 Documentación Adicional

- `INTEGRADORA_DOCUMENTACION.md` - Documentación técnica completa
- `PROYECTO_INTEGRADOR_TEXTO.txt` - Resumen para proyecto integrador
- `frontend/README.md` - Instrucciones frontend
- `backend/README.md` - Instrucciones backend

## 👥 Equipo de Desarrollo

- **Web Developer**: Ernesto Dominguez (@ErnestoDof23)
- **Mobile Team**: [Nombres de desarrolladores móviles]
- **Database Admin**: [Nombre del administrador BD]

## 🐛 Problemas Comunes

### Puerto 5174 en uso (Frontend)
```bash
npm run dev -- --port 3000
```

### Puerto 8080 en uso (Backend)
Cambiar en `application.properties`:
```properties
server.port=8081
```

### Error de conexión a MySQL
Verificar que MySQL está corriendo y las credenciales son correctas:
```properties
spring.datasource.username=ADMIN
spring.datasource.password=SanShaggyTadeo123
spring.datasource.url=jdbc:mysql://localhost:3306/campus_reserve
```

### CORS Error
Verificar que `localhost:5174` está en `allowedOrigins` en `CampusReserveApplication.java`

## 📝 Criterios de Entrega - Proyecto Integrador

✅ **Diagrama Entidad-Relación**: Disponible en INTEGRADORA_DOCUMENTACION.md
✅ **Link del Repositorio**: https://github.com/ErnestoDof23/Integradorall
✅ **Descripción de Lógica**: PROYECTO_INTEGRADOR_TEXTO.txt
✅ **Comentario de Equipo**: Todos los integrantes deben comentar en la tarea

## 📧 Contacto y Soporte

- **Email**: ernestodof23@gmail.com
- **GitHub**: https://github.com/ErnestoDof23/Integradorall
- **Issues**: Usar GitHub Issues para reportar problemas

## 📄 Licencia

Proyecto educativo - Universidad [Tu Universidad]

## ✨ Estado del Proyecto

- **Versión**: 1.0.0
- **Estado**: Completado y listo para evaluación
- **Última actualización**: 18 de marzo de 2026
- **Rama principal**: main
- **Rama de desarrollo**: Ernesto

---

Desarrollado con ❤️ por Ernesto Dominguez
