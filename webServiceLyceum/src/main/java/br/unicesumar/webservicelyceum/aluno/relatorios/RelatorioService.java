package br.unicesumar.webservicelyceum.aluno.relatorios;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.sql.DataSource;
import javax.transaction.Transactional;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class RelatorioService {

    @Autowired
    private DataSource dataSource;
    private Connection connection;

    public JasperPrint gerarRelatorioNadaConsta(String ra, String centro) {
        JasperPrint impressao = null;
        try {
            InputStream reportStream = getClass().getClassLoader().getResourceAsStream("NadaConsta.jasper");
            connection = dataSource.getConnection();

            Map params = new HashMap();            
            params.put("ra", ra);
            params.put("centro", centro);

            impressao = JasperFillManager.fillReport(reportStream, params, connection);
        } catch (JRException | SQLException ex) {
            ex.printStackTrace();
            Logger.getLogger(RelatorioService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return impressao;
    }

    public JasperPrint gerarRelatorioHistoricoGeral(String ra) {
        JasperPrint impressao = null;
        try {
            InputStream reportStream = getClass().getClassLoader().getResourceAsStream("HistoricoGeral.jasper");
            connection = dataSource.getConnection();

            Map params = new HashMap();            
            params.put("RA", ra);

            impressao = JasperFillManager.fillReport(reportStream, params, connection);
        } catch (JRException | SQLException ex) {
            ex.printStackTrace();
            Logger.getLogger(RelatorioService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return impressao;
    }

    public JasperPrint gerarRelatorioMediaFaltas(String ra) {
        JasperPrint impressao = null;
        try {
            InputStream reportStream = getClass().getClassLoader().getResourceAsStream("MediasFaltasDeAlunos.jasper");
            connection = dataSource.getConnection();

            Map params = new HashMap();            
            params.put("ra", ra);

            impressao = JasperFillManager.fillReport(reportStream, params, connection);
        } catch (JRException | SQLException ex) {
            ex.printStackTrace();
            Logger.getLogger(RelatorioService.class.getName()).log(Level.SEVERE, null, ex);
        }
        return impressao;
    }

}
