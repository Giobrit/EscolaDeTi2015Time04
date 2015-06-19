package br.unicesumar.escoladeti2015time04.utils.WSLyceumClient;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("lyceumClient/aluno")
public class WSLyceumClientController {

    private RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(value = "/{ra}", method = RequestMethod.GET)
    public AlunoAtendimentoDeixarOCurso findByAluno(@PathVariable Long ra) {
        AlunoAtendimentoDeixarOCurso aluno = restTemplate.getForObject("http://localhost:9097/lyceum/aluno/" + ra, AlunoAtendimentoDeixarOCurso.class);
        return aluno;
    }
}
