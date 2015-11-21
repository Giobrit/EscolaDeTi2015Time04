package br.unicesumar.escoladeti2015time04.aluno;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AlunoService {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getAtendimentosAluno(String ra, List<FiltroLinhaTempo> filtros) {
        if (filtros.size() == 0) {
            return new ArrayList<Map<String, Object>>();
        }

        MapSqlParameterSource parans = new MapSqlParameterSource();

        parans.addValue("ra", ra);

        String caseQuery = " ";
        String innerJoin = " ";
        String where = " ";

        for (Iterator<FiltroLinhaTempo> it = filtros.iterator(); it.hasNext();) {
            FiltroLinhaTempo filtro = it.next();

            caseQuery += filtro.getCase() + " ";
            innerJoin += filtro.getInnerJoin() + " ";
            where += filtro.getWhere();

            if (it.hasNext()) {
                where += " or ";
            }
        }

        String sql = "select "
                + "att.data, left( att.descricaopublica, 144 ) as descricao, atm.descricao as motivo, us.nome, "
                + "case "
                + caseQuery
                + " end  as nomeDoAtendimento "
                + "from atendimento att "
                + innerJoin
                + "inner join atendimentomotivo atm on atm.id = att.motivo "
                + "left join usuario us on att.usuariologado = us.id "
                + "where att.ra = :ra and ("
                + where
                + ")"
                + "order by data desc";
        //Map<String, Object> retorno = new HashMap<String, Object>();
        List<Map<String, Object>> atendimentos = jdbcTemplate.query(sql, parans, new MapRowMapper());
        //retorno.put("atendimentos", atendimentos);

        //System.out.print(retorno.toString());
        return atendimentos;
    }

    public List<Map<String, Object>> getRelatorioEstatistica(String ra) {
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("ra", ra);

        String sql = "select count(atdc.id) as atendimentoDeixarOCurso, count(atp.id) as atendimentoPreventivo, count(ate.id) as atendimentoEspecial "
                + "from atendimento att "
                + "left join (select id from atendimentodeixarocurso) atdc on atdc.id = att.id "
                + "left join (select id from atendimentopreventivo ) atp on atp.id = att.id "
                + "left join (select id from atendimentoespecial ) ate on ate.id = att.id "
                + "where att.ra = :ra";
        //Map<String, Object> retorno = new HashMap<String, Object>();
        List<Map<String, Object>> atendimentos = jdbcTemplate.query(sql, parans, new MapRowMapper());
        //retorno.put("atendimentos", atendimentos);

        //System.out.print(retorno.toString());
        return atendimentos;
    }

    public List<Map<String, Object>> getRelatorioMotivo(String ra) {
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("ra", ra);

        String sql = "select "
                + " atm.descricao as name, "
                + " count(atm.id) as y "
                + "from atendimento att "
                + "inner join atendimentomotivo atm on atm.id = motivo "
                + "where att.ra = :ra "
                + "group by atm.id ";

        String sqlQuantidadeTotal = "select"
                + " count(atm.id) as quantidade "
                + " from atendimento att "
                + " inner join atendimentomotivo atm on atm.id = motivo "
                + " where att.ra = :ra";

//Map<String, Object> retorno = new HashMap<String, Object>();
        List<Map<String, Object>> atendimentos = jdbcTemplate.query(sql, parans, new MapRowMapper());
        Long numeroTotalAtendimentosAluno = jdbcTemplate.queryForObject(sqlQuantidadeTotal, parans, Long.class);
        //retorno.put("atendimentos", atendimentos);

        for (Map<String, Object> atendimento : atendimentos) {
            atendimento.put("y", 100 * (Long) atendimento.get("y"));
            atendimento.put("y", (Long) atendimento.get("y") / numeroTotalAtendimentosAluno);
        }

        //System.out.print(retorno.toString());
        return atendimentos;
    }
}
