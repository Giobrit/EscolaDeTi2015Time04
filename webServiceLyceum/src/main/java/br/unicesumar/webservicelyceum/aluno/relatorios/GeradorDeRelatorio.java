package br.unicesumar.webservicelyceum.aluno.relatorios;

import br.unicesumar.webservicelyceum.aluno.exceptions.RelatoriosException;
import java.util.Map;
import net.sf.jasperreports.engine.JasperPrint;

interface GeradorDeRelatorio {
    
    JasperPrint gerarRelatorio(Map params) throws RelatoriosException;
}
