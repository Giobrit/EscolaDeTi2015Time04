package br.unicesumar.webservicelyceum.aluno.relatorios;

import br.unicesumar.webservicelyceum.aluno.exceptions.RelatoriosException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.transaction.Transactional;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class RelatorioService {

    private JasperPrint impressao;
    @Autowired
    private RelatorioHistoricoGeral relatorioHistoricoGeral;
    
    @Autowired
    private RelatorioMediaFaltas relatorioMediaFaltas;
    
    @Autowired
    private RelatorioNadaConsta relatorioNadaConsta;

    public JasperPrint gerarRelatorioHistoricoGeral(String ra) {        
        Map params = new HashMap();
        params.put("RA", ra);

        try {
            impressao = relatorioHistoricoGeral.gerarRelatorio(params);
        } catch (RelatoriosException ex) {
            Logger.getLogger(RelatorioService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return impressao;
    }
    

    public JasperPrint gerarRelatorioMediaFaltas(String ra) {       
        Map params = new HashMap();
        params.put("ra", ra);

        try {
            impressao = relatorioMediaFaltas.gerarRelatorio(params);
        } catch (RelatoriosException ex) {
            Logger.getLogger(RelatorioService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return impressao;
    }

    public JasperPrint gerarRelatorioNadaConsta(String ra, String centro) {        
        Map params = new HashMap();
        params.put("ra", ra);
        params.put("centro", centro);

        try {
            impressao = relatorioNadaConsta.gerarRelatorio(params);
        } catch (RelatoriosException ex) {
            Logger.getLogger(RelatorioService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return impressao;
    }
}
