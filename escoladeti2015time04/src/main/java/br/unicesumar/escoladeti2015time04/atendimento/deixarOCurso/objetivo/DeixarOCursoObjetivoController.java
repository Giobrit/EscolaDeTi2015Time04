package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo;

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
@RequestMapping("atendimento/deixarOCurso/objetivo")
public class DeixarOCursoObjetivoController {

    @Autowired
    private DeixarOCursoObjetivoService service;

    @RequestMapping(method = RequestMethod.POST)
    public void criar(@RequestBody DeixarOCursoObjetivo objetivo) {
        service.criar(objetivo);
    }

    @RequestMapping(value = "/listar", method = RequestMethod.POST)
    public ResultadoListagem<DeixarOCursoObjetivo> listar(@RequestBody RequisicaoListagem requisicaoListagem) {
        return this.service.listar(requisicaoListagem);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Map<String, Object> localizar(@PathVariable Long id) {
        return this.service.localizar(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void criarObjetivo(@RequestBody DeixarOCursoObjetivo objetivo) {
        this.service.criar(objetivo);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void editarObjetivo(@RequestBody DeixarOCursoObjetivoCommandEditar objetivo) {
        this.service.editar(objetivo);
    }

    @RequestMapping(value = "/{id}/{status}", method = RequestMethod.PUT)
    public void alterarStatus(@PathVariable Long id, @PathVariable DeixarOCursoObjetivoStatus status) {
        this.service.inativar(id, status);
    }

}
