
package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;


public class ObjetivoService {
    
    @Autowired
    private ObjetivoRepository repository;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public void criar(Objetivo objetivo) {
        repository.save(objetivo);
    }

    public List<Map<String, Object>> listar() {
        return jdbcTemplate.query("select id, descricao from objetivo", new MapSqlParameterSource(), new MapRowMapper());
    }

    public Objetivo localizar(Long id) {
        return repository.findOne(id);
    }

    public void inativar(Long id, Status status) {
        Objetivo objetivo = repository.getOne(id);
        objetivo.setStatus(status);
        repository.save(objetivo);
    }
    
}
