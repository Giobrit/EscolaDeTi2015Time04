package br.unicesumar.webservicelyceum.aluno;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("lyceum/aluno")
public class AlunoController {

    @Autowired
    private AlunoService service;

    @RequestMapping(value = "/{ra}", method = RequestMethod.GET)
    public Aluno pegarAluno(@PathVariable Long ra) {
        return service.pegarAluno(ra);
    }
}
