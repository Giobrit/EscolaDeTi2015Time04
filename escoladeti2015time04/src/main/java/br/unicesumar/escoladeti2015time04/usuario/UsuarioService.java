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

    public void editar(Usuario usuario) {
        repoUsuario.save(usuario);
    }

    public List<Map<String, Object>> listar() {
        return listar("", "");
    }

    public List<Map<String, Object>> listar(Long numeroItens, Long paginaAtual) {
        String paginacao = "limit " + numeroItens + " offset " + (paginaAtual - 1) * numeroItens;

        return listar("", paginacao);
    }

    public List<Map<String, Object>> listar(Long numeroItens, Long paginaAtual, String filtro, String valor) {
        String filtros = "where lower(" + filtro + ") like '%" + valor.toLowerCase() + "%'";
        String paginacao = "limit " + numeroItens + " offset " + (paginaAtual - 1) * numeroItens;
        return listar(filtros, paginacao);
    }

    public List<Map<String, Object>> listar(String filtros, String paginacao) {
        String listarUsuario = "select id, nome, login, email, status from usuario ";

        listarUsuario += filtros + " order by nome " + paginacao;
        return jdbcTemplate.query(listarUsuario, new MapSqlParameterSource(), new MapRowMapper());
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

}
