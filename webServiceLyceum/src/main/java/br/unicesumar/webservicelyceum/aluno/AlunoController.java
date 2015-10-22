package br.unicesumar.webservicelyceum.aluno;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.io.IOUtils;
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
    public Map<String, Object> pegarAluno(@PathVariable String ra) {
        final List<Map<String, Object>> aluno = service.pegarAluno(ra);

        InputStream input = getClass().getClassLoader().getResourceAsStream("fotos/" + ra + ".jpg");

        byte[] bytesFotos = {};

        try {
            bytesFotos = IOUtils.toByteArray(input);
        } catch (IOException ex) {
            Logger.getLogger(AlunoController.class.getName()).log(Level.SEVERE, null, ex);
        }

        aluno.get(0).put("bytesFoto", byteToByte(bytesFotos));

        return aluno.get(0);
    }

    private Byte[] byteToByte(byte[] array) {
        Byte[] array2 = new Byte[array.length];
        for (int i = 0; i < array.length; i++) {
            array2[i] = array[i];
        }
        return array2;
    }
}
