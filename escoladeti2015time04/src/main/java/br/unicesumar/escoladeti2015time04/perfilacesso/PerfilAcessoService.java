package br.unicesumar.escoladeti2015time04.perfilacesso;

import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcesso;
import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcessoService;
import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class PerfilAcessoService {

    @Autowired
    private PerfilAcessoRepository perfilRepository;
    @Autowired
    private ItemAcessoService itemAcessoService;
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public void salvar(CriarPerfilAcessoCommand command) {
        if (existePerfil(command.getNome())) {
            throw new IllegalArgumentException("Já existe Perfil de acesso com o mesmo nome.");
        }
        if (command.getNome().isEmpty()) {
            throw new IllegalArgumentException("É obrigatório informar um nome para o perfil.");
        }

        if (command.getConjuntoItemAcessoIds().size() == 0) {
            throw new IllegalArgumentException("O perfil deve possuir ao menos um item de acesso.");
        }

        Set<ItemAcesso> lista = new HashSet<>();
        lista.addAll(itemAcessoService.findAllSet(command.getConjuntoItemAcessoIds()));

        PerfilAcesso perfil = new PerfilAcesso(command.getNome());
        perfil.setConjuntoItemAcesso(lista);

        perfilRepository.save(perfil);
    }

    public void editar(EditarPerfilAcessoCommand command) {
        if (command.getNome().isEmpty()) {
            throw new IllegalArgumentException("É obrigatório informar um nome para o perfil.");
        }

        if (command.getConjuntoItemAcessoIds().size() == 0) {
            throw new IllegalArgumentException("O perfil deve possuir ao menos um item de acesso.");
        }

        Set<ItemAcesso> lista = new HashSet<>();
        lista.addAll(itemAcessoService.findAllSet(command.getConjuntoItemAcessoIds()));

        PerfilAcesso perfil = new PerfilAcesso(command.getId(), command.getNome());
        perfil.setConjuntoItemAcesso(lista);
        perfilRepository.save(perfil);
    }

    public void remover(Long id) {
        /*Precisa verificar se existe este perfil em algum usuario, caso "sim" dar a mensagem que possui 
         cadastro com este perfil(Aguardando vinculo com perfil-usuario)*/

        perfilRepository.delete(id);
    }

    public List<Map<String, Object>> listarPerfilAcesso() {
        List<Map<String, Object>> listaDePerfil;
        listaDePerfil = jdbcTemplate.query(""
                + "select "
                + "p.nome,"
                + "p.id "
                + "from perfilacesso p", new MapSqlParameterSource(), new MapRowMapper());

        return listaDePerfil;
    }

    public Map<String, Object> findById(Long id) {
        final MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        List<Map<String, Object>> perfis = jdbcTemplate.query(""
                + "select p.id,"
                + "p.nome "
                + "from perfilacesso p "
                + "where p.id = :id", params, new MapRowMapper());

        if (perfis.isEmpty()) {
            throw new IllegalArgumentException("Perfil não existe!");
        }

        Map<String, Object> perfil = perfis.get(0);

        List<Map<String, Object>> itensAcessoIds = jdbcTemplate.query("select ip.itemacesso_id as id "
                + "from itemacesso_perfilacesso ip "
                + "where perfilacesso_id = :id", params, new MapRowMapper());

        perfil.put("itemAcesso", itemAcessoService.findAll(itensAcessoIds));

        return perfil;
    }

    public Boolean existePerfil(String nome) {
        final MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("nome", nome);
        List<Map<String, Object>> perfil;
        perfil = jdbcTemplate.query(""
                + "select "
                + "p.id,"
                + "p.nome "
                + "from perfilacesso p "
                + "where lower(p.nome) = lower(:nome)", params, new MapRowMapper());
        if (perfil.size() > 0) {
            return true;
        }
        return false;
    }

}
