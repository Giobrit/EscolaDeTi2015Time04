package br.unicesumar.escoladeti2015time04.relatorio.centro;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.swing.JOptionPane;
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
        parans.addValue("centro", centro);

        String queryTotalAtenditmentos = "select att.centro, att.curso, count(*) as atendimentos "
                + "from atendimento  att "
                + "inner join atendimentodeixarocurso atdc on att.id = atdc.id "
                + "where centro = :centro "
                + "group by att.centro, att.curso ";

        String queryTrancamentosCancelamentosTransferencias = "select att.centro, att.curso, count(*) "
                + "as trancamentoscancelamentostransferencias "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on att.id = atdc.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "where dco.descricao in('Trancamento', 'Cancelamento', 'Transferência') "
                + "and  att.centro = :centro "
                + "group by att.centro, att.curso";

        String queryPermanencias = "select att.centro, att.curso, count(*) as permanencias "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "where dco.descricao = 'Permanência' "
                + "and att.centro = :centro "
                + "group by att.centro, att.curso";
        Map<String, Object> retorno = new HashMap<String, Object>();

        List<Map<String, Object>> atendimentos = jdbcTemplate.query(queryTotalAtenditmentos, parans, new MapRowMapper());
        retorno.put("atendimentos", atendimentos);
        List<Map<String, Object>> trancamentosCancelamentosTransferencias = jdbcTemplate.query(queryTrancamentosCancelamentosTransferencias, parans, new MapRowMapper());
        retorno.put("trancamentosCancelamentosTransferencias", trancamentosCancelamentosTransferencias);
        List<Map<String, Object>> permanencias = jdbcTemplate.query(queryPermanencias, parans, new MapRowMapper());
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
                + "where dco.descricao in('Trancamento', 'Cancelamento', 'Transferência') "
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

    public Map<String, Object> getCentroMotivosPorCurso(String centro, String curso) {        
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("centro", centro);
        parans.addValue("curso", "%"+ curso +"%");
        
        String queryCentroMotivosPorCurso = "select atm.id as idMotivo, atm.descricao as motivo, count(*) as atendimentos "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "inner join atendimentomotivo atm on atm.id = att.motivo "
                + "where att.centro = :centro "
                + "and UPPER(att.curso) ILIKE UPPER(:curso) "
                + "group by att.centro, atm.id, atm.descricao";

        Map<String, Object> retorno = new HashMap<String, Object>();
        
        List<Map<String, Object>> centroMotivos = jdbcTemplate.query(queryCentroMotivosPorCurso, parans, new MapRowMapper());
        retorno.put("centroMotivos", centroMotivos);
        
        return retorno;
    }

    public Map<String, Object> getCentroResumoMotivos(String centro) {
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("centro", centro);
        
        String queryCentroResumoMotivos = "select atm.id as idMotivo, atm.descricao as motivo, count(*) as atendimentos "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "inner join atendimentomotivo atm on atm.id = att.motivo "
                + "where att.centro = :centro "
                + "group by att.centro, atm.id, atm.descricao";

        Map<String, Object> retorno = new HashMap<String, Object>();
        System.out.println(queryCentroResumoMotivos);
        List<Map<String, Object>> motivos = jdbcTemplate.query(queryCentroResumoMotivos, parans, new MapRowMapper());
        retorno.put("motivos", motivos);

        return retorno;
    }
}
