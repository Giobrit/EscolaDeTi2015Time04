package br.unicesumar.webservicelyceum.curso;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CursoService {
    @Autowired
    private CursoRepository repository;
    
    public void criar(Curso curso){
        repository.save(curso);
    }
    
    public Curso buscar(Long id){
        return repository.getOne(id);
    }
}
