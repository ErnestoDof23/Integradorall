-- CREAR DATABASE
CREATE DATABASE campus_reserve;
USE campus_reserve;

-- INSERTAR ROLES
INSERT INTO rol (nombre, descripcion) VALUES
('Administrador', 'Acceso total al sistema'),
('Usuario', 'Usuario estándar del sistema');

-- INSERTAR USUARIOS (JAZMIN COMO ADMIN, LOS DEMAS COMO USUARIOS)
INSERT INTO usuario (nombre, correo_institucional, password, activo, id_rol, fecha_creacion) VALUES
('Jazmin', 'jazmin@universidad.edu', '$2a$10$kL.g8JpC2QW0k8qVzJkOT.JYz5E9PqC3dJZxZY7qJ7n1K5qK7qK7K', 1, 1, NOW()),
('Ernesto Dominguez', 'ernesto@universidad.edu', '$2a$10$kL.g8JpC2QW0k8qVzJkOT.JYz5E9PqC3dJZxZY7qJ7n1K5qK7qK7K', 1, 2, NOW()),
('Juan Perez', 'juan@universidad.edu', '$2a$10$kL.g8JpC2QW0k8qVzJkOT.JYz5E9PqC3dJZxZY7qJ7n1K5qK7qK7K', 1, 2, NOW()),
('Maria Garcia', 'maria@universidad.edu', '$2a$10$kL.g8JpC2QW0k8qVzJkOT.JYz5E9PqC3dJZxZY7qJ7n1K5qK7qK7K', 1, 2, NOW()),
('Carlos Lopez', 'carlos@universidad.edu', '$2a$10$kL.g8JpC2QW0k8qVzJkOT.JYz5E9PqC3dJZxZY7qJ7n1K5qK7qK7K', 1, 2, NOW()),
('Laura Sanchez', 'laura@universidad.edu', '$2a$10$kL.g8JpC2QW0k8qVzJkOT.JYz5E9PqC3dJZxZY7qJ7n1K5qK7qK7K', 1, 2, NOW()),
('Roberto Martinez', 'roberto@universidad.edu', '$2a$10$kL.g8JpC2QW0k8qVzJkOT.JYz5E9PqC3dJZxZY7qJ7n1K5qK7qK7K', 1, 2, NOW());

-- INSERTAR INSTALACIONES (Canchas)
INSERT INTO instalacion (nombre, tipo, descripcion, foto, estado, capacidad, fecha_creacion) VALUES
('Cancha de Futbol 1', 'Cancha', 'Cancha de futbol sintética', NULL, 'Disponible', 22, NOW()),
('Cancha de Futbol 2', 'Cancha', 'Cancha de futbol natural', NULL, 'Disponible', 22, NOW()),
('Cancha de Voleibol', 'Cancha', 'Cancha de voleibol cubierta', NULL, 'Disponible', 24, NOW()),
('Cancha de Basquetbol', 'Cancha', 'Cancha de basquetbol cubierta', NULL, 'Disponible', 15, NOW()),
('Auditorio Principal', 'Auditorio', 'Auditorio principal con capacidad para 500 personas', NULL, 'Disponible', 500, NOW()),
('Gimnasio', 'Gimnasio', 'Gimnasio con equipos modernos', NULL, 'Disponible', 100, NOW()),
('Piscina Olímpica', 'Piscina', 'Piscina olímpica con 8 carriles', NULL, 'Disponible', 200, NOW());

-- INSERTAR HORARIOS (Ejemplos para hoy)
INSERT INTO horario (fecha, hora_inicio, hora_fin, id_instalacion) VALUES
-- Cancha Futbol 1
('2026-03-18', '08:00:00', '09:00:00', 1),
('2026-03-18', '09:00:00', '10:00:00', 1),
('2026-03-18', '10:00:00', '11:00:00', 1),
('2026-03-18', '14:00:00', '15:00:00', 1),
('2026-03-18', '15:00:00', '16:00:00', 1),

-- Cancha Futbol 2
('2026-03-18', '08:00:00', '09:00:00', 2),
('2026-03-18', '09:00:00', '10:00:00', 2),
('2026-03-18', '16:00:00', '17:00:00', 2),

-- Cancha Voleibol
('2026-03-18', '10:00:00', '11:00:00', 3),
('2026-03-18', '11:00:00', '12:00:00', 3),
('2026-03-18', '15:00:00', '16:00:00', 3),

-- Cancha Basquetbol
('2026-03-18', '14:00:00', '15:00:00', 4),
('2026-03-18', '15:00:00', '16:00:00', 4),
('2026-03-18', '17:00:00', '18:00:00', 4),

-- Auditorio
('2026-03-18', '10:00:00', '12:00:00', 5),
('2026-03-18', '14:00:00', '16:00:00', 5),

-- Gimnasio
('2026-03-18', '06:00:00', '20:00:00', 6),

-- Piscina
('2026-03-18', '08:00:00', '10:00:00', 7),
('2026-03-18', '16:00:00', '18:00:00', 7);
