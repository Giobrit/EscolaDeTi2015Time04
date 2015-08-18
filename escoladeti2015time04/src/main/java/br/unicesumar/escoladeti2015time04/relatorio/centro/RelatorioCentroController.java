package br.unicesumar.escoladeti2015time04.relatorio.centro;

import br.unicesumar.escoladeti2015time04.relatorio.resumo.RelatorioResumoService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/relatorio/resumo")
public class RelatorioCentroController {
    
    @Autowired
    private RelatorioCentroService service;
    
    @RequestMapping(value = "/relatorioCentroCursoAtendimento", method = RequestMethod.GET)    
    public Map<RelatorioResumoService,Object> listarCentroCursoAtendimento(){
        return null;
    }
    
    @RequestMapping(value = "/relatorioCentroCursoAlunos", method = RequestMethod.GET)    
    public Map<RelatorioResumoService,Object> listarCentroCursoAlunos(){
        return null;
    } 
    
    @RequestMapping(value = "/relatorioCentroMotivosPorCurso", method = RequestMethod.GET)    
    public Map<RelatorioResumoService,Object> listarCentroMotivosPorCurso(){
        return null;
    }
    
    @RequestMapping(value = "/relatorioCentroResumoMotivos", method = RequestMethod.GET)    
    public Map<RelatorioResumoService,Object> listarCentroResumoMotivos(){
        return null;
    }
}
