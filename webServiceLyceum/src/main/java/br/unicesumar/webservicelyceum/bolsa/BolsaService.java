package br.unicesumar.webservicelyceum.bolsa;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BolsaService {
    
    @Autowired
    private BolsaRepository repository;
    
    public void criar(Bolsa bolsa){
        repository.save(bolsa);
    }
    
    public List<Bolsa> buscarTodos(){
        return repository.findAll();
    }
    
    
}
