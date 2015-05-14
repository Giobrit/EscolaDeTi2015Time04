package br.unicesumar.escoladeti2015time04.usuario;

import br.unicesumar.escoladeti2015time04.utils.ResultadoListagem;
import br.unicesumar.escoladeti2015time04.utils.listagem.Filtro;
import br.unicesumar.escoladeti2015time04.utils.listagem.PaginadorPostgreSQL;
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

    @RequestMapping(value = "/numeroItens/{numeroItens}/paginaAtual/{paginaAtual}/valorFiltro/{valor}", method = RequestMethod.GET)
    public ResultadoListagem<Usuario> listarUsuariosFiltro(@RequestBody Long numeroItens, @PathVariable Long paginaAtual, @PathVariable String valor) {
        return this.service.listar(new Filtro<Usuario>(valor), new PaginadorPostgreSQL(numeroItens, paginaAtual));
    }

    @RequestMapping(value = "/numeroItens/{numeroItens}/paginaAtual/{paginaAtual}", method = RequestMethod.GET)
    public ResultadoListagem<Usuario> listarUsuariosSemFiltro(@PathVariable Long numeroItens, @PathVariable Long paginaAtual) {
        return this.service.listar(new Filtro<Usuario>(), new PaginadorPostgreSQL(numeroItens, paginaAtual));
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

    @RequestMapping(value = "{id}/{status}", method = RequestMethod.PUT)
    public void alterarStatus(@PathVariable Long id, @PathVariable Status status) {
        this.service.inativar(id, status);
    }

}
