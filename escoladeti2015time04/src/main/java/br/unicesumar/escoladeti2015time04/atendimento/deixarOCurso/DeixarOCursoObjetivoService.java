
package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import br.unicesumar.escoladeti2015time04.utils.listagem.RequisicaoListagem;
import br.unicesumar.escoladeti2015time04.utils.listagem.ResultadoListagem;
import java.util.List;
import java.util.Map;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;


public class DeixarOCursoObjetivoService {
    
    @Autowired
    private DeixarOCursoObjetivoRepository repository;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    protected Class<DeixarOCursoObjetivo> getClassEntity() {
       return DeixarOCursoObjetivo.class;
    }
    
    public void criar(DeixarOCursoObjetivo objetivo) {
        repository.save(objetivo);
    }

    public List<Map<String, Object>> listar() {
        return jdbcTemplate.query("select id, descricao from objetivo", new MapSqlParameterSource(), new MapRowMapper());
    }

    public DeixarOCursoObjetivo localizar(Long id) {
        return repository.findOne(id);
    }

    public void inativar(Long id, DeixarOCursoObjetivoStatus status) {
        DeixarOCursoObjetivo objetivo = repository.getOne(id);
        objetivo.setStatus(status);
        repository.save(objetivo);
    }

 

}
