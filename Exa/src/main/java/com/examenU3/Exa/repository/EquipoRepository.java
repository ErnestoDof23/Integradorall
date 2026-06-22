package com.examenU3.Exa.repository;

import com.examenU3.Exa.entity.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface EquipoRepository extends JpaRepository<Equipo, Long> {

    List<Equipo> findByNombreContainsIgnoreCase(String nombre);
    List<Equipo> findByNombreContainsIgnoreCaseAndDisponibleTrue(String nombre);
}
