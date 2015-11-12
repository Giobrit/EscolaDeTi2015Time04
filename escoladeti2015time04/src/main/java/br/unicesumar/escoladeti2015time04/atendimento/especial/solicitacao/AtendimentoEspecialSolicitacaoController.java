
package br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao;

import br.unicesumar.escoladeti2015time04.utils.listagem.RequisicaoListagem;
import br.unicesumar.escoladeti2015time04.utils.listagem.ResultadoListagem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("atendimentoespecial/especial/solicitao")
public class AtendimentoEspecialSolicitacaoController {
    
    @Autowired
    private AtendimentoEspecialSolicitacaoService service;
    
    @RequestMapping(method = RequestMethod.POST)
    public void criar(@RequestBody AtendimentoEspecialSolicitacao solicitacao){
        service.criar(solicitacao);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public ResultadoListagem<AtendimentoEspecialSolicitacao> listar(@RequestBody RequisicaoListagem requisicaoListagem){
        return this.service.listar(requisicaoListagem);
    }
    
}
