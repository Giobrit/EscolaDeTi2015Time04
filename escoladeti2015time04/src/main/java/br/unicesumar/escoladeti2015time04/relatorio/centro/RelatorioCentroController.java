package br.unicesumar.escoladeti2015time04.relatorio.centro;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/relatorio/porcentro")
public class RelatorioCentroController {
    
    @Autowired
    private RelatorioCentroService service;
    
    @RequestMapping(value = "/relatorioCentroCursoAtendimentos/{centro}", method = RequestMethod.GET)    
    public Map<String,Object> listarCentroCursoAtendimento(@PathVariable String centro){
        return service.getCentroCursoAtendimento(centro);
    }
    
    @RequestMapping(value = "/relatorioCentroCursoAlunos", method = RequestMethod.GET)    
    public Map<String,Object> listarCentroCursoAlunos(){
        return service.getCentroCursoAlunos();
    } 
    
    @RequestMapping(value = "/relatorioCentroMotivosPorCurso/{centro}-{curso}", method = RequestMethod.GET)    
    public Map<String,Object> listarCentroMotivosPorCurso(@PathVariable String centro, @PathVariable String curso){
        return service.getCentroMotivosPorCurso(centro, curso);
    }
    
    @RequestMapping(value = "/relatorioCentroResumoMotivos/{centro}", method = RequestMethod.GET)    
    public Map<String,Object> listarCentroResumoMotivos(@PathVariable String centro){
        return service.getCentroResumoMotivos(centro);
    }
}
