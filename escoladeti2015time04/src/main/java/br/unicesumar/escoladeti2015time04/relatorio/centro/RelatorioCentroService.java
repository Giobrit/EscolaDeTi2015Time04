package br.unicesumar.escoladeti2015time04.relatorio.centro;

import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class RelatorioCentroService {
    
    private Map<String,Object> getCentroCursoAtendimento() {
        return null;
    }

    private Map<String,Object> getCentroCursoAlunos() {
        return null;
    }
    
    private Map<String,Object> getCentroMotivosPorCruso(){
        return null;
    }
    
    private Map<String,Object> getCentroResumoMotivos(){
        return null;
    }
}
