package br.unicesumar.webservicelyceum.departamento;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@Component
public class DepartamentoService {

    @Autowired
    private DepartamentoRepository repository;
    
    public void criarDepartamento(Departamento departamento){
        repository.save(departamento);
    }
    
    public Departamento buscarDepartamento(Long id){
        return repository.getOne(id);
    }
}
