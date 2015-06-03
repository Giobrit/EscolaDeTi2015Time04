package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo;

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
@RequestMapping("atendimento/deixarOCurso/motivo")
public class DeixarOCursoMotivoController {

    @Autowired
    private DeixarOCursoMotivoService service;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Map<String, Object> localizar(@PathVariable Long id) {
        return this.service.localizar(id);
    }

    @RequestMapping(value = "/listarAtivos", method = RequestMethod.GET)
    public ResultadoListagem<DeixarOCursoMotivo> listarAtivos() {
        return this.service.listarAtivos();
    }

    @RequestMapping(value = "/listar", method = RequestMethod.POST)
    public ResultadoListagem<DeixarOCursoMotivo> listar(@RequestBody RequisicaoListagem requisicaoListagem) {
        return this.service.listar(requisicaoListagem);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void criarMotivo(@RequestBody DeixarOCursoMotivo motivo) {
        this.service.criar(motivo);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void editarMotivo(@RequestBody DeixarOCursoMotivoCommandEditar motivo) {
        this.service.editar(motivo);
    }

    @RequestMapping(value = "{id}/{status}", method = RequestMethod.PUT)
    public void alterarStatus(@PathVariable Long id, @PathVariable DeixarOCursoMotivoStatus status) {
        this.service.inativar(id, status);
    }

}
