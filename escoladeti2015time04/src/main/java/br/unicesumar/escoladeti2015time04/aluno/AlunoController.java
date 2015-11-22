package br.unicesumar.escoladeti2015time04.aluno;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/relatorioAcademico/aluno")
public class AlunoController {

    @Autowired
    private AlunoService service;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public List<Map<String, Object>> listarAtendimentosAluno(@RequestBody RequisicaoLinhaDoTempo requisicaoLinhaDoTempo) {
        return this.service.getAtendimentosAluno(requisicaoLinhaDoTempo.getRa(), requisicaoLinhaDoTempo.getFiltrosLinhaTempo());
    }
    
    @RequestMapping(value="/{ra}", method = RequestMethod.GET)
    public List<Map<String, Object>> motivos(@PathVariable String ra) {
        return this.service.getRelatorioMotivo(ra);
    }
    
    @RequestMapping(value="/quantidade/{ra}", method = RequestMethod.GET)
    public Map<String, Object> quantidadeAtendimento(@PathVariable String ra){
        return this.service.getRelatorioEstatistica(ra);
    }
}
