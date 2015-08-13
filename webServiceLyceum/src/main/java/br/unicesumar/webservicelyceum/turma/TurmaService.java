package br.unicesumar.webservicelyceum.turma;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TurmaService {
    @Autowired
    private TurmaRepository repository;
    
    public void criar(Turma turma){
        repository.save(turma);
    }
}
