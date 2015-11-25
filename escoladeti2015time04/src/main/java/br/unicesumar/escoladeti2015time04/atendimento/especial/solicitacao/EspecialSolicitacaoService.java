package br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao;

import br.unicesumar.escoladeti2015time04.utils.listagem.Filtro;
import br.unicesumar.escoladeti2015time04.utils.listagem.Ordenador;
import br.unicesumar.escoladeti2015time04.utils.listagem.ResultadoListagem;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import java.util.HashSet;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class EspecialSolicitacaoService extends Service<EspecialSolicitacao, EspecialSolicitacaoRepository, EspecialSolicitacaoCommandEditar> {

    public void inativar(Long id, EspecialSolicitacaoStatus status) {
        EspecialSolicitacao objetivo = repository.getOne(id);
        objetivo.setStatus(status);
        repository.save(objetivo);
    }

    @Override
    public void criar(EspecialSolicitacao objetivo) {
        objetivo.setStatus(EspecialSolicitacaoStatus.ATIVO);
        super.criar(objetivo);
    }

    @Override
    protected Class<EspecialSolicitacao> getClassEntity() {
        return EspecialSolicitacao.class;
    }

    public ResultadoListagem listarAtivos() {
        final Filtro filtro = new Filtro();
        filtro.setCondicaoPadrao("status = 'ATIVO'");

        final HashSet<String> colunasVisiveis = new HashSet<>();
        colunasVisiveis.add("descricao");

        return listar(colunasVisiveis, filtro, new Ordenador("descricao"));
    }
}
