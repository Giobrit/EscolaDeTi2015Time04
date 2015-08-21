package br.unicesumar.webservicelyceum.notasAlunoDisciplina;

import br.unicesumar.webservicelyceum.utils.MapRowMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class NotasAlunoDisciplinaService {
    @Autowired
    private NotasAlunoDisciplinaRepository repository;
    
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    
    public void criar(NotasAlunoDisciplina notas){
        repository.save(notas);
    }
}
