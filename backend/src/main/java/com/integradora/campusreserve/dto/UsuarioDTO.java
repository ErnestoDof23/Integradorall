package com.integradora.campusreserve.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para Usuario
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {
    private Integer idUsuario;
    private String nombre;
    private String correoInstitucional;
    private Boolean bloqueado;
    private Integer idRol;
    private String rolNombre;
}
