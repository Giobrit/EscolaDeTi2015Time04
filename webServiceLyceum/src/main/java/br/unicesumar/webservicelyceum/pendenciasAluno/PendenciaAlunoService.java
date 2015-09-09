package br.unicesumar.webservicelyceum.pendenciasAluno;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class PendenciaAlunoService {

    @Autowired
    private PendenciaAlunoRepository repository;
    
    public void criarPendenciaAluno(PendenciaAluno pendencia){
         repository.save(pendencia);
    }
}
