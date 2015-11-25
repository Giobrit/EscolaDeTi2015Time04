package br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao;

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
@RequestMapping("atendimento/especial/solicitacao")
public class EspecialSolicitacaoController {

    @Autowired
    private EspecialSolicitacaoService service;

    @RequestMapping(method = RequestMethod.POST)
    public void criar(@RequestBody EspecialSolicitacao objetivo) {
        service.criar(objetivo);
    }

    @RequestMapping(value = "/listarAtivos", method = RequestMethod.GET)
    public ResultadoListagem<EspecialSolicitacao> listarAtivos() {
        return this.service.listarAtivos();
    }

    @RequestMapping(value = "/listar", method = RequestMethod.POST)
    public ResultadoListagem<EspecialSolicitacao> listar(@RequestBody RequisicaoListagem requisicaoListagem) {
        return this.service.listar(requisicaoListagem);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Map<String, Object> localizar(@PathVariable Long id) {
        return this.service.localizar(id);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void editarObjetivo(@RequestBody EspecialSolicitacaoCommandEditar objetivo) {
        this.service.editar(objetivo);
    }

    @RequestMapping(value = "/{id}/{status}", method = RequestMethod.PUT)
    public void alterarStatus(@PathVariable Long id, @PathVariable EspecialSolicitacaoStatus status) {
        this.service.inativar(id, status);
    }

}
