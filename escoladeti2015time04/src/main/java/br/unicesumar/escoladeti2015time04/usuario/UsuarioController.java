package br.unicesumar.escoladeti2015time04.usuario;

import br.unicesumar.escoladeti2015time04.utils.ResultadoListagem;
import br.unicesumar.escoladeti2015time04.utils.listagem.Filtro;
import br.unicesumar.escoladeti2015time04.utils.listagem.PaginadorPostgreSQL;
import br.unicesumar.escoladeti2015time04.utils.listagem.RequisicaoListagem;
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

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Map<String, Object> localizar(@PathVariable Long id) {
        return this.service.localizar(id);
    }

    @RequestMapping(value = "/listar", method = RequestMethod.POST)
    public ResultadoListagem<Usuario> listarUsuariosFiltro(@RequestBody RequisicaoListagem requisicaoListagem) {
        return this.service.listar(requisicaoListagem);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public void criarUsuario(@RequestBody Usuario usuario) {
        this.service.criar(usuario);
    }   
    
    @RequestMapping(value = "/logar", method = RequestMethod.POST)
    public Boolean logar(@RequestBody UsuarioCommandLogar usuarioLogar) {
        return this.service.logar(usuarioLogar);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void editarUsuario(@RequestBody UsuarioCommandEditar usuario) {
        this.service.editar(usuario);
    }
    
    @RequestMapping(value = "/alterarSenha", method = RequestMethod.PUT)
    public void editarUsuario(@RequestBody UsuarioCommandEditarSenha usuarioAlterarSenha) {
        this.service.alterarSenha(usuarioAlterarSenha);
    }


    @RequestMapping(value = "{id}/{status}", method = RequestMethod.PUT)
    public void alterarStatus(@PathVariable Long id, @PathVariable Status status) {
        this.service.inativar(id, status);
    }

}
