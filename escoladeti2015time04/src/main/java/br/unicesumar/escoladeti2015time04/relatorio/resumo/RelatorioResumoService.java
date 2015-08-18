package br.unicesumar.escoladeti2015time04.relatorio.resumo;

import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class RelatorioResumoService {

    public Map<String,Object> getResumoCursoAtendimentos() {
        return null;
    }

    public Map<String,Object> getResumoCursoAlunos() {
        return null;
    }
    
    public Map<String,Object> getResumoMotivos(){
        return null;
    }
    
    public Map<String,Object> getMotivos(){
        return null;
    }
}
