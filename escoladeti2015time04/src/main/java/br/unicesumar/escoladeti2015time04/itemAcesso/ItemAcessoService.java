package br.unicesumar.escoladeti2015time04.itemAcesso;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.ArrayList;
import java.util.Collection;
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
public class ItemAcessoService {

    @Autowired
    private NamedParameterJdbcTemplate repositorio;

    @Autowired
    private ItemAcessoRepository itemAcessoRepository;

    public boolean existemItensAcesso() {
        final List<Map<String, Object>> ItensAcesso = ItemAcessoService.this.findAll();
        if (ItensAcesso.size() < 1) {
            return false;
        }
        return true;
    }

    public List<Map<String, Object>> findAll() {
        List<Map<String, Object>> itensAcesso = repositorio.query("select id, "
                + "descricao, "
                + "rota from itemAcesso", new MapSqlParameterSource(), new MapRowMapper());

        return itensAcesso;
    }

    public List<Map<String, Object>> findAll(Collection<Long> ids) {
        if (ids.isEmpty()) {
            throw new IllegalArgumentException("Devem ser passados ids para o find");
        }

        String in = "(";
        for (Long id : ids) {
            in += id + ",";
        }

        in = in.substring(0, in.length() - 1);
        in += ")";

        List<Map<String, Object>> itensAcesso = repositorio.query("select id, "
                + "descricao, "
                + "rota from itemAcesso where id in" + in, new MapSqlParameterSource(), new MapRowMapper());

        return itensAcesso;
    }

    public List<Map<String, Object>> findById(Long id) {
        final MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        List<Map<String, Object>> itensAcesso = repositorio.query("select ia.id, "
                + "ia.descricao, "
                + "ia.rota, "
                + "ia.superior from itemAcesso ia whre ia.id = :id", params, new MapRowMapper());

        return itensAcesso;
    }

    public List<Map<String, Object>> findBySuperior(Long idSuperior) {
        final MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("idSuperior", idSuperior);

        List<Map<String, Object>> itensAcesso = repositorio.query("select ia.id, "
                + "ia.descricao, "
                + "ia.rota, "
                + "ia.superior from itemAcesso ia whre ia.superior = :idSuperior", params, new MapRowMapper());

        return itensAcesso;
    }

    public void add(ItemAcesso itemAcesso) {
        itemAcessoRepository.save(itemAcesso);
    }

    public Set<ItemAcesso> findAllSet(Collection<Long> ids) {
        Set<ItemAcesso> conjunto = new HashSet<>();

        conjunto.addAll(itemAcessoRepository.findAll(ids));

        return conjunto;
    }

    public List<Map<String, Object>> findAll(List<Map<String, Object>> mapIds) {
        List<Long> ids = new ArrayList<>();

        for (Map<String, Object> mapId : mapIds) {
            Long id = (Long) mapId.get("id");

            ids.add(id);
        }

        return ItemAcessoService.this.findAll(ids);
    }
}
