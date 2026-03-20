package com.integradora.campusreserve.repository;

import com.integradora.campusreserve.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repositorio para Usuario
 */
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByCorreoInstitucional(String correoInstitucional);
    boolean existsByCorreoInstitucional(String correoInstitucional);
}
