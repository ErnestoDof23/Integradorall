package com.integradora.campusreserve.repository;

import com.integradora.campusreserve.entity.Instalacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

/**
 * Repositorio para Instalacion
 */
@Repository
public interface InstalacionRepository extends JpaRepository<Instalacion, Integer> {
    Optional<Instalacion> findByNombre(String nombre);
    List<Instalacion> findByTipo(String tipo);
    List<Instalacion> findByEstado(String estado);
}
