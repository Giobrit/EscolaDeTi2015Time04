
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
public class DeixarOCursoObjetivoController {
    
    @Autowired
    private DeixarOCursoObjetivoService service;
    
    @RequestMapping (method = RequestMethod.POST)
    public void criar(@RequestBody DeixarOCursoObjetivo objetivo){
        service.criar(objetivo);
    }
    
    @RequestMapping (method = RequestMethod.GET)
    public List<Map<String, Object>> Listar(){
        return service.listar();
    }
    
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public DeixarOCursoObjetivo localizar(@PathVariable Long id) {
        return this.service.localizar(id);
    }
    
    @RequestMapping (value= "/{id}/{status}", method = RequestMethod.PUT)
        public void alterarStatus(@PathVariable Long id, @PathVariable DeixarOCursoObjetivoStatus status) { 
        this.service.inativar(id, status);
    }
    
}
