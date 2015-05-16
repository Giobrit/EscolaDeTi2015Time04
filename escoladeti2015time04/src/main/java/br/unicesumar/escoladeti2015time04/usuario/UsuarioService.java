package br.unicesumar.escoladeti2015time04.usuario;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import javax.transaction.Transactional;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class UsuarioService extends Service<Usuario, UsuarioRepository, UsuarioCommandEditar> {

    public void inativar(Long id, Status status) {
        Usuario usuario = repository.getOne(id);
        usuario.setStatus(status);
        repository.save(usuario);
    }

    @Override
    public void criar(Usuario usuario) {
        usuario.setStatus(Status.ATIVO);
        super.criar(usuario);
    }

    @Override
    protected Class<Usuario> getClassEntity() {
       return Usuario.class;
    }
    
    public Boolean logar(UsuarioCommandLogar usuarioLogar) {
        String queryVerificaSeLogou = "select id from usuario where status = 'ATIVO' and (login = :loginOuEmail or email = :loginOuEmail) and senha = :senha";

        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("loginOuEmail", usuarioLogar.getLoginOuEmail());
        parans.addValue("senha", usuarioLogar.getSenha().getSenha());

        Boolean logou;
        try {
            jdbcTemplate.queryForObject(queryVerificaSeLogou, parans, new MapRowMapper());
            logou = true;
        } catch (Exception e) {
            logou = false;
        }
        return logou;
    }

    public void alterarSenha(UsuarioCommandEditarSenha usuarioAlterarSenha) {
        Usuario usuarioEditandoSenha = super.repository.findOne(usuarioAlterarSenha.getId());
        usuarioEditandoSenha.setSenha(usuarioAlterarSenha.getSenha());
        
        super.repository.save(usuarioEditandoSenha);
    }
}
