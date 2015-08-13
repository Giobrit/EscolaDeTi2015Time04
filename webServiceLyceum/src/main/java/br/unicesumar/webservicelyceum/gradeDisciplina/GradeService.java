package br.unicesumar.webservicelyceum.gradeDisciplina;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GradeService {
    @Autowired
    private GradeRepository repository;
    
    public void criar(Grade grade){
        repository.save(grade);
    }
    
    
}
