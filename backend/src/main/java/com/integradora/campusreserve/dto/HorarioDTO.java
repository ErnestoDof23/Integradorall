package com.integradora.campusreserve.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para Horario
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HorarioDTO {
    private Integer idHorario;
    private String fecha;
    private String horaInicio;
    private String horaFin;
    private Integer idInstalacion;
}
