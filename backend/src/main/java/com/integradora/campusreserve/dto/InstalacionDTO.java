package com.integradora.campusreserve.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para Instalacion
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstalacionDTO {
    private Integer idInstalacion;
    private String nombre;
    private String tipo;
    private String descripcion;
    private String foto;
    private String estado;
    private Integer capacidad;
}
