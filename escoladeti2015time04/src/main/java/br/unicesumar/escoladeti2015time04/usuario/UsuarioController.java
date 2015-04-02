package br.unicesumar.escoladeti2015time04.usuario;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    
    @Autowired
    private UsuarioService service;
    
    @RequestMapping(method = RequestMethod.GET)
    public List<Map<String, Object>> listarUsuarios() {
        return jdbcTemplate.query("select * from usuario", new MapSqlParameterSource(), new MapRowMapper());
    }
    
    
    
    @RequestMapping(method = RequestMethod.POST)
    public void criarUsuario(@RequestBody Usuario usuario){
        this.service.salvar(usuario);
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    public void editarUsuario(@RequestBody Usuario usuario){
        this.service.editar(usuario);
    }
    
//    @RequestMapping(method = RequestMethod.GET)
//    public List<Usuario> listarUsuarios(){
//        return this.service.listar();
//                
//    }
    
@RequestMapping(value = "{id}/{status}", method = RequestMethod.PUT)
    public void alterarStatus(@PathVariable Long id, @PathVariable boolean status){
        this.service.inativar(id,status);
        
    }
}
