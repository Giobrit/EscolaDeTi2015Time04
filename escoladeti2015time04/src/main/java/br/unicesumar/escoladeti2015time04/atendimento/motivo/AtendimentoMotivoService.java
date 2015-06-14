package br.unicesumar.escoladeti2015time04.atendimento.motivo;

import br.unicesumar.escoladeti2015time04.utils.listagem.Filtro;
import br.unicesumar.escoladeti2015time04.utils.listagem.Ordenador;
import br.unicesumar.escoladeti2015time04.utils.listagem.ResultadoListagem;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import java.util.HashSet;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AtendimentoMotivoService extends Service<AtendimentoMotivo, AtendimentoMotivoRepository, AtendimentoMotivoCommandEditar> {

    public void inativar(Long id, AtendimentoMotivoStatus status) {
        AtendimentoMotivo motivo = repository.getOne(id);
        motivo.setStatus(status);
        repository.save(motivo);
    }

    @Override
    public void criar(AtendimentoMotivo motivo) {
        motivo.setStatus(AtendimentoMotivoStatus.ATIVO);
        super.criar(motivo);
    }

    @Override
    protected Class<AtendimentoMotivo> getClassEntity() {
        return AtendimentoMotivo.class;
    }

    public ResultadoListagem listarAtivos() {
        final Filtro filtro = new Filtro();
        filtro.setCondicaoPadrao("status = 'ATIVO'");

        final HashSet<String> colunasVisiveis = new HashSet<>();
        colunasVisiveis.add("descricao");

        return listar(colunasVisiveis, filtro, new Ordenador("descricao"));
    }
}
