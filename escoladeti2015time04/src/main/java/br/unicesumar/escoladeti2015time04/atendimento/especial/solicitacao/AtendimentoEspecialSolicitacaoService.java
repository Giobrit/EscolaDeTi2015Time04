
package br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao;

import br.unicesumar.escoladeti2015time04.utils.listagem.Filtro;
import br.unicesumar.escoladeti2015time04.utils.listagem.Ordenador;
import br.unicesumar.escoladeti2015time04.utils.listagem.ResultadoListagem;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import java.util.HashSet;
import javax.transaction.Transactional;
import org.h2.util.HashBase;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AtendimentoEspecialSolicitacaoService extends Service<AtendimentoEspecialSolicitacao, AtendimentoEspecialSolicitacaoRepository, AtendimentoEspecialSolicitacaoCommandEditar> {
    
    @Override
    public void criar(AtendimentoEspecialSolicitacao solicitacao){
        super.criar(solicitacao);
    }

    @Override
    protected Class<AtendimentoEspecialSolicitacao> getClassEntity() {
        return AtendimentoEspecialSolicitacao.class;
    }
    
    public ResultadoListagem listarSolicitacoes() {
        final Filtro filtro = new Filtro();
        
        final HashSet<String> colunasVisiveis = new HashSet<>();
        return listar(colunasVisiveis, filtro, new Ordenador("descricao"));
    }
}
