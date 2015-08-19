package br.unicesumar.webservicelyceum.aluno.relatorios;

import br.unicesumar.webservicelyceum.utils.MapRowMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class HistoricoGeral {
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    
    public Map<String, Object> pegarHistoricoGeral(String ra){
        
        List<Map<String, Object>> cabecalho = pegaCabecalhoDoHistorico(ra);
        List<Map<String, Object>> disciplinas = pegaDisciplinasDoAluno(ra);
        
        
        Map<String, Object> retorno = new HashMap<String, Object>();
        retorno.put("cabecalho", cabecalho);
        retorno.put("", ra);
        
        return retorno;
    }
    
    private List<Map<String, Object>> pegaCabecalhoDoHistorico(String ra){
        String sqlCabecalho = "SELECT " 
                            +"     curso.unidade AS unidade, " 
                            +"     CONCAT(curso.codigo,' - ',curso.nome) AS curso, " 
                            +"     CONCAT(aluno.ra,' - ',aluno.nome) AS aluno, " 
                            +"     CONCAT(curso.codigo,'_',SUBSTRING(aluno.periodo FROM 1 FOR 1), "
                            +"           '_',DATE_PART('YEAR', aluno.ano_inicio)) AS curriculo,  " 
                            +"     aluno.situacao AS situacao " 
                            +"FROM " 
                            +"     curso INNER JOIN aluno ON curso.id = aluno.id_curso " 
                            +"WHERE aluno.ra = :ra";
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("ra", ra);
        return jdbcTemplate.query(sqlCabecalho, parameters, new MapRowMapper());
    }

    private List<Map<String, Object>> pegaDisciplinasDoAluno(String ra) {
        String sqlDisciplinas = "";
        
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("ra", ra);
        return jdbcTemplate.query(sqlDisciplinas, parameters, new MapRowMapper());
    }
}
