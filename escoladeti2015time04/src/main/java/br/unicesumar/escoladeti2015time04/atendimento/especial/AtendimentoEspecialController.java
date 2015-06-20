package br.unicesumar.escoladeti2015time04.atendimento.especial;

import br.unicesumar.escoladeti2015time04.utils.listagem.RequisicaoListagem;
import br.unicesumar.escoladeti2015time04.utils.listagem.ResultadoListagem;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/atendimento/especial")
public class AtendimentoEspecialController {
    
    @Autowired
    private AtendimentoEspecialService service;
    
    @RequestMapping(value = "/listar", method = RequestMethod.POST)
    public ResultadoListagem<AtendimentoEspecial> listar(@RequestBody RequisicaoListagem requisicaoListagem) {
        return this.service.listar(requisicaoListagem);
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Map<String, Object> localizar(@PathVariable Long id) {
        return this.service.localizar(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public void criarAtendimentoEspecial(@RequestBody AtendimentoEspecialCommandInserir atendimentoEspecial) {
        this.service.criar(atendimentoEspecial);
    }
    
    @RequestMapping(method = RequestMethod.PUT)
    public void editarAtendimentoEspecial(@RequestBody AtendimentoEspecialCommandEditar atendimentoEspecial)  {
       this.service.editar(atendimentoEspecial); 
    }    
    
}
