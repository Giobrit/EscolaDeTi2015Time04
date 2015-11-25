package br.unicesumar.escoladeti2015time04.relatorio.resumo;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class RelatorioResumoService {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public Map<String, Object> getResumoCursoAtendimentos() {
        String queryTotalAtendimento = "select centro, count(*) as atendimentos "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "group by att.centro";

        String queryTrancamentosCancelamentosTransferencias = "select centro, dco.descricao, count(*) as trancamentoscancelamentostransferencias "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "where dco.descricao in('Trancamento', 'Cancelamento', 'Transferência') "
                + "group by att.centro, dco.descricao";

        String queryPermanencias = "select centro, dco.descricao, count(*) as permanencias "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "where dco.descricao = 'Permanência' "
                + "group by att.centro, dco.descricao";

        Map<String, Object> retorno = new HashMap<String, Object>();

        List<Map<String, Object>> atendimentos = jdbcTemplate.query(queryTotalAtendimento, new MapRowMapper());
        retorno.put("atendimentos", atendimentos);
        List<Map<String, Object>> trancamentosCancelamentosTransferencias = jdbcTemplate.query(queryTrancamentosCancelamentosTransferencias, new MapRowMapper());
        retorno.put("trancamentosCancelamentosTransferencias", trancamentosCancelamentosTransferencias);
        List<Map<String, Object>> permanencias = jdbcTemplate.query(queryPermanencias, new MapRowMapper());
        retorno.put("permanencias", permanencias);

        return retorno;
    }

    public Map<String, Object> getResumoCursoAlunos() {
        String queryTotalAtendimento = "select centro, count(*) as atendimentos "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "group by att.centro";

        String queryTrancamentosCancelamentosTransferencias = "select centro, dco.descricao, count(*) as trancamentoscancelamentostransferencias "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "where dco.descricao in('Trancamento', 'Cancelamento', 'Transferência') "
                + "group by att.centro, dco.descricao";

        String queryPermanencias = "select centro, dco.descricao, count(*) as permanencias "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "where dco.descricao = 'Permanência' "
                + "group by att.centro, dco.descricao";

        Map<String, Object> retorno = new HashMap<String, Object>();

        List<Map<String, Object>> atendimentos = jdbcTemplate.query(queryTotalAtendimento, new MapRowMapper());
        retorno.put("atendimentos", atendimentos);
        List<Map<String, Object>> trancamentosCancelamentosTransferencias = jdbcTemplate.query(queryTrancamentosCancelamentosTransferencias, new MapRowMapper());
        retorno.put("trancamentosCancelamentosTransferencias", trancamentosCancelamentosTransferencias);
        List<Map<String, Object>> permanencias = jdbcTemplate.query(queryPermanencias, new MapRowMapper());
        retorno.put("permanencias", permanencias);

        return retorno;
    }

    public Map<String, Object> getResumoMotivos() {
        String queryResumoMotivos = "select atm.id as idMotivo, atm.descricao as motivo, count(*) as atendimentos "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "inner join atendimentomotivo atm on atm.id = att.motivo "
                + "where dco.descricao = 'Permanência' "
                + "group by att.centro, atm.id, atm.descricao";

        Map<String, Object> retorno = new HashMap<String, Object>();

        List<Map<String, Object>> resumoMotivos = jdbcTemplate.query(queryResumoMotivos, new MapRowMapper());
        retorno.put("resumoMotivos", resumoMotivos);

        return retorno;
    }

    public Map<String, Object> getMotivos() {
        String queryMotivos = "select atm.id as idMotivo, atm.descricao as motivo, count(*) as atendimentos "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join atendimentomotivo atm on atm.id = att.motivo "
                + "group by att.centro, atm.id, atm.descricao";

        Map<String, Object> retorno = new HashMap<String, Object>();

        List<Map<String, Object>> motivos = jdbcTemplate.query(queryMotivos, new MapRowMapper());
        retorno.put("motivos", motivos);

        return retorno;
    }
}
