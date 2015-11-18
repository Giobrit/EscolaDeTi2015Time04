package br.unicesumar.escoladeti2015time04.utils.WSLyceumClient;

import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("lyceumClient/")
public class WSLyceumClientController {

    private RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(value = "aluno/{ra}", method = RequestMethod.GET)
    public AlunoAtendimentoDeixarOCurso findByAluno(@PathVariable Long ra) {
        AlunoAtendimentoDeixarOCurso aluno = restTemplate.getForObject("http://localhost:9097/lyceum/aluno/" + ra, AlunoAtendimentoDeixarOCurso.class);

        return aluno;
    }

    @RequestMapping(value = "aluno/foto/{ra}", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    public byte [] findFotoByAluno(@PathVariable Long ra) {
        Byte[] foto = restTemplate.getForObject("http://localhost:9097/lyceum/aluno/foto/" + ra, (new Byte[]{}).getClass());

//        try {
//            OutputStream outputStream = response.getOutputStream();
//
//            outputStream.write(parseByteTobyte(foto));
//            outputStream.flush();
//            outputStream.close();
//
//        } catch (IOException ex) {
//            Logger.getLogger(WSLyceumClientController.class.getName()).log(Level.SEVERE, null, ex);
//        }
        
        return parseByteTobyte(foto);
    }

    @RequestMapping("mediaFaltas/{ra}")
    public void getRelatorioMediaFaltas(@PathVariable String ra, HttpServletResponse response) {
        Byte[] printMediaFaltas = restTemplate.getForObject("http://localhost:9097/lyceum/relatorio/mediaFaltas/" + ra, (new Byte[]{}).getClass());
        try {
            response.setHeader("Content-Disponsition", "inline; filename=mediaFaltas.pdf");

            OutputStream outputStream = response.getOutputStream();
            outputStream.write(parseByteTobyte(printMediaFaltas));
            outputStream.flush();
            outputStream.close();
        } catch (IOException ex) {
            Logger.getLogger(WSLyceumClientController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping("historicoGeral/{ra}")
    @SuppressWarnings("ConvertToTryWithResources")
    public void getRelatorioHistoricoGeral(@PathVariable String ra, HttpServletResponse response) {
        Byte[] printHistoricoGeral = restTemplate.getForObject("http://localhost:9097/lyceum/relatorio/historicoGeral/" + ra, (new Byte[]{}).getClass());
        try {
            response.setHeader("Content-Disponsition", "inline; filename=historicoGeral.pdf");

            OutputStream outputStream = response.getOutputStream();
            outputStream.write(parseByteTobyte(printHistoricoGeral));
            outputStream.flush();
            outputStream.close();
        } catch (IOException ex) {
            Logger.getLogger(WSLyceumClientController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @RequestMapping("nadaConsta/{ra}/{centro}")
    @SuppressWarnings("ConvertToTryWithResources")
    public void getRelatorioNadaConsta(@PathVariable String ra, @PathVariable String centro, HttpServletResponse response) {
        Byte[] printNadaConsta = restTemplate.getForObject("http://localhost:9097/lyceum/relatorio/nadaConsta/" + ra + "/" + centro, (new Byte[]{}).getClass());
        try {

            response.setHeader("Content-Disposition", "inline; filename=nadaConsta.pdf");

            OutputStream outputStream = response.getOutputStream();
            outputStream.write(parseByteTobyte(printNadaConsta));
            outputStream.flush();
            outputStream.close();

//        try {
//            File historicoGeral = new File(new File(System.getProperty("user.home")), "NadaConsta.pdf");
//            OutputStream nadaConstaPDF = new FileOutputStream(historicoGeral);            
//            nadaConstaPDF.write(parseByteTobyte(printNadaConsta));
//            nadaConstaPDF.flush();
//            nadaConstaPDF.close();
//            
//        } catch (FileNotFoundException ex) {
//            Logger.getLogger(WSLyceumClientController.class.getName()).log(Level.SEVERE, null, ex);
//        } catch (IOException ex) {
//            Logger.getLogger(WSLyceumClientController.class.getName()).log(Level.SEVERE, null, ex);
//        }
        } catch (IOException ex) {
            Logger.getLogger(WSLyceumClientController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private byte[] parseByteTobyte(Byte[] array) {
        byte[] array2 = new byte[array.length];
        for (int i = 0; i < array.length; i++) {
            array2[i] = array[i];
        }
        return array2;
    }
}
