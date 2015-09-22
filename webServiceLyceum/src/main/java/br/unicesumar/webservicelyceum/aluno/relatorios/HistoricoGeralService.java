package br.unicesumar.webservicelyceum.aluno.relatorios;

import com.itextpdf.text.pdf.PdfWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import javax.sql.DataSource;
import javax.transaction.Transactional;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRPdfExporterParameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class HistoricoGeralService {

    @Autowired
    private DataSource dataSource;
    
    private Connection connection;
       

    public void gerarRelatorioHistoricoGeral(String ra) {
        try {
            InputStream reportStream = getClass().getClassLoader().getResourceAsStream("HistoricoGeral.jasper");
            
            connection = dataSource.getConnection();

            Map params = new HashMap();
            params.put("RA", ra);

            JasperPrint impressao = JasperFillManager.fillReport(reportStream, params, connection);
            JRPdfExporter exporter = new JRPdfExporter();

            File raiz = new File(System.getProperty("user.home"));
            File relatorio = new File(raiz, ra + "_relatorio.pdf");
            System.out.println("Gerando em " + relatorio.getAbsolutePath());

            exporter.setParameter(JRExporterParameter.JASPER_PRINT, impressao);
            exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, new FileOutputStream(relatorio));
            exporter.setParameter(JRPdfExporterParameter.PERMISSIONS, PdfWriter.ALLOW_PRINTING);

            exporter.exportReport();

        } catch (FileNotFoundException | JRException | SQLException ex) {
            ex.printStackTrace();
        }
    }
    
}
