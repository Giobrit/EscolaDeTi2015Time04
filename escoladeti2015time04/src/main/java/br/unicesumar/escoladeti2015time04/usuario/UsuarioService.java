package br.unicesumar.escoladeti2015time04.usuario;

import br.unicesumar.escoladeti2015time04.utils.service.Service;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class UsuarioService extends Service<Usuario, UsuarioRepository, UsuarioCommandEditar> {

    public void inativar(Long id, Status status) {
        Usuario usuario = repositorio.getOne(id);
        usuario.setStatus(status);
        repositorio.save(usuario);
    }

    @Override
    public void salvar(Usuario usuario) {
        usuario.setStatus(Status.ATIVO);
        super.salvar(usuario);
    }

    
    @Override
    protected void setClassEntity() {
        super.tipoEntidade = Usuario.class;
    }

}
