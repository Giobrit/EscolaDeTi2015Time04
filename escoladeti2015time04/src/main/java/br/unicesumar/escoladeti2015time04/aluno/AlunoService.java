package br.unicesumar.escoladeti2015time04.aluno;

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
public class AlunoService {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public Map<String, Object> getAtendimentosAluno(String ra) {
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue(":ra", ra);

        String queryAtendimentos = "select "
                + "att.data, att.descricaopublica as descricao, atm.descricao as motivo,"
                + "case"
                + "when ate.id is not null then 'Atendimento Especial'"
                + "when atdc.id is not null then 'Atendimento Deixar o Curso'"
                + "when atp.id is not null then 'Atendimento Preventivo'"
                + "end"
                + "from atendimento att"
                + "left join atendimentodeixarocurso atdc on att.id = atdc.id"
                + "inner join atendimentomotivo atm on atm.id = att.motivo"
                + "left join atendimentopreventivo atp on att.id = atp.id"
                + "left join atendimentoespecial ate on att.id = ate.id"
                + "where att.ra = ':ra'"
                + "order by data desc";

        Map<String, Object> retorno = new HashMap<String, Object>();

        List<Map<String, Object>> atendimentos = jdbcTemplate.query(queryAtendimentos, new MapRowMapper());
        retorno.put("atendimentos", atendimentos);

        System.out.print(retorno.toString());

        return null;
    }
}
