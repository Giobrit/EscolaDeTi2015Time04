package br.unicesumar.escoladeti2015time04.usuario;


import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class UsuarioService {
    @Autowired
    private UsuarioRepository repoUsuario;
    
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    
    public void salvar(Usuario usuario){ 
        usuario.setStatus(Status.ATIVO);
        repoUsuario.save(usuario); 
    }
    
    public void editar(Usuario usuario){
        repoUsuario.save(usuario);
    }
    
    public List<Map<String, Object>> listar(){
        return jdbcTemplate.query("select nome, login, email from usuario", new MapSqlParameterSource(), new MapRowMapper());
    }
    
    public void inativar(Long id , Status status){
        Usuario usuario = repoUsuario.getOne(id);                
        usuario.setStatus(status);  
        repoUsuario.save(usuario);            
    }
    
}
