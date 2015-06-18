package br.unicesumar.escoladeti2015time04.atendimento.motivo;

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
@RequestMapping("atendimento/motivo")
public class AtendimentoMotivoController {

    @Autowired
    private AtendimentoMotivoService service;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Map<String, Object> localizar(@PathVariable Long id) {
        return this.service.localizar(id);
    }

    @RequestMapping(value = "/listarAtivos", method = RequestMethod.GET)
    public ResultadoListagem<AtendimentoMotivo> listarAtivos() {
        return this.service.listarAtivos();
    }

    @RequestMapping(value = "/listar", method = RequestMethod.POST)
    public ResultadoListagem<AtendimentoMotivo> listar(@RequestBody RequisicaoListagem requisicaoListagem) {
        return this.service.listar(requisicaoListagem);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void criarMotivo(@RequestBody AtendimentoMotivo motivo) {
        this.service.criar(motivo);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void editarMotivo(@RequestBody AtendimentoMotivoCommandEditar motivo) {
        this.service.editar(motivo);
    }

    @RequestMapping(value = "{id}/{status}", method = RequestMethod.PUT)
    public void alterarStatus(@PathVariable Long id, @PathVariable AtendimentoMotivoStatus status) {
        this.service.inativar(id, status);
    }

}
