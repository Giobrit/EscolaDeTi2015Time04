package br.unicesumar.escoladeti2015time04.perfilacesso;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.web.bind.annotation.PathVariable;
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
    public List<Map<String, Object>> getPerfisAcesso() {
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
    public Boolean criarPerfilAcesso(@RequestBody PerfilAcesso perfilAcesso) {
        if (service.existePerfil(perfilAcesso.getNome()) == false) {
            service.salvar(perfilAcesso);
            return true;
        }
        return false;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Boolean editarPerfilAcesso(@RequestBody PerfilAcesso perfilAcesso) {
        if (service.existePerfil(perfilAcesso.getNome()) == false) {
            service.editar(perfilAcesso);
            return true;
        }
        return false;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void removerPerfilAcesso(@PathVariable Long id) {
        service.remover(id);
    }

}
