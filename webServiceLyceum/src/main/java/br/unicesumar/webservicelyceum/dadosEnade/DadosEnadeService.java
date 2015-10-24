package br.unicesumar.webservicelyceum.dadosEnade;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class DadosEnadeService {

    @Autowired
    private DadosEnadeRepository repository;
    
    public void criar(DadosEnade enade){
        this.repository.save(enade);
    }
    
    public List<DadosEnade> buscarTodos(){
        return this.repository.findAll();
    }
    
    public DadosEnade buscar(Long id){
        return this.repository.getOne(id);
    } 
}
