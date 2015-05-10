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

    public void salvar(Usuario usuario) {
        usuario.setStatus(Status.ATIVO);
        repoUsuario.save(usuario);
    }

    public void editar(UsuarioCommandEditar usuarioCommand) {
        Usuario usuario = repoUsuario.findOne(usuarioCommand.getId());
        usuario.setNome(usuarioCommand.getNome());
        usuario.setLogin(usuarioCommand.getLogin());
        usuario.setEmail(usuarioCommand.getEmail());
        usuario.setStatus(usuarioCommand.getStatus());
        repoUsuario.save(usuario);
    }

    public List<Map<String, Object>> listar() {
        return listar("", "", new MapSqlParameterSource());
    }

    public List<Map<String, Object>> listar(Long numeroItens, Long paginaAtual) {
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("limite", numeroItens);
        parans.addValue("inicio", (paginaAtual - 1) * numeroItens);
        String paginacao = "limit :limite offset :inicio";

        return listar("", paginacao, parans);
    }

    public List<Map<String, Object>> listar(Long numeroItens, Long paginaAtual, String valor) {
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("valorFiltro", "%" + valor.toLowerCase().trim() + "%");
        parans.addValue("status", valor.toLowerCase().trim());
        parans.addValue("limite", numeroItens);
        parans.addValue("inicio", (paginaAtual - 1) * numeroItens);

        String filtros = "where ";
        filtros += "lower(nome) like :valorFiltro or ";
        filtros += "lower(login) like :valorFiltro or ";
        filtros += "lower(email) like :valorFiltro or ";
        filtros += "lower(status) = :status";

        String paginacao = "limit :limite offset :inicio";
        return listar(filtros, paginacao, parans);
    }

    public List<Map<String, Object>> listar(String filtros, String paginacao, MapSqlParameterSource parans) {
        String listarUsuario = "select id, nome, login, email, status from usuario ";

        listarUsuario += filtros + " order by nome " + paginacao;
        return jdbcTemplate.query(listarUsuario, parans, new MapRowMapper());
    }

    public void inativar(Long id, Status status) {
        Usuario usuario = repoUsuario.getOne(id);
        usuario.setStatus(status);
        repoUsuario.save(usuario);
    }

    public Map<String, Object> localizar(Long id) {
        String listarUsuario = "select id, email, login, nome, status from usuario where id = :id";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        return jdbcTemplate.queryForObject(listarUsuario, params, new MapRowMapper());
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

}
