package br.unicesumar.webservicelyceum.alunoDisciplina;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AlunoDisciplinaService {

    @Autowired
    private AlunoDisciplinaRepository repository;
    
    public void criar(AlunoDisciplina alunoDisciplina){
        repository.save(alunoDisciplina);
    }
}
