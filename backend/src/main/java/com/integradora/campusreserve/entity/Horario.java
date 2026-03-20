package com.integradora.campusreserve.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

/*
 - Entidad Horario
  -Representa los horarios disponibles para cada instalación
 */
@Entity
@Table(name = "horario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_horario")
    private Integer idHorario;

    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fin", nullable = false)
    private LocalTime horaFin;

    // Relación muchos a uno con Instalacion
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_instalacion", nullable = false)
    private Instalacion instalacion;

    // Relación uno a muchos con Reservacion
    @OneToMany(mappedBy = "horario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Reservacion> reservaciones;

    @Override
    public String toString() {
        return "Horario{" +
                "idHorario=" + idHorario +
                ", fecha=" + fecha +
                ", horaInicio=" + horaInicio +
                ", horaFin=" + horaFin +
                '}';
    }
}
