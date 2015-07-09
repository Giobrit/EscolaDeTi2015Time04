package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.utils.listagem.RequisicaoListagem;
import br.unicesumar.escoladeti2015time04.utils.listagem.ResultadoListagem;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/atendimento/deixarOCurso")
public class AtendimentoDeixarOCursoController {
    
    @Autowired
    private AtendimentoDeixarOCursoService service;
    
    @RequestMapping(value = "/listar", method = RequestMethod.POST)
    public ResultadoListagem<AtendimentoDeixarOCurso> listar(@RequestBody RequisicaoListagem requisicaoListagem) {
        return this.service.listar(requisicaoListagem);
    }
    
    @RequestMapping(value = "/coordenadoresCadastrados", method = RequestMethod.GET)
    public List<String> recuperarCoordenadores (){
        return this.service.recuperarCoordenadores();
    }
    
    @RequestMapping(value = "/transferenciasCadastradas", method = RequestMethod.GET)
    public List<String> recuperarTransferencias (){
        return this.service.recuperarTransferencias();
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Map<String, Object> localizar(@PathVariable Long id) {
        return this.service.localizar(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public void criarAtendimentoDeixarOCurso(@RequestBody AtendimentoDeixarOCursoCommandInserir atendimentoDeixarOCurso) {
        this.service.criar(atendimentoDeixarOCurso);
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    public void editarAtendimentoDeixarOCurso(@RequestBody AtendimentoDeixarOCursoCommandEditar atendimentoDeixarOCurso)  {
       this.service.editar(atendimentoDeixarOCurso); 
    }
    
    
}
