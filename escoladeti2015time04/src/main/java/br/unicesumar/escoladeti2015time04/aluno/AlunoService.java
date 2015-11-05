package br.unicesumar.escoladeti2015time04.aluno;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
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
}
