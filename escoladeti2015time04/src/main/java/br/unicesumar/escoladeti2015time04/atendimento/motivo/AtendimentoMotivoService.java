package br.unicesumar.escoladeti2015time04.atendimento.motivo;

import br.unicesumar.escoladeti2015time04.utils.listagem.Filtro;
import br.unicesumar.escoladeti2015time04.utils.listagem.Ordenador;
import br.unicesumar.escoladeti2015time04.utils.listagem.ResultadoListagem;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AtendimentoMotivoService extends Service<AtendimentoMotivo, AtendimentoMotivoRepository, AtendimentoMotivoCommandEditar> {

    @Override
    protected String montarFromListar() {
        String fromLocal = super.montarFromListar();
        fromLocal += "inner join atendimentodomotivo on atendimentomotivoid = id";
        return fromLocal;
    }

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
    public Map<String, Object> localizar(Long id) {
        Map<String, Object> motivo = super.localizar(id);

        final MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        final String requisicao = "select "
                + "motivo.atendimentodomotivo "
                + "from atendimentodomotivo motivo "
                + "where motivo.atendimentomotivoid = :id";

        List<String> atendimentoDoMotivo;

        atendimentoDoMotivo = jdbcTemplate.queryForList(requisicao, params, String.class);

        motivo.put("atendimentosDoMotivo", atendimentoDoMotivo);

        return motivo;
    }

    @Override
    protected Class<AtendimentoMotivo> getClassEntity() {
        return AtendimentoMotivo.class;
    }

    public ResultadoListagem listarMotivosAtivos(AtendimentoDoMotivo atendimentoDoMotivo) {
        String wherePadrao = "";
        wherePadrao += " status = 'ATIVO' AND ";
        wherePadrao += " atendimentodomotivo = '" + atendimentoDoMotivo + "'";

        final Filtro filtro = new Filtro();
        filtro.setCondicaoPadrao(wherePadrao);

        final HashSet<String> colunasVisiveis = new HashSet<>();
        colunasVisiveis.add("descricao");

        return listar(colunasVisiveis, filtro, new Ordenador("descricao"));
    }

}
