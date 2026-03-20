# Campus Reserve API - Backend

API REST de Spring Boot para gestión de reserva de instalaciones deportivas del campus.

## Requisitos

- Java 17 o superior
- Maven 3.8.0 o superior
- MySQL 8.0
- Git

## Configuración

### 1. Base de datos

Crear base de datos MySQL:
```sql
CREATE DATABASE campus_reserve;
```

### 2. Configurar application.properties

El archivo `src/main/resources/application.properties` contiene la configuración de conexión:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/campus_reserve
spring.datasource.username=ADMIN
spring.datasource.password=SanShaggyTadeo123
```

## Instalación y Ejecución

### Clonar el repositorio
```bash
git clone https://github.com/ErnestoDof23/Integradorall.git
cd backend
```

### Compilar el proyecto
```bash
mvn clean compile
```

### Ejecutar la aplicación
```bash
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080/api`

## API Endpoints

### Autenticación
- **POST** `/api/auth/login` - Iniciar sesión

### Instalaciones
- **GET** `/api/instalaciones` - Listar todas las instalaciones
- **GET** `/api/instalaciones/{id}` - Obtener instalación por ID
- **POST** `/api/instalaciones` - Crear nueva instalación
- **PUT** `/api/instalaciones/{id}` - Actualizar instalación
- **DELETE** `/api/instalaciones/{id}` - Eliminar instalación

### Usuarios
- **GET** `/api/usuarios` - Listar todos los usuarios
- **GET** `/api/usuarios/{id}` - Obtener usuario por ID
- **POST** `/api/usuarios` - Crear nuevo usuario
- **PUT** `/api/usuarios/{id}` - Actualizar usuario
- **DELETE** `/api/usuarios/{id}` - Eliminar usuario

## Estructura del Proyecto

```
src/main/java/com/integradora/campusreserve/
├── config/              # Configuraciones (SecurityConfig)
├── controller/          # Controladores REST
├── dto/                 # Data Transfer Objects
├── entity/              # Entidades JPA
├── exception/           # Excepciones personalizadas
├── repository/          # Interfaces de acceso a datos
├── security/            # Utilidades de seguridad JWT
├── service/             # Lógica de negocio
└── CampusReserveApplication.java  # Clase principal
```

## Entidades y Relaciones

### Diagrama ER (Entidad-Relación)

```
Rol (1:N) Usuario
Usuario (1:N) Reservacion
Instalacion (1:N) Horario
Horario (1:N) Reservacion
```

- **Rol**: Define los roles de usuario (Admin, Usuario, etc.)
- **Usuario**: Usuarios del sistema con relación N:1 a Rol
- **Instalacion**: Instalaciones disponibles para reservar
- **Horario**: Horarios disponibles de cada instalación (1:N)
- **Reservacion**: Reservaciones realizadas por usuarios (N:1 a Usuario, N:1 a Horario)

## Tecnologías

- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- MySQL Connector
- JWT (JSON Web Tokens)
- Lombok
- Maven

## Logs

Los logs de la aplicación se guardan en `logs/` y también se muestran en consola.

## Documentación Adicional

Ver archivo `../INTEGRADORA_DOCUMENTACION.md` para información sobre el proyecto integrador.
