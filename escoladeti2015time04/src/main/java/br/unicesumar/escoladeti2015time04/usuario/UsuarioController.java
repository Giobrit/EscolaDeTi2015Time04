package br.unicesumar.escoladeti2015time04.usuario;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    
    @Autowired
    private UsuarioService service;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Map<String, Object>> listarUsuarios() {
        return this.service.listar();
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public void criarUsuario(@RequestBody Usuario usuario){
        this.service.salvar(usuario);
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    public void editarUsuario(@RequestBody Usuario usuario){
        this.service.editar(usuario);
    }
      

    @RequestMapping(value = "{id}/{status}", method = RequestMethod.PUT)
    public void alterarStatus(@PathVariable Long id, @PathVariable Status status){
        this.service.inativar(id,status);
        
    }
}
