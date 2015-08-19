package br.unicesumar.escoladeti2015time04.relatorio.resumo;

import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class RelatorioResumoService {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    
    public Map<String, Object> getResumoCursoAtendimentos() {
        String queryTotalAtendimento = "select count(*) as atendimentos\n"
                + "from atendimento att \n"
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id \n"
                + "group by att.centro";

        String queryTrancamentosCancelamentosTransferencias = "select count(*) as trancamentoscancelamentostransferencias\n"
                + "from atendimento att\n"
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id\n"
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo\n"
                + "where dco.descricao in('Trancamento', 'Cancelamento', 'transferência')\n"
                + "group by att.centro";
        
        String queryPermanencias = "select count(*) as permanencias\n"
                + "from atendimento att\n"
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id\n"
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo\n"
                + "where dco.descricao = 'Permanência'\n"
                + "group by att.centro";
        
        Map<String, Object> retorno = new HashMap<String, Object>();
        
        List<Map<String, Object>> atendimentos = jdbcTemplate.query(queryTotalAtendimento, new MapRowMapper());        
        retorno.put("atendimentos", atendimentos);
        List<Map<String, Object>> trancamentosCancelamentosTransferencias = jdbcTemplate.query(queryTrancamentosCancelamentosTransferencias, new MapRowMapper());        
        retorno.put("trancamentosCancelamentosTransferencias", trancamentosCancelamentosTransferencias);        
        List<Map<String, Object>> permanencias = jdbcTemplate.query(queryPermanencias, new MapRowMapper());
        retorno.put("permanencias", permanencias);        
        
        System.out.print(retorno.toString());
        return null;
    }

    public Map<String, Object> getResumoCursoAlunos() {
        return null;
    }

    public Map<String, Object> getResumoMotivos() {
        return null;
    }

    public Map<String, Object> getMotivos() {
        return null;
    }
}
