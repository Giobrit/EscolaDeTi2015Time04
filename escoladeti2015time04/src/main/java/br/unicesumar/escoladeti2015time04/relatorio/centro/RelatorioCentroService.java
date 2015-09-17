package br.unicesumar.escoladeti2015time04.relatorio.centro;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class RelatorioCentroService {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public Map<String, Object> getCentroCursoAtendimento(String centro) {
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue(":centro", centro);

        String queryTotalAtenditmentos = "select count(*) as atendimentos"
                + "from antedimento  att "
                + "inner join atendimentodeixarocurso atdc on att.id = atdc.id "
                + "where centro = :centro"
                + "group by att.curso ";

        String queryTrancamentosCancelamentosTransferencias = "select count(*)"
                + "as trancamentoscancelamentostransferencias "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on att.id = atdc.id "
                + "inner join deixarocursoobjetivo dco on dco.id = adct.objetivo "
                + "where dco.descricao in('Trancamento', 'Cancelamento', 'Tranferência') "
                + "and  att.centro = :centro "
                + "group by att.curso";

        String queryPermanencias = "select count(*) as permanencias "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "where descricao = 'Permanencia' "
                + "and att.centro = :centro "
                + "group by att.curso";
        Map<String, Object> retorno = new HashMap<String, Object>();

        List<Map<String, Object>> atendimentos = jdbcTemplate.query(queryTotalAtenditmentos, new MapRowMapper());
        retorno.put("atendimentos", atendimentos);
        List<Map<String, Object>> trancamentosCancelamentosTransferencias = jdbcTemplate.query(queryTrancamentosCancelamentosTransferencias, new MapRowMapper());
        retorno.put("trancamentosCancelamentosTransferencias", trancamentosCancelamentosTransferencias);
        List<Map<String, Object>> permanencias = jdbcTemplate.query(queryPermanencias, new MapRowMapper());
        retorno.put("permanencias", permanencias);       

        return retorno;
    }

    public Map<String, Object> getCentroCursoAlunos() {
        String queryTotalAlunos = "select count(*) as alunos"
                + "from alunos_atendimento_deixarocurso aad "
                + "inner join atendimentodeixarocurso atdc on aad.id = atdc.id "
                + "where aad.centro = :centro "
                + "group by aad.curso";

        String queryTrancamentosCancelamentosTransferencias = "select count(*) as alunos "
                + "from alunos_atendimento_deixarocurso aad "
                + "inner join atendimentodeixarocurso atdc on aad.id = atdc.id "
                + "inner join deixarocursoobjetivo dco on dco.id = adct.objetivo "
                + "where dco.descricao in('Trancamento', 'Cancelamento', 'Tranferência') "
                + "and  aad.centro = :centro "
                + "group by aad.curso";

        String queryPermanencias = "select count(*) as permanencias "
                + "from atendialunos_atendimento_deixarocursomento add "
                + "inner join atendimentodeixarocurso atdc on aad.id = atdc.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "where descricao = 'Permanencia' "
                + "and add.centro = :centro "
                + "group by aad.curso";

        Map<String, Object> retorno = new HashMap<String, Object>();

        List<Map<String, Object>> alunos = jdbcTemplate.query(queryTotalAlunos, new MapRowMapper());
        retorno.put("alunos", alunos);
        List<Map<String, Object>> trancamentosCancelamentosTransferencias = jdbcTemplate.query(queryTrancamentosCancelamentosTransferencias, new MapRowMapper());
        retorno.put("trancamentosCancelamentosTransferencias", trancamentosCancelamentosTransferencias);
        List<Map<String, Object>> permanencias = jdbcTemplate.query(queryPermanencias, new MapRowMapper());
        retorno.put("permanencias", permanencias);

        return retorno;
    }

    public Map<String, Object> getCentroMotivosPorCurso() {

        String queryCentroMotivosPorCurso = "select count(*) as motivos "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on att.id = atdc.id "
                + "inner join deixarcursoobjetivo dco on dco.motivo = att.id "
                + "where att.centro = :centro "
                + "and att.curso = :curso "
                + "group by att.centro, atdc.motivo ";

        Map<String, Object> retorno = new HashMap<String, Object>();

        List<Map<String, Object>> centroMotivos = jdbcTemplate.query(queryCentroMotivosPorCurso, new MapRowMapper());
        retorno.put("centroMotivos", centroMotivos);

        return retorno;
    }

    public Map<String, Object> getCentroResumoMotivos() {

        String queryCentroResumoMotivos = "select count (*) as motivos "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on att.id = atdc.id "
                + "inner join deixarocursoobjetivo dco on dco.motivo = att.id "
                + "where att.centro = :centro "
                + "group by atdc.motivo";

        Map<String, Object> retorno = new HashMap<String, Object>();

        List<Map<String, Object>> motivos = jdbcTemplate.query(queryCentroResumoMotivos, new MapRowMapper());
        retorno.put("motivos", motivos);

        return retorno;
    }
}
