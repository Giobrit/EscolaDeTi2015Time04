package br.unicesumar.escoladeti2015time04.relatorio.centro;

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
    
    @RequestMapping(value = "/relatorioCentroCursoAtendimentos", method = RequestMethod.GET)    
    public Map<String,Object> listarCentroCursoAtendimento(){
        return service.getCentroCursoAtendimento(null);
    }
    
    @RequestMapping(value = "/relatorioCentroCursoAlunos", method = RequestMethod.GET)    
    public Map<String,Object> listarCentroCursoAlunos(){
        return service.getCentroCursoAlunos();
    } 
    
    @RequestMapping(value = "/relatorioCentroMotivosPorCurso", method = RequestMethod.GET)    
    public Map<String,Object> listarCentroMotivosPorCurso(){
        return service.getCentroMotivosPorCurso();
    }
    
    @RequestMapping(value = "/relatorioCentroResumoMotivos", method = RequestMethod.GET)    
    public Map<String,Object> listarCentroResumoMotivos(){
        return service.getCentroResumoMotivos();
    }
}
