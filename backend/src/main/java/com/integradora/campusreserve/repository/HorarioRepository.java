package com.integradora.campusreserve.repository;

import com.integradora.campusreserve.entity.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

/**
 * Repositorio para Horario
 */
@Repository
public interface HorarioRepository extends JpaRepository<Horario, Integer> {
    List<Horario> findByInstalacionIdInstalacion(Integer idInstalacion);
    List<Horario> findByFecha(LocalDate fecha);
    List<Horario> findByInstalacionIdInstalacionAndFecha(Integer idInstalacion, LocalDate fecha);
}
