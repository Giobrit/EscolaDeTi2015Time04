package br.unicesumar.escoladeti2015time04.perfilacesso;

import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcesso;
import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcessoService;
import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class PerfilAcessoService extends Service<PerfilAcesso, PerfilAcessoRepository, PerfilAcessoCommandEditar> {

    @Autowired
    private ItemAcessoService itemAcessoService;

    public void criar(PerfilAcessoCommandInserir command) {
        if (command.getNome() == null || command.getNome().isEmpty()) {
            throw new IllegalArgumentException("É obrigatório informar um nome para o perfil.");
        }

        if (existePerfil(command.getNome())) {
            throw new IllegalArgumentException("Já existe Perfil de acesso com o mesmo nome.");
        }

        if (command.getConjuntoItemAcessoIds().isEmpty()) {
            throw new IllegalArgumentException("O perfil deve possuir ao menos um item de acesso.");
        }

        Set<ItemAcesso> lista = new HashSet<>();
        lista.addAll(itemAcessoService.findAllSet(command.getConjuntoItemAcessoIds()));

        PerfilAcesso perfil = new PerfilAcesso(command.getNome());
        perfil.setItensDeAcesso(lista);

        repository.save(perfil);
    }

    public void editar(PerfilAcessoCommandEditar command) {
        if (command.getNome() == null || command.getNome().isEmpty()) {
            throw new IllegalArgumentException("É obrigatório informar um nome para o perfil.");
        }

        if (command.getItensDeAcesso().isEmpty()) {
            throw new IllegalArgumentException("O perfil deve possuir ao menos um item de acesso.");
        }

        Set<ItemAcesso> lista = new HashSet<>();
        lista.addAll(itemAcessoService.findAllSet(command.getItensDeAcesso()));

        PerfilAcesso perfil = new PerfilAcesso(command.getId(), command.getNome());
        perfil.setItensDeAcesso(lista);
        repository.save(perfil);
    }

    @Override
    public Map<String, Object> localizar(Long id) {
        final Map<String, Object> perfilAcesso = super.localizar(id);

        final String query = ""
                + " SELECT"
                + " id"
                + " from itemAcesso ia"
                + " inner join perfilacesso_itemacesso pfia on iditemacesso = ia.id "
                + " where "
                + " pfia.idperfilacesso = :idPerfilAcesso";

        final MapSqlParameterSource parans = new MapSqlParameterSource();
        parans.addValue("idPerfilAcesso", id);

        final List<Long> itensDeAcesso = jdbcTemplate.queryForList(query, parans, Long.class);
        
        perfilAcesso.put("itensDeAcesso", itensDeAcesso);
        
        return perfilAcesso; //To change body of generated methods, choose Tools | Templates.
    }

    public void remover(Long id) {
        /*Precisa verificar se existe este perfil em algum usuario, caso "sim" dar a mensagem que possui 
         cadastro com este perfil(Aguardando vinculo com perfil-usuario)*/

        repository.delete(id);
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

    @Override
    protected Class<PerfilAcesso> getClassEntity() {
        return PerfilAcesso.class;
    }

}
