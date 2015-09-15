package br.unicesumar.webservicelyceum.turma;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TurmaService {
    @Autowired
    private TurmaRepository repository;
    
    public void criar(Turma turma){
        repository.save(turma);
    }
    
    public Turma buscar(Long id){
        return repository.getOne(id);
    }

    public List<Turma> buscarTodos() {
        return repository.findAll();
    }
}
