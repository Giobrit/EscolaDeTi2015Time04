package br.unicesumar.webservicelyceum.aluno.relatorios;

import br.unicesumar.webservicelyceum.aluno.exceptions.RelatoriosException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.transaction.Transactional;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class RelatorioService {

    private JasperPrint impressao;
    

    public JasperPrint gerarRelatorioHistoricoGeral(String ra) {       
        System.out.println("\n\n HISTORICO GERAL \n\n");
        Map params = new HashMap();
        params.put("ra", ra);
        
        try {
            impressao = new RelatorioHistoricoGeral().gerarRelatorio(params);
        } catch (RelatoriosException ex) {
            Logger.getLogger(RelatorioService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return impressao;
    }

    public JasperPrint gerarRelatorioMediaFaltas(String ra) {        
        System.out.println("\n\n MEDIA FALTAS \n\n");
        Map params = new HashMap();
        params.put("ra", ra);
        
        try {
            impressao = new RelatorioMediaFaltas().gerarRelatorio(params);
        } catch (RelatoriosException ex) {
            Logger.getLogger(RelatorioService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return impressao;
    }
    
    public JasperPrint gerarRelatorioNadaConsta(String ra, String centro){
        System.out.println("\n\n NADA CONSTA \n\n");
        Map params = new HashMap();
        params.put("ra", ra);
        params.put("centro", centro);
        
        try {
            impressao = new RelatorioNadaConsta().gerarRelatorio(params);
        } catch (RelatoriosException ex) {
            Logger.getLogger(RelatorioService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return impressao;
    }
}
