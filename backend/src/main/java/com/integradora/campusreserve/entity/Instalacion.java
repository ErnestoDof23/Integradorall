package com.integradora.campusreserve.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

/*
 - Entidad Instalacion
 -  Representa las instalaciones deportivas disponibles
 */
@Entity
@Table(name = "instalacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Instalacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_instalacion")
    private Integer idInstalacion;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "tipo", nullable = false, columnDefinition = "ENUM('Cancha', 'Auditorio')")
    @Enumerated(EnumType.STRING)
    private TipoInstalacion tipo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "foto", columnDefinition = "LONGBLOB")
    private byte[] foto;

    @Column(name = "estado", nullable = false, columnDefinition = "ENUM('Disponible','Reservado') DEFAULT 'Disponible'")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private EstadoInstalacion estado = EstadoInstalacion.Disponible;

    // Relación uno a muchos con Horario
    @OneToMany(mappedBy = "instalacion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Horario> horarios;

    @Override
    public String toString() {
        return "Instalacion{" +
                "idInstalacion=" + idInstalacion +
                ", nombre='" + nombre + '\'' +
                ", tipo=" + tipo +
                ", estado=" + estado +
                '}';
    }

    public enum TipoInstalacion {
        Cancha, Auditorio
    }

    public enum EstadoInstalacion {
        Disponible, Reservado
    }
}
