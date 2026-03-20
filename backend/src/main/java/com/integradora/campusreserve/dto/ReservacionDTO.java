package com.integradora.campusreserve.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para Reservacion
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservacionDTO {
    private Integer idReservacion;
    private String fechaReserva;
    private String estado;
    private String descripcion;
    private Integer idUsuario;
    private Integer idHorario;
}
