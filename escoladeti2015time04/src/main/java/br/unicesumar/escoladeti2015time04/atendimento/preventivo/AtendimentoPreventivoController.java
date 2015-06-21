package br.unicesumar.escoladeti2015time04.atendimento.preventivo;

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
@RequestMapping("/atendimento/preventivo")
public class AtendimentoPreventivoController {

    @Autowired
    private AtendimentoPreventivoService service;

    @RequestMapping(value = "/listar", method = RequestMethod.POST)
    public ResultadoListagem<AtendimentoPreventivo> listar(@RequestBody RequisicaoListagem requisicaoListagem) {
        return this.service.listar(requisicaoListagem);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Map<String, Object> localizar(@PathVariable Long id) {
        return this.service.localizar(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void criarAtendimentoPreventivo(@RequestBody AtendimentoPreventivoCommandInserir atendimentoPreventivo) {
        this.service.criar(atendimentoPreventivo);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void editarAtendimentoPreventivo(@RequestBody AtendimentoPreventivoCommandEditar atendimentoPreventivo) {
        this.service.editar(atendimentoPreventivo);
    }
}
