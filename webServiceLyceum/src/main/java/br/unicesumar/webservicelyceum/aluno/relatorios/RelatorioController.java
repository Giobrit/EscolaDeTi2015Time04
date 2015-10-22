package br.unicesumar.webservicelyceum.aluno.relatorios;

import java.util.logging.Level;
import java.util.logging.Logger;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("lyceum/relatorio/")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @RequestMapping(value = "nadaConsta/{ra}/{centro}", method = GET)
    public Byte[] getNadaConsta(@PathVariable String ra, @PathVariable String centro) {
        final JasperPrint jasperPrint = relatorioService.gerarRelatorioNadaConsta(ra, centro);
        byte[] bytesPdf = {};

        try {
            bytesPdf = JasperExportManager.exportReportToPdf(jasperPrint);
        } catch (JRException ex) {
            Logger.getLogger(RelatorioController.class.getName()).log(Level.SEVERE, null, ex);
        }

        return byteToByte(bytesPdf);

    }
    
    @RequestMapping(value = "historicoGeral/{ra}", method = GET)
    public Byte[] getHistoricoGeral(@PathVariable String ra) {
        final JasperPrint jasperPrint = relatorioService.gerarRelatorioHistoricoGeral(ra);
        byte[] bytesPdf = {};
        
        try{
            bytesPdf = JasperExportManager.exportReportToPdf(jasperPrint);   
        } catch (JRException ex) {
            Logger.getLogger(RelatorioController.class.getName()).log(Level.SEVERE, null, ex);
        }
            
        return byteToByte(bytesPdf);
    }
    
    @RequestMapping(value = "mediaFaltas/{ra}", method = GET)
    public Byte[] getMediaFaltas(@PathVariable String ra) {
        final JasperPrint jasperPrint = relatorioService.gerarRelatorioMediaFaltas(ra);
        byte[] bytesPdf = {};
        
        try{
            bytesPdf = JasperExportManager.exportReportToPdf(jasperPrint);   
        } catch (JRException ex) {
            Logger.getLogger(RelatorioController.class.getName()).log(Level.SEVERE, null, ex);
        }
            
        return byteToByte(bytesPdf);
    }

    private Byte[] byteToByte(byte[] array) {
        Byte[] array2 = new Byte[array.length];
        for (int i = 0; i < array.length; i++) {
            array2[i] = array[i];
        }
        return array2;
    }
}
