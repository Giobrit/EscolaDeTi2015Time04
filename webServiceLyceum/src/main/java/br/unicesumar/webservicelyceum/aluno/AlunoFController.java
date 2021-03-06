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
public class AlunoFController {

    @Autowired
    private AlunoService service;

    @RequestMapping(value = "/{ra}", method = RequestMethod.GET)
    public Map<String, Object> pegarAluno(@PathVariable String ra) {
        final List<Map<String, Object>> aluno = service.pegarAluno(ra);

        return aluno.get(0);
    }

    @RequestMapping(value = "/foto/{ra}", method = RequestMethod.GET)
    public Byte[] pegarFotoAluno(@PathVariable String ra) {
        InputStream input = getClass().getClassLoader().getResourceAsStream("fotos/" + ra + ".jpg");

        byte[] bytesFotos = {};

        try {
            bytesFotos = IOUtils.toByteArray(input);
        } catch (IOException ex) {
            Logger.getLogger(AlunoFController.class.getName()).log(Level.SEVERE, null, ex);
        }

        return byteToByte(bytesFotos);
    }

    private Byte[] byteToByte(byte[] array) {
        Byte[] array2 = new Byte[array.length];
        for (int i = 0; i < array.length; i++) {
            array2[i] = array[i];
        }
        return array2;
    }
}
