package br.unicesumar.escoladeti2015time04.usuario;

import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcessoService;
import br.unicesumar.escoladeti2015time04.perfilacesso.PerfilAcessoService;
import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import br.unicesumar.escoladeti2015time04.utils.excecoes.LoginFalhou;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class UsuarioService extends Service<Usuario, UsuarioRepository, UsuarioCommandEditar> {

    @Autowired
    private PerfilAcessoService perfilAcessoService;
    @Autowired
    private ItemAcessoService itemAcessoService;

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
    public Map<String, Object> localizar(Long id) {
        Map<String, Object> usuario = super.localizar(id);

        usuario.put("perfisDeAcesso", localizarPerfisDoUsuario(id));
        usuario.put("itensAvulsos", localizarItensAvulsos(id));

        return usuario;
    }

    @Override
    protected Class<Usuario> getClassEntity() {
        return Usuario.class;
    }

    public Map<String, Object> logar(UsuarioCommandLogar usuarioLogar) {
        String queryVerificaSeLogou = "select id from usuario where status = 'ATIVO' and (login = :loginOuEmail or email = :loginOuEmail) and senha = :senha";

        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("loginOuEmail", usuarioLogar.getLoginOuEmail());
        parans.addValue("senha", usuarioLogar.getSenha().getSenha());

        try {
            return jdbcTemplate.queryForObject(queryVerificaSeLogou, parans, new MapRowMapper());
        } catch (Exception e) {
            throw new LoginFalhou();
        }
    }

    public List<Map<String, Object>> localizarPermissoes(Long id) {
        String query = ""
                + "select "
                + "ia.*  "
                + "from itemacesso ia "
                + "inner join usuario u on u.id = :idUsuario "
                + "inner join usuario_perfildeacesso upa on upa.idusuario = u.id "
                + "inner join perfilacesso pa on pa.id = upa.idperfilacesso "
                + "inner join perfilacesso_itemacesso paia on paia.idperfilacesso = pa.id and paia.iditemacesso = ia.id ";

        String queryGrupo = query + "where ia.grupo is true";
        String queryFolha = query + "where ia.grupo is false and ia.superior = :idSuperior";

        MapSqlParameterSource paransGrupos = new MapSqlParameterSource();
        paransGrupos.addValue("idUsuario", id);

        List<Map<String, Object>> permissoes = jdbcTemplate.query(queryGrupo, paransGrupos, new MapRowMapper());

        for (Map<String, Object> permissao : permissoes) {
            MapSqlParameterSource paransFolhas = new MapSqlParameterSource();
            paransFolhas.addValue("idUsuario", id);
            paransFolhas.addValue("idSuperior", permissao.get("id"));
            
            List<Map<String, Object>> folhas = jdbcTemplate.query(queryFolha, paransFolhas, new MapRowMapper());

            permissao.put("inferiores", folhas);
        }

        return permissoes;
    }

    public void alterarSenha(UsuarioCommandEditarSenha usuarioAlterarSenha) {
        Usuario usuarioEditandoSenha = super.repository.findOne(usuarioAlterarSenha.getId());
        usuarioEditandoSenha.setSenha(usuarioAlterarSenha.getSenha());

        super.repository.save(usuarioEditandoSenha);
    }

    private List<Map<String, Object>> localizarPerfisDoUsuario(Long id) {
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("idUsuario", id);
        String sqlPerfilAcesso = ""
                + "select pa.* from usuario_perfildeacesso upa\n"
                + "inner join usuario u on u.id = upa.idusuario\n"
                + "inner join perfilacesso pa on pa.id = upa.idperfilacesso\n"
                + "where upa.idusuario = :idUsuario";

        final List<Map<String, Object>> perfisDeAcesso = jdbcTemplate.query(sqlPerfilAcesso, parans, new MapRowMapper());

        for (Map<String, Object> perfilAcesso : perfisDeAcesso) {
            List<Map<String, Object>> itemAcesso = perfilAcessoService.localizarItensAcesso((Long) perfilAcesso.get("id"));

            perfilAcesso.put("itensAcesso", itemAcesso);
        }

        return perfisDeAcesso;
    }

    private List<Map<String, Object>> localizarItensAvulsos(Long id) {
        MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("idUsuario", id);
        String sqlPerfilAcesso = ""
                + "select ia.* from itemavulso ia\n"
                + "inner join usuario u on u.id = ia.idusuario\n"
                + "where ia.idusuario =:idUsuario";

        List<Map<String, Object>> itensAvulsos = jdbcTemplate.query(sqlPerfilAcesso, parans, new MapRowMapper());

        for (Map<String, Object> itemAvulso : itensAvulsos) {
            Map<String, Object> itemAcesso = itemAcessoService.findById((Long) itemAvulso.get("iditemacesso"));

            itemAvulso.put("itemAcesso", itemAcesso);
        }

        return itensAvulsos;
    }

}
