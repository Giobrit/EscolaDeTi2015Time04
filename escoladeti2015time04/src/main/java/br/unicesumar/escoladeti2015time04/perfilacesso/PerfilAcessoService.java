package br.unicesumar.escoladeti2015time04.perfilacesso;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class PerfilAcessoService {
    @Autowired
    private PerfilAcessoRepository perfilRepository;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    
    public void salvar(PerfilAcesso perfilAcesso){
        perfilRepository.save(perfilAcesso);
    }
    
    public void editar(PerfilAcesso perfilAcesso){
        perfilRepository.save(perfilAcesso);
    }
    
    public void remover(Long id){
        /*Precisa verificar se existe este perfil em algum usuario, caso "sim" dar a mensagem que possui 
        cadastro com este perfil*/
        
        perfilRepository.delete(id);
    }
    
    public List<Map<String,Object>> listarPerfilAcesso(){
        List<Map<String,Object>> listaDePerfil;
        listaDePerfil = jdbcTemplate.query("select p.nome, p.id from perfil_acesso p", new MapRowMapper());
        
        return listaDePerfil;
    }
    
    public List<Map<String,Object>> listarItemAcesso(){
        List<Map<String,Object>> listaDeItens;
        listaDeItens = jdbcTemplate.query("select p.nome, p.id from perfil_acesso p", new MapRowMapper());
        
        return listaDeItens;
    }
}
