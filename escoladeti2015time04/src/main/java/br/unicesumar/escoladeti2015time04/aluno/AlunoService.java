package br.unicesumar.escoladeti2015time04.aluno;

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
    
    public Map<String, Object> getAtendimentosAluno(String ra){
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue(":ra", ra);
        
        String queryAtendimentoDeixarOCurso = "select data,  descricao, descricaopublica "
            +"from atendimento att"
            +"inner join atendimentodeixarocurso atdc on att.id = atdc.id"
            +"inner join atendimentomotivo atm on atdc.motivo = atm.id"
            +"where att.ra = '13002702'"
            +"order by data desc";
        
        
        return null;
    }
}
