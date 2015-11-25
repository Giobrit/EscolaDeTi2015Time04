package br.unicesumar.webservicelyceum.disciplina;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DisciplinaService {
    @Autowired
    private DisciplinaRepository repository;
    
    public void criar(Disciplina disciplina){
        repository.save(disciplina);
    }
    
    public Disciplina buscar(Long id){
        return repository.getOne(id);
    }
    
    public List<Disciplina> buscarTodos(){
        return repository.findAll();
    }
    
}
