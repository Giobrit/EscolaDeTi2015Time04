package br.unicesumar.escoladeti2015time04.relatorio.resumo;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/relatorio/centro")
public class RelatorioResumoController {
    
    @Autowired
    private RelatorioResumoService service;
    
    @RequestMapping(value = "/relatorioResumoCursoAtendimento", method = RequestMethod.GET)    
    public Map<RelatorioResumoService,Object> listarResumoCursoAtendimento(){
        return null;
    }
    
    @RequestMapping(value = "/relatorioResumoCursoAlunos", method = RequestMethod.GET)    
    public Map<RelatorioResumoService,Object> listarResumoCursoAlunos(){
        return null;
    } 
    
    @RequestMapping(value = "/relatorioResumoMotivo", method = RequestMethod.GET)    
    public Map<RelatorioResumoService,Object> listarResumoMotivo(){
        return null;
    }
    
    @RequestMapping(value = "/relatorioMotivos", method = RequestMethod.GET)    
    public Map<RelatorioResumoService,Object> listarMotivos(){
        return null;
    }
            
}
