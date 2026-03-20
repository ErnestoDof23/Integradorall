package com.integradora.campusreserve.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

/*
 - Entidad Reservacion
 - Representa las reservaciones de instalaciones por usuarios
 */
@Entity
@Table(name = "reservacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reservacion")
    private Integer idReservacion;

    @Column(name = "fecha_reserva")
    private LocalDate fechaReserva;

    @Column(name = "estado", nullable = false, length = 30)
    @Builder.Default
    private String estado = "Activa";

    // Relación muchos a uno con Usuario
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    // Relación muchos a uno con Horario
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_horario", nullable = false)
    private Horario horario;

    @Override
    public String toString() {
        return "Reservacion{" +
                "idReservacion=" + idReservacion +
                ", fechaReserva=" + fechaReserva +
                ", estado='" + estado + '\'' +
                '}';
    }
}
