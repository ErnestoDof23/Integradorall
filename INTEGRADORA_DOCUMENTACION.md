DOCUMENTACIÓN DEL PROYECTO INTEGRADOR
=====================================

TÍTULO DEL PROYECTO
Sistema de Gestión y Reserva de Instalaciones Deportivas del Campus

DESCRIPCIÓN DEL PROYECTO
Este proyecto integrador consiste en el desarrollo de una aplicación web y móvil para la gestión y reserva de instalaciones deportivas disponibles en el campus universitario. El sistema permite a los estudiantes y personal administrativo reservar espacios para actividades deportivas, con un control centralizado de disponibilidad, horarios y capacidad de las instalaciones.

OBJETIVO GENERAL
Crear un sistema integral de reserva de instalaciones que facilite la gestión eficiente de espacios deportivos, permitiendo a los usuarios visualizar disponibilidad, hacer reservas y a los administradores gestionar las instalaciones.

OBJETIVOS ESPECÍFICOS
1. Desarrollar una interfaz web responsiva y amigable para consultar y reservar instalaciones
2. Implementar un API REST escalable que permita integración con aplicaciones móviles
3. Gestionar roles de usuario y permisos de acceso
4. Mantener un control de horarios y disponibilidad de instalaciones
5. Registrar historial de reservaciones

ALCANCE DEL PROYECTO
- Módulo Web (React + Vite)
- API Backend (Spring Boot 3.2.0)
- Base de Datos (MySQL 8.0)
- Autenticación JWT
- Gestión de Instalaciones, Usuarios, Roles y Reservaciones

NO INCLUIDO EN ESTE ALCANCE
- Aplicaciones móviles nativas (será desarrollo futuro)
- Sistema de pagos
- Notificaciones en tiempo real
- Sistema de calificación

═══════════════════════════════════════════════════════════════════════════════

ARQUITECTURA DEL SISTEMA
════════════════════════

PATRÓN ARQUITECTÓNICO: Arquitectura en Capas (Layered Architecture)

CAPAS:
1. CAPA DE PRESENTACIÓN (Frontend)
   - React 18 con Vite
   - Componentes reutilizables
   - Material Design System
   - Gestión de estado con React Hooks

2. CAPA DE API (Backend)
   - Spring Boot 3.2.0
   - Controladores REST
   - Arquitectura de Servicios
   - Autenticación JWT

3. CAPA DE DATOS
   - Spring Data JPA
   - MySQL 8.0
   - Hibernate ORM

═══════════════════════════════════════════════════════════════════════════════

DIAGRAMA ENTIDAD-RELACIÓN (ER)
═══════════════════════════════

```
┌──────────────────┐
│      ROL         │
├──────────────────┤
│ id_rol (PK)      │
│ nombre           │
│ descripcion      │
└────────┬─────────┘
         │ 1:N
         │
┌────────▼─────────────────────┐
│      USUARIO                 │
├──────────────────────────────┤
│ id_usuario (PK)              │
│ nombre                       │
│ correo_institucional (UNIQUE)│
│ password                     │
│ activo                       │
│ fecha_creacion               │
│ id_rol (FK) ──► ROL         │
└──────────┬────────────────────┘
           │ 1:N
           │
    ┌──────▼──────────────┐
    │   RESERVACION       │
    ├─────────────────────┤
    │ id_reservacion (PK) │
    │ fecha_reserva       │
    │ estado              │
    │ descripcion         │
    │ id_usuario (FK) ──┐ │
    │ id_horario (FK) ┐ │ │
    └──────────────────┼─┼─┘
                   │   │
                   │   └─────────────────┐
                   │                     │
         ┌─────────▼──────────┐     ┌────▼──────────────────┐
         │     USUARIO        │     │     HORARIO           │
         ├────────────────────┤     ├───────────────────────┤
         │ id_usuario (PK)    │     │ id_horario (PK)       │
         │ ...                │     │ fecha                 │
         └────────────────────┘     │ hora_inicio           │
                                    │ hora_fin              │
                                    │ id_instalacion (FK)┐  │
                                    └────────────────────┼──┘
                                                        │
                                                        │
                                          ┌─────────────▼──────────────┐
                                          │    INSTALACION             │
                                          ├────────────────────────────┤
                                          │ id_instalacion (PK)        │
                                          │ nombre                     │
                                          │ tipo (ENUM)                │
                                          │ descripcion                │
                                          │ foto (LONGBLOB)            │
                                          │ estado (ENUM)              │
                                          │ capacidad                  │
                                          │ fecha_creacion             │
                                          └────────────────────────────┘
                                                    │ 1:N
                                                    │
                                          ┌─────────▼──────────┐
                                          │     HORARIO        │
                                          ├────────────────────┤
                                          │ id_horario (PK)    │
                                          │ fecha              │
                                          │ hora_inicio        │
                                          │ hora_fin           │
                                          │ id_instalacion(FK) │
                                          └────────────────────┘
```

RELACIONES DEFINIDAS:

1. ROL ◄──── 1:N ───► USUARIO
   - Un rol puede tener muchos usuarios
   - Un usuario pertenece a un solo rol
   - Cardinalidad: (1:N)
   - Tipo: Uno a Muchos
   - Bidireccional: Sí

2. USUARIO ◄──── 1:N ───► RESERVACION
   - Un usuario puede hacer muchas reservaciones
   - Una reservación pertenece a un usuario
   - Cardinalidad: (1:N)
   - Tipo: Uno a Muchos
   - Bidireccional: Sí

3. INSTALACION ◄──── 1:N ───► HORARIO
   - Una instalación tiene muchos horarios
   - Un horario pertenece a una instalación
   - Cardinalidad: (1:N)
   - Tipo: Uno a Muchos
   - Bidireccional: Sí

4. HORARIO ◄──── 1:N ───► RESERVACION
   - Un horario puede tener muchas reservaciones
   - Una reservación está asociada a un horario
   - Cardinalidad: (1:N)
   - Tipo: Uno a Muchos
   - Bidireccional: Sí

═══════════════════════════════════════════════════════════════════════════════

ENTIDADES Y RELACIONES CON NOTACIÓN JPA
════════════════════════════════════════

ENTIDAD: Rol
@Entity
@Table(name = "rol")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRol;
    
    private String nombre;
    private String descripcion;
    
    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL)
    private Set<Usuario> usuarios;
}

RELACIÓN: Rol → Usuario (1:N)
- Anotación: @OneToMany(mappedBy = "rol")
- Tipo: Uno a Muchos
- Cascada: CascadeType.ALL
- Fetch: LAZY


ENTIDAD: Usuario
@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;
    
    private String nombre;
    private String correoInstitucional;
    private String password;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_rol")
    private Rol rol;
    
    @OneToMany(mappedBy = "usuario")
    private Set<Reservacion> reservaciones;
}

RELACIONES:
- Usuario → Rol (N:1) @ManyToOne
- Usuario → Reservacion (1:N) @OneToMany


ENTIDAD: Instalacion
@Entity
@Table(name = "instalacion")
public class Instalacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idInstalacion;
    
    private String nombre;
    @Enumerated(EnumType.STRING)
    private TipoInstalacion tipo;
    
    private String descripcion;
    private byte[] foto;
    
    @Enumerated(EnumType.STRING)
    private EstadoInstalacion estado;
    
    @OneToMany(mappedBy = "instalacion")
    private Set<Horario> horarios;
}

RELACIÓN: Instalacion → Horario (1:N)
- Anotación: @OneToMany(mappedBy = "instalacion")
- Tipo: Uno a Muchos
- Fetch: LAZY


ENTIDAD: Horario
@Entity
@Table(name = "horario")
public class Horario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idHorario;
    
    private LocalDate fecha;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_instalacion")
    private Instalacion instalacion;
    
    @OneToMany(mappedBy = "horario")
    private Set<Reservacion> reservaciones;
}

RELACIONES:
- Horario → Instalacion (N:1) @ManyToOne
- Horario → Reservacion (1:N) @OneToMany


ENTIDAD: Reservacion
@Entity
@Table(name = "reservacion")
public class Reservacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idReservacion;
    
    private LocalDateTime fechaReserva;
    @Enumerated(EnumType.STRING)
    private EstadoReservacion estado;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_horario")
    private Horario horario;
}

RELACIONES:
- Reservacion → Usuario (N:1) @ManyToOne
- Reservacion → Horario (N:1) @ManyToOne

═══════════════════════════════════════════════════════════════════════════════

LÓGICA DE NEGOCIO
═════════════════

1. GESTIÓN DE ROLES Y USUARIOS
   - Existen tres roles principales: Administrador, Supervisor, Usuario
   - Cada usuario debe estar asociado a un rol
   - Solo Administradores pueden crear usuarios
   - Los usuarios se crean con una contraseña temporal

2. GESTIÓN DE INSTALACIONES
   - Las instalaciones pueden ser: Cancha, Auditorio, Gimnasio, Piscina
   - Las instalaciones tienen estado: Disponible, Reservada, Mantenimiento
   - Cada instalación tiene foto y descripción
   - Las instalaciones se activan al crear (estado: Disponible)

3. GESTIÓN DE HORARIOS
   - Cada instalación tiene múltiples horarios disponibles
   - Los horarios están definidos por fecha, hora inicio y hora fin
   - Un horario puede tener varias reservaciones
   - Solo se puede reservar en horarios disponibles

4. RESERVACIONES
   - Una reservación asocia un usuario a un horario específico
   - Los estados posibles: Pendiente, Confirmada, Cancelada, Completada
   - El usuario que hace la reservación queda registrado
   - La reservación se registra con fecha y hora

═══════════════════════════════════════════════════════════════════════════════

ESTRUCTURA DE CARPETAS DEL PROYECTO
════════════════════════════════════

Integradora/
├── frontend/                          # Aplicación React
│   ├── src/
│   │   ├── Components/               # Componentes React
│   │   │   ├── App.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── CanchaCard.jsx
│   │   │   ├── CanchaModal.jsx
│   │   │   ├── Canchas.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── UserCard.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Icons.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── Input.jsx
│   │   ├── services/                # Servicios API
│   │   │   ├── apiService.js       # Llamadas a API
│   │   │   └── authService.js      # Autenticación
│   │   ├── data/
│   │   │   └── usersData.js
│   │   ├── assets/                 # Imágenes y recursos
│   │   ├── theme.js                # Tema Material Design
│   │   ├── main.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/                          # API Spring Boot
│   ├── src/main/
│   │   ├── java/com/integradora/campusreserve/
│   │   │   ├── CampusReserveApplication.java
│   │   │   ├── config/              # Configuraciones
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/          # Controladores REST
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── InstalacionController.java
│   │   │   │   ├── UsuarioController.java
│   │   │   │   ├── HorarioController.java
│   │   │   │   └── ReservacionController.java
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   │   ├── LoginDTO.java
│   │   │   │   ├── AuthResponseDTO.java
│   │   │   │   ├── UsuarioDTO.java
│   │   │   │   ├── InstalacionDTO.java
│   │   │   │   ├── HorarioDTO.java
│   │   │   │   └── ReservacionDTO.java
│   │   │   ├── entity/              # Entidades JPA
│   │   │   │   ├── Rol.java
│   │   │   │   ├── Usuario.java
│   │   │   │   ├── Instalacion.java
│   │   │   │   ├── Horario.java
│   │   │   │   └── Reservacion.java
│   │   │   ├── exception/           # Excepciones personalizadas
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   └── GlobalExceptionHandler.java
│   │   │   ├── repository/          # Interfaces JPA Repository
│   │   │   │   ├── RolRepository.java
│   │   │   │   ├── UsuarioRepository.java
│   │   │   │   ├── InstalacionRepository.java
│   │   │   │   ├── HorarioRepository.java
│   │   │   │   └── ReservacionRepository.java
│   │   │   ├── security/            # Seguridad JWT
│   │   │   │   └── JwtTokenProvider.java
│   │   │   └── service/             # Servicios (lógica de negocio)
│   │   │       ├── AuthService.java
│   │   │       ├── UsuarioService.java
│   │   │       ├── InstalacionService.java
│   │   │       ├── HorarioService.java
│   │   │       └── ReservacionService.java
│   │   └── resources/
│   │       └── application.properties
│   ├── pom.xml                      # Dependencias Maven
│   ├── .gitignore
│   └── README.md
│
└── README.md                         # Documentación general

═══════════════════════════════════════════════════════════════════════════════

ESPECIFICACIONES TÉCNICAS
═════════════════════════

FRONTEND
────────
Tecnología: React 18 + Vite
Puerto: 5174
Características:
- Componentes funcionales con Hooks
- Gestión de estado con useState, useEffect
- Sweet Alert 2 para notificaciones
- Material Design System personalizado
- CSS-in-JS inline styling
- Servicios AJAX con Fetch API
- Almacenamiento de token en localStorage
- Autenticación con JWT Bearer Token

BACKEND
───────
Tecnología: Spring Boot 3.2.0
Puerto: 8080
Context Path: /api
Características:
- Arquitectura en capas (Controller → Service → Repository)
- Spring Data JPA con Hibernate
- MySQL 8.0 como BD
- Autenticación JWT
- CORS habilitado para localhost:5174
- Logging con SLF4J
- Manejo de excepciones centralizado
- Password encoding con BCrypt
- Validación de datos

BASE DE DATOS
─────────────
Motor: MySQL 8.0
Base de datos: campus_reserve
Credenciales:
  Usuario: ADMIN
  Contraseña: SanShaggyTadeo123
  Host: localhost
  Puerto: 3306

AUTENTICACIÓN
──────────────
Método: JWT (JSON Web Tokens)
Expiración: 24 horas (86400000 ms)
Header: Authorization: Bearer {token}
Algoritmo: HS512

═══════════════════════════════════════════════════════════════════════════════

FLUJOS DE USUARIO
═════════════════

FLUJO 1: Login
1. Usuario ingresa correo y contraseña
2. Frontend envía POST a /api/auth/login
3. Backend valida credenciales
4. Backend genera JWT token
5. Frontend almacena token en localStorage
6. Usuario redirigido a Dashboard

FLUJO 2: Consultar Instalaciones
1. Usuario accede a sección "Canchas"
2. Frontend llamadas GET /api/instalaciones
3. Backend retorna lista de instalaciones con estado
4. Componente CanchaCard renderiza cada instalación

FLUJO 3: Crear Instalación (Admin)
1. Admin hace clic en botón flotante "Agregar"
2. Se abre CanchaModal
3. Admin completa formulario (nombre, tipo, foto)
4. Frontend envía POST /api/instalaciones con datos
5. Backend crea instalación en BD
6. Sweet Alert notifica éxito
7. Lista se actualiza automáticamente

FLUJO 4: Editar Instalación (Admin)
1. Admin hace clic en botón "Modificar" de tarjeta
2. CanchaModal se abre con datos precargados
3. Admin edifica los datos
4. Frontend envía PUT /api/instalaciones/{id}
5. Backend actualiza registro
6. Notificación de éxito

FLUJO 5: Eliminar Instalación (Admin)
1. Admin hace clic en botón "Eliminar"
2. Sweet Alert pide confirmación mostrando detalles
3. Si confirma, Frontend envía DELETE /api/instalaciones/{id}
4. Backend elimina registro
5. Notificación de éxito y lista actualizada

═══════════════════════════════════════════════════════════════════════════════

INSTRUCCIONES DE INSTALACIÓN Y EJECUCIÓN
═════════════════════════════════════════

REQUISITOS PREVIOS
- Node.js 16+ (Frontend)
- Java 17+ (Backend)
- Maven 3.8.0+ (Backend)
- MySQL 8.0 (Base de datos)
- Git

INSTALACIÓN

1. CLONAR REPOSITORIO
   git clone https://github.com/ErnestoDof23/Integradorall.git
   cd Integradorall

2. CONFIGURAR FRONTEND
   cd frontend
   npm install
   npm run dev

3. CONFIGURAR BACKEND
   cd ../backend
   mvn clean compile
   mvn spring-boot:run

4. CREAR BASE DE DATOS
   mysql -u ADMIN -p
   password: SanShaggyTadeo123
   
   CREATE DATABASE campus_reserve;
   USE campus_reserve;
   SOURCE schema.sql;  (si existe archivo SQL)

5. ACCEDER A APLICACIÓN
   Web: http://localhost:5174
   API: http://localhost:8080/api

═══════════════════════════════════════════════════════════════════════════════

INSTRUCCIONES PARA SUBIR EL PROYECTO A GITHUB
═════════════════════════════════════════════

1. INICIALIZAR REPOSITORIO (si no existe)
   git init
   git add .
   git commit -m "Initial commit - Campus Reserve System"
   git branch -M main

2. AGREGAR REPOSITORIO REMOTO
   git remote add origin https://github.com/ErnestoDof23/Integradorall.git

3. CREAR RAMA PARA EL EQUIPO
   git checkout -b nombre-de-rama  (ej: Ernesto, backend, frontend)

4. SUBIR CAMBIOS
   git add .
   git commit -m "Descripción de cambios"
   git push origin nombre-de-rama

5. CREAR PULL REQUEST
   - Ir a GitHub
   - Crear Pull Request a rama main
   - Incluir descripción de cambios
   - Solicitar revisión

ESTRUCTURA DE RAMAS RECOMENDADA
- main: Rama principal (producción)
- develop: Rama de desarrollo
- Ernesto: Rama personal web dev
- backend: Rama para API
- frontend: Rama para React
- mobile-*: Ramas para equipos móviles

═══════════════════════════════════════════════════════════════════════════════

CRITERIOS DE ENTREGA - PROYECTO INTEGRADOR
═══════════════════════════════════════════

REQUISITO 1: Diagrama Entidad-Relación
✓ Un solo integrante del equipo sube el diagrama ER
✓ Formato: imagen (PNG/PDF) o descripción en documento
✓ Ubicación: En rama principal del repositorio
✓ Debe mostrar: Entidades, atributos, relaciones (1:1, 1:N, N:N)
✓ Notación: Chen o similar
Responsable: [Nombre del integrante web dev]
Fecha: 18 de marzo de 2026
Commit: https://github.com/ErnestoDof23/Integradorall/commit/[ID]
Rama: Ernesto

REQUISITO 2: Link del Repositorio
✓ Un solo integrante sube link del repositorio
✓ Incluir: URL del repositorio
✓ Incluir: Fecha del commit
✓ Incluir: Rama donde está el código
✓ NO SE ACEPTAN PROYECTOS COMPRIMIDOS
Responsable: [Nombre del integrante web dev]
Repositorio: https://github.com/ErnestoDof23/Integradorall
Rama: Ernesto
Commit inicial: [fecha de este commit]

REQUISITO 3: Descripción de la Lógica del Proyecto
✓ Un solo integrante escribe la descripción
✓ Extensión: Mínimo 500 palabras
✓ Contenido:
  - Objetivo del proyecto
  - Arquitectura implementada
  - Flujos principales de usuario
  - Relaciones entre entidades
  - Tecnologías utilizadas
  - Cómo se integran los módulos
✓ Formato: Documento de texto (incluso en Word)
Responsable: [Nombre del integrante web dev]

REQUISITO 4: Comentario de Entrega (TODOS LOS INTEGRANTES)
✓ TODOS los integrantes DEBEN comentar en la tarea
✓ Formato del comentario:
   
   PROYECTO INTEGRADOR - ENTREGA FINAL
   
   Integrantes del equipo:
   - [Nombre Completo] - [Rol: Web Dev/Mobile/BD]
   - [Nombre Completo] - [Rol: Web Dev/Mobile/BD]
   - [Nombre Completo] - [Rol: Web Dev/Mobile/BD]
   - [Nombre Completo] - [Rol: Web Dev/Mobile/BD]
   
   Estado: ✓ ENTREGADO
   Repositorio: https://github.com/ErnestoDof23/Integradorall
   Rama de trabajo: Ernesto
   
   Resumen técnico:
   - Backend: Spring Boot 3.2.0 con 5 entidades
   - Frontend: React 18 + Vite
   - Base de datos: MySQL 8.0
   - Autenticación: JWT
   - API REST: 15+ endpoints documentados
   
   Relaciones implementadas:
   - Rol (1:N) Usuario
   - Usuario (1:N) Reservacion
   - Instalacion (1:N) Horario
   - Horario (1:N) Reservacion
   
   ¡Proyecto completado exitosamente!

✓ TODOS los integrantes que NO comentan: SE CONSIDERAN SIN MATERIAL PARA EVALUAR

═══════════════════════════════════════════════════════════════════════════════

RELACIONES JPA - NOTACIÓN UTILIZADA
════════════════════════════════════

RELACIÓN UNO A MUCHOS (1:N) - OneToMany
Lado "uno":
@OneToMany(
    mappedBy = "atributoDelLadoMuchos",
    cascade = CascadeType.ALL,
    fetch = FetchType.LAZY
)
private Set<EntidadMuchos> muchos;

Lado "muchos":
@ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "id_relacion")
private EntidadUno uno;

Ejemplo en el proyecto:
Rol ←→ Usuario (Rol tiene muchos Usuarios)

@Entity
public class Rol {
    @OneToMany(mappedBy = "rol", cascade = CascadeType.ALL)
    private Set<Usuario> usuarios;
}

@Entity
public class Usuario {
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_rol")
    private Rol rol;
}

DIRECCIONALIDAD:
- Unidireccional: Un lado conoce al otro
- Bidireccional: Ambos lados se conocen (mappedBy establece el lado propietario)

FETCH STRATEGY:
- EAGER: Carga los datos inmediatamente
- LAZY: Carga bajo demanda (más eficiente)

CASCADE:
- ALL: Propaga todas las operaciones (persist, merge, remove)
- PERSIST: Solo propaga persist
- REMOVE: Solo propaga delete

═══════════════════════════════════════════════════════════════════════════════

GUÍA DE INTEGRACIÓN PARA EQUIPOS MÓVILES
═════════════════════════════════════════

ENDPOINTS DE API DISPONIBLES
============================

AUTENTICACIÓN
POST /api/auth/login
Body: {
    "correoInstitucional": "usuario@campus.edu",
    "password": "password123"
}
Response: {
    "token": "eyJhbGciOiJIUzUxMiJ9...",
    "tipo": "Bearer",
    "usuario": {
        "idUsuario": 1,
        "nombre": "Juan Pérez",
        "correoInstitucional": "juan@campus.edu",
        "activo": true,
        "idRol": 2,
        "rolNombre": "Usuario"
    }
}

INSTALACIONES
GET /api/instalaciones
Response: [
    {
        "idInstalacion": 1,
        "nombre": "Cancha de Fútbol A",
        "tipo": "Cancha",
        "descripcion": "Cancha de fútbol 5",
        "foto": "data:image/jpeg;base64,...",
        "estado": "Disponible",
        "capacidad": 10
    },
    ...
]

GET /api/instalaciones/{id}
GET /api/instalaciones - Listar todas
POST /api/instalaciones - Crear (Admin)
PUT /api/instalaciones/{id} - Editar (Admin)
DELETE /api/instalaciones/{id} - Eliminar (Admin)

USUARIOS
GET /api/usuarios
GET /api/usuarios/{id}
POST /api/usuarios - Crear
PUT /api/usuarios/{id} - Editar
DELETE /api/usuarios/{id} - Eliminar

HORARIOS
GET /api/horarios
GET /api/horarios/{id}
POST /api/horarios - Crear
PUT /api/horarios/{id} - Editar
DELETE /api/horarios/{id} - Eliminar

RESERVACIONES
GET /api/reservaciones
GET /api/reservaciones/{id}
POST /api/reservaciones - Crear
PUT /api/reservaciones/{id} - Editar
DELETE /api/reservaciones/{id} - Eliminar

AUTENTICACIÓN EN REQUESTS
Todas las requests (excepto login) deben incluir:
Headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9...",
    "Content-Type": "application/json"
}

═══════════════════════════════════════════════════════════════════════════════

CHECKLIST DE CUMPLIMIENTO
═════════════════════════

Frontend
☑ React 18 + Vite configurado
☑ Componentes reutilizables
☑ Material Design System implementado
☑ Servicios API consumiendo backend
☑ Autenticación JWT funcional
☑ CRUD Instalaciones completo
☑ CRUD Usuarios funcional
☑ Notificaciones con Sweet Alert
☑ Paginación implementada
☑ Diseño responsive
☑ Tokens almacenados en localStorage

Backend
☑ Spring Boot 3.2.0 configurado
☑ 5 entidades con relaciones JPA correctas
☑ 5 repositorios JpaRepository
☑ Servicios con lógica de negocio
☑ Controladores REST con CRUD
☑ Autenticación JWT funcionando
☑ CORS habilitado
☑ Manejo de excepciones centralizado
☑ Password encoding con BCrypt
☑ Logging implementado

Base de Datos
☑ MySQL 8.0 creada
☑ Tablas con relaciones correctas
☑ Índices en claves foráneas
☑ Constraints de integridad
☑ Triggers si corresponde

Documentación
☑ README en frontend
☑ README en backend
☑ Diagrama ER
☑ Descripción de lógica de negocio
☑ Instrucciones de instalación
☑ Estructura de carpetas

Repositorio
☑ Código en GitHub
☑ Rama organizada (main, Ernesto, etc)
☑ .gitignore configurado
☑ Commits con mensajes descriptivos
☑ Sin archivos comprimidos

═══════════════════════════════════════════════════════════════════════════════

PROBLEMAS COMUNES Y SOLUCIONES
═══════════════════════════════

Error: "Cannot find module 'react'"
Solución: npm install en carpeta frontend

Error: "Port 8080 already in use"
Solución: netstat -an | grep 8080 (macOS/Linux)
        Cambiar en application.properties: server.port=8081

Error: "Access denied for user 'ADMIN'"
Solución: Verificar credenciales MySQL en application.properties
        Verificar que MySQL está corriendo

Error: "CORS error en navegador"
Solución: Verificar que CampusReserveApplication.java tenga WebMvcConfigurer
        Verificar localhost:5174 está en allowedOrigins

Error: "JWT token expired"
Solución: Normal después de 24 horas, usuario debe hacer login nuevamente

Error: "Cannot find column 'id_rol' in table 'usuario'"
Solución: Ejecutar script SQL que crea las tablas correctamente
        Verificar que JPA está generando las tablas (hibernat.ddl-auto=update)

═══════════════════════════════════════════════════════════════════════════════

INFORMACIÓN DE CONTACTO Y SOPORTE
═════════════════════════════════

Equipo de Desarrollo:
- Web Developer: [Tu nombre] - ernestodof23@gmail.com
- Mobile Team: [Nombres]
- Database Admin: [Nombre]

Repositorio: https://github.com/ErnestoDof23/Integradorall

Issues y Preguntas: Usar GitHub Issues

Rama principal: main
Rama de desarrollo: Ernesto (Web Dev)

Versión del Proyecto: 1.0.0
Fecha de inicio: 18 de marzo de 2026
Estado: En desarrollo

═══════════════════════════════════════════════════════════════════════════════

Documento generado: 18 de marzo de 2026
Última actualización: 18 de marzo de 2026
Versión: 1.0
