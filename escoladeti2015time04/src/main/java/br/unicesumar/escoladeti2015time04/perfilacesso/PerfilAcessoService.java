package br.unicesumar.escoladeti2015time04.perfilacesso;

import java.util.List;
import java.util.Set;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class PerfilAcessoService {
    @Autowired
    private PerfilAcessoRepository perfilRepository;
    
    public void salvar(PerfilAcesso perfilAcesso){
        perfilRepository.save(perfilAcesso);
    }
    
    public void editar(PerfilAcesso perfilAcesso){
        //Implementar modo editar
    }
    
    public void remover(Long id){
        //Implementar modo remover
    }
    //Verificar como retornar um Set atraves do findAll() do repositorio JPA
    public List listar(){
        return perfilRepository.findAll();
    }
}
