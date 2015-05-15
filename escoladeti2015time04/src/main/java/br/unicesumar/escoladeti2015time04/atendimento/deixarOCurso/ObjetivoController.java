
package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/objetivo")
public class ObjetivoController {
    
    @Autowired
    private ObjetivoService service;
    
    @RequestMapping (method = RequestMethod.POST)
    public void criar(@RequestBody Objetivo objetivo){
        service.criar(objetivo);
    }
    
    @RequestMapping (method = RequestMethod.GET)
    public List<Map<String, Object>> Listar(){
        return service.listar();
    }
    
    @RequestMapping (value= "/{id}", method = RequestMethod.GET)
    public Objetivo localizar(@PathVariable Long id) { 
        Objetivo objetivo = service.localizar(id);
        return objetivo;
    }
    
    @RequestMapping (value= "/{id}/{status}", method = RequestMethod.PUT)
        public void alterarStatus(@PathVariable Long id, @PathVariable Status status) { 
        this.service.inativar(id, status);
    }
    
}
