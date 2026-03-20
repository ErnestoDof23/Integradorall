CREATE DATABASE campusReserve;
USE campusReserve;

-- =============================
-- TABLA ROL
-- =============================

CREATE TABLE rol(
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(150)
);

-- =============================
-- TABLA USUARIO
-- =============================
CREATE TABLE usuario(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo_institucional VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_rol INT,

    FOREIGN KEY(id_rol) REFERENCES rol(id_rol)
);

-- =============================
-- TABLA INSTALACION
-- =============================

CREATE TABLE instalacion(
    id_instalacion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM ('Cancha', 'Auditorio') NOT NULL,
    descripcion TEXT,
    foto LONGBLOB,
    estado ENUM('Disponible','Reservado') DEFAULT 'Disponible'
);

-- =============================
-- TABLA HORARIO
-- =============================

CREATE TABLE horario(
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    id_instalacion INT,

    FOREIGN KEY(id_instalacion) REFERENCES instalacion(id_instalacion)
);

-- =============================
-- TABLA RESERVACION
-- =============================

CREATE TABLE reservacion(
    id_reservacion INT AUTO_INCREMENT PRIMARY KEY,
    fecha_reserva DATE,
    estado VARCHAR(30) DEFAULT 'Activa',
    id_usuario INT,
    id_horario INT,

    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY(id_horario) REFERENCES horario(id_horario)
);

INSERT INTO rol(nombre,descripcion)
VALUES
    ('Administrador','Control total del sistema'),
    ('Usuario','Usuario que realiza reservaciones');

-- =============================
-- TRIGGERS
-- =============================

-- Evitar que dos reservaciones usen el mismo horario.
DELIMITER //

CREATE TRIGGER validar_reservacion_duplicada
    BEFORE INSERT ON reservacion
    FOR EACH ROW
BEGIN

    IF EXISTS (
        SELECT 1
        FROM reservacion
        WHERE id_horario = NEW.id_horario
          AND estado = 'Activa'
    ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error: Este horario ya está reservado';
    END IF;

END //

DELIMITER ;

-- Evitar crear horarios que se empalmen en la misma instalación.
DELIMITER //

CREATE TRIGGER validar_traslape_horario
    BEFORE INSERT ON horario
    FOR EACH ROW
BEGIN

    IF EXISTS(
        SELECT 1
        FROM horario
        WHERE id_instalacion = NEW.id_instalacion
          AND fecha = NEW.fecha
          AND (
            NEW.hora_inicio < hora_fin
                AND NEW.hora_fin > hora_inicio
            )
    ) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Error: El horario se traslapa con otro existente';
    END IF;

END //

DELIMITER ;

-- Cuando se reserve un horario, podemos actualizar el estado de la instalación.
DELIMITER //

CREATE TRIGGER actualizar_estado_instalacion
    AFTER INSERT ON reservacion
    FOR EACH ROW
BEGIN

    UPDATE instalacion
    SET estado = 'Reservado'
    WHERE id_instalacion = (
        SELECT id_instalacion
        FROM horario
        WHERE id_horario = NEW.id_horario
    );

END //

DELIMITER ;

-- No dejar reservar apartir de las 8pm a 6am, abierto de 7am a 7pm
DELIMITER //

CREATE TRIGGER validar_horario_reserva
    BEFORE INSERT ON reservacion
    FOR EACH ROW
BEGIN

    DECLARE hora_reserva TIME;

    SELECT hora_inicio INTO hora_reserva
    FROM horario
    WHERE id_horario = NEW.id_horario;

    IF hora_reserva < '07:00:00' OR hora_reserva > '19:00:00' THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Las reservaciones solo se permiten de 7am a 7pm';
    END IF;

END//

DELIMITER ;

-- No dejar crear horarios fuera de 7am a 7pm
DELIMITER //

CREATE TRIGGER validar_horario_instalacion
    BEFORE INSERT ON horario
    FOR EACH ROW
BEGIN

    IF NEW.hora_inicio < '07:00:00' OR NEW.hora_fin > '19:00:00' THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Los horarios solo pueden estar entre 7am y 7pm';
    END IF;

END//

DELIMITER ;
