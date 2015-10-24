package br.unicesumar.webservicelyceum.aluno.relatorios;

import br.unicesumar.webservicelyceum.aluno.exceptions.RelatoriosException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Map;
import javax.sql.DataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RelatorioMediaFaltas implements GeradorDeRelatorio{
    @Autowired
    private DataSource dataSource;
    private Connection connection;
    private JasperPrint impressao;

    @Override
    public JasperPrint gerarRelatorio(Map params) throws RelatoriosException {
        try {
            InputStream reportStream = getClass().getClassLoader().getResourceAsStream("MediasFaltasDeAlunos.jasper");
            connection = dataSource.getConnection();

            impressao = JasperFillManager.fillReport(reportStream, params, connection);
        } catch (JRException | SQLException ex) {
            throw new RelatoriosException(ex.getMessage(), ex);            
        }
        return impressao;        
    }

}
