package br.unicesumar.escoladeti2015time04.perfilacesso;

import br.unicesumar.escoladeti2015time04.utils.listagem.RequisicaoListagem;
import br.unicesumar.escoladeti2015time04.utils.listagem.ResultadoListagem;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/perfilAcesso")
public class PerfilAcessoController {

    @Autowired
    private PerfilAcessoService service;

    @RequestMapping(value = "/listar", method = RequestMethod.POST)
    public ResultadoListagem<PerfilAcesso> listar(@RequestBody RequisicaoListagem requisicaoListagem) {
        return this.service.listar(requisicaoListagem);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Map<String, Object> localizar(@PathVariable Long id) {
        return this.service.localizar(id);
    }

    @RequestMapping(value = "/verificar-se-existe-perfil/{nome}", method = RequestMethod.GET)
    public Boolean verificarSeExistePerfilAcesso(@PathVariable String nome) {
        return service.existePerfil(nome);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void criarPerfilAcesso(@RequestBody PerfilAcessoCommandInserir command) {
        service.criar(command);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void editarPerfilAcesso(@RequestBody PerfilAcessoCommandEditar command) {
        service.editar(command);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void removerPerfilAcesso(@PathVariable Long id) {
        service.remover(id);
    }

}
