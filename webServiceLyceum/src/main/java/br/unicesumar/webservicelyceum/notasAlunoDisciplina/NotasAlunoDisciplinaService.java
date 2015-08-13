package br.unicesumar.webservicelyceum.notasAlunoDisciplina;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NotasAlunoDisciplinaService {
    @Autowired
    private NotasAlunoDisciplinaRepository repository;
    
    public void criar(NotasAlunoDisciplina notas){
        repository.save(notas);
    }
}
