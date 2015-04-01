package br.unicesumar.escoladeti2015time04.usuario;


import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class UsuarioService {
    @Autowired
    private UsuarioRepository repoUsuario;
    
    public void salvar(Usuario usuario){ 
        usuario.setStatus(true);
        repoUsuario.save(usuario); 
    }
    
    public void editar(Usuario usuario){
        repoUsuario.save(usuario);
    }
    
    public List<Usuario> listar(){
        return repoUsuario.findAll();
    }
    
    public void inativar(Long id , boolean status){
        Usuario usuario = repoUsuario.getOne(id);
        usuario.setStatus(status);
        repoUsuario.save(usuario);            
    }
    
    
}
