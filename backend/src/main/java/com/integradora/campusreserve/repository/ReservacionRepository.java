package com.integradora.campusreserve.repository;

import com.integradora.campusreserve.entity.Reservacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositorio para Reservacion
 */
@Repository
public interface ReservacionRepository extends JpaRepository<Reservacion, Integer> {
    List<Reservacion> findByUsuarioIdUsuario(Integer idUsuario);
    List<Reservacion> findByHorarioIdHorario(Integer idHorario);
    List<Reservacion> findByEstado(String estado);
}
