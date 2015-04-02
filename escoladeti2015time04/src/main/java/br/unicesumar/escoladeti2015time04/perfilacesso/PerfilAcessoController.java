package br.unicesumar.escoladeti2015time04.perfilacesso;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/perfilacesso")
public class PerfilAcessoController {
    @Autowired
    private PerfilAcessoService service;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Map<String,Object>> getPerfisAcesso(){
        return service.listarPerfilAcesso();
    }
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Map<String,Object>> getItensAcesso(){
        return service.listarItemAcesso();
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public void criarPerfilAcesso(@RequestBody PerfilAcesso perfilAcesso){
        service.salvar(perfilAcesso);
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    public void editarPerfilAcesso(@RequestBody PerfilAcesso perfilAcesso){
        service.editar(perfilAcesso);
    }
    
    @RequestMapping(value = "/{id}" ,method = RequestMethod.DELETE)
    public void removerPerfilAcesso(@RequestParam Long id){
        service.remover(id);
    }
}
