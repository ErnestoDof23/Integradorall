package com.examenU3.Exa.repository;

import com.examenU3.Exa.entity.Prestamo;
import com.examenU3.Exa.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {
    List<Prestamo> findByUsuario(Usuario usuario);
    List<Prestamo> findByUsuarioAndEstado(Usuario usuario, Prestamo.Estado estado);
}
