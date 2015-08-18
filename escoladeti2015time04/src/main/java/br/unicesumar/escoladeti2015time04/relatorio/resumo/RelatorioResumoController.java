package br.unicesumar.escoladeti2015time04.relatorio.resumo;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/relatorio/resumo")
public class RelatorioResumoController {
    
    @Autowired
    private RelatorioResumoService service;
    
    @RequestMapping(value = "/relatorioResumoCursoAtendimentos", method = RequestMethod.GET)    
    public Map<String,Object> listarResumoCursoAtendimentos(){
        return service.getResumoCursoAtendimentos();
    }
    
    @RequestMapping(value = "/relatorioResumoCursoAlunos", method = RequestMethod.GET)    
    public Map<String,Object> listarResumoCursoAlunos(){
        return service.getResumoCursoAlunos();
    } 
    
    @RequestMapping(value = "/relatorioResumoMotivo", method = RequestMethod.GET)    
    public Map<String,Object> listarResumoMotivos(){
        return service.getResumoMotivos();
    }
    
    @RequestMapping(value = "/relatorioMotivos", method = RequestMethod.GET)    
    public Map<String,Object> listarMotivos(){
        return service.getMotivos();
    }
            
}
