package br.unicesumar.escoladeti2015time04.relatorio.centro;

import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class RelatorioCentroService {
    
    public Map<String,Object> getCentroCursoAtendimento(String centro) {
        String  queryTotalAtenditmentos = "select count(*) as atendimentos"
                + "from antedimento  att "
                + "inner join atendimentodeixarocurso atdc on att.id = atdc.id "
                + "where centro = :centro"
                + "group by att.centro ";
        
        String queryTrancamentosCancelamentosTransferencias = "select count(*)"
                + "as trancamentoscancelamentostransferencias "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on att.id = atdc.id "
                + "inner join deixarocursoobjetivo dco on dco.id = adct.objetivo "
                + "where dco.descricao in('Trancamento', 'Cancelamento', 'Tranferência') "
                + "and  att.centro = :centro "
                + "group by att.centro";
        
        String queryPermanencias = "select count(*) as permanencias "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on atdc.id = att.id "
                + "inner join deixarocursoobjetivo dco on dco.id = atdc.objetivo "
                + "where descricao = 'Permanencia' "
                + "and att.centro = :centro "
                + "group by att.centro";   
                               
        return null;    
    }

    public Map<String,Object> getCentroCursoAlunos() {
        
        return null;
    }
    
    public Map<String,Object> getCentroMotivosPorCurso(){
        String queryMotivosPorCurso = "select count(*) as motivos "
                + "from atendimento att "
                + "inner join atendimentodeixarocurso atdc on att.id = atdc.id "
                + "inner join deixarcursoobjetivo dco on dco.motivo = att.id "
                + "where att.centro = :centro "
                + "and att.curso = :curso "
                + "group by att.centro, atdc.motivo ";
                       
        return null;
    }
    
    public Map<String,Object> getCentroResumoMotivos(){
       String queryResumoMotivos = "select count (*) as motivos "
               + "from atendimento att "
               + "inner join atendimentodeixarocurso atdc on att.id = atdc.id "
               + "inner join deixarocursoobjetivo dco on dco.motivo = att.id "
               + "where att.centro = :centro "
               + "group by atdc.motivo";
        
        return null;
    }
}
