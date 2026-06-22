package com.examenU3.Exa.service;

import com.examenU3.Exa.entity.Usuario;
import com.examenU3.Exa.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repo;

    public List<Usuario> obtenerTodos() {

        return repo.findAll();
    }

    public Usuario obtenerPorId(Long id) {

        return repo.findById(id).orElse(null);
    }

    public Usuario crear(Usuario usuario) {

        return repo.save(usuario);
    }

    public Usuario actualizar(Long id, Usuario usuario) {
        Usuario existente = repo.findById(id).orElse(null);
        if (existente != null) {
            existente.setNombre(usuario.getNombre());
            existente.setEmail(usuario.getEmail());
            existente.setTipoUsuario(usuario.getTipoUsuario());
            existente.setActivo(usuario.getActivo());
            return repo.save(existente);
        }
        return null;
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
