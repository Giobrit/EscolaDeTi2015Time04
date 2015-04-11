package br.unicesumar.escoladeti2015time04.perfilacesso;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/perfilacesso")
public class PerfilAcessoController {

    @Autowired
    private PerfilAcessoService service;

    @RequestMapping(method = RequestMethod.GET)
    public List<Map<String, Object>> getPerfilAcesso() {
        return service.listarPerfilAcesso();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public List<Map<String, Object>> getPerfilAcessoById(@PathVariable Long id) {
        return service.findById(id);
    }

    @RequestMapping(value = "/verificar-se-existe-perfil/{nome}", method = RequestMethod.GET)
    public Boolean verificarSeExistePerfilAcesso(@PathVariable String nome) {
        return service.existePerfil(nome);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void criarPerfilAcesso(@RequestBody CriarPerfilAcessoCommand command) {
        service.salvar(command);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void editarPerfilAcesso(@RequestBody CriarPerfilAcessoCommand command) {
        service.editar(command);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void removerPerfilAcesso(@PathVariable Long id) {
        service.remover(id);
    }

}
