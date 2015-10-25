package br.unicesumar.webservicelyceum.utils;

import br.unicesumar.webservicelyceum.aluno.Aluno;
import br.unicesumar.webservicelyceum.aluno.AlunoService;
import br.unicesumar.webservicelyceum.aluno.AlunoSituacao;
import br.unicesumar.webservicelyceum.aluno.relatorios.RelatorioService;
import br.unicesumar.webservicelyceum.alunoDisciplina.AlunoDisciplina;
import br.unicesumar.webservicelyceum.alunoDisciplina.AlunoDisciplinaService;
import br.unicesumar.webservicelyceum.alunoDisciplina.StatusDisciplina;
import br.unicesumar.webservicelyceum.bolsa.Bolsa;
import br.unicesumar.webservicelyceum.bolsa.BolsaService;
import br.unicesumar.webservicelyceum.curso.Curso;
import br.unicesumar.webservicelyceum.curso.CursoService;
import br.unicesumar.webservicelyceum.dadosEnade.DadosEnade;
import br.unicesumar.webservicelyceum.dadosEnade.DadosEnadeService;
import br.unicesumar.webservicelyceum.departamento.Departamento;
import br.unicesumar.webservicelyceum.departamento.DepartamentoService;
import br.unicesumar.webservicelyceum.disciplina.Disciplina;
import br.unicesumar.webservicelyceum.disciplina.DisciplinaService;
import br.unicesumar.webservicelyceum.notasAlunoDisciplina.SituacaoDisciplina;
import br.unicesumar.webservicelyceum.notasAlunoDisciplina.DisciplinaAlunoSituacao;
import br.unicesumar.webservicelyceum.notasAlunoDisciplina.NotasAlunoDisciplina;
import br.unicesumar.webservicelyceum.notasAlunoDisciplina.NotasAlunoDisciplinaService;
import br.unicesumar.webservicelyceum.notasAlunoDisciplina.ResultadoParcial;
import br.unicesumar.webservicelyceum.pendenciasAluno.PendenciaAluno;
import br.unicesumar.webservicelyceum.pendenciasAluno.PendenciaAlunoService;
import br.unicesumar.webservicelyceum.turma.TurmaSituacao;
import br.unicesumar.webservicelyceum.turma.Turma;
import br.unicesumar.webservicelyceum.turma.TurmaService;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.List;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Initializer {

    @Autowired
    private BolsaService bolsaService;
    @Autowired
    private CursoService cursoService;
    @Autowired
    private AlunoService alunoService;
    @Autowired
    private TurmaService turmaService;
    @Autowired
    private DisciplinaService disciplinaService;
    @Autowired
    private NotasAlunoDisciplinaService notasAlunoService;
    @Autowired
    private DadosEnadeService enadeService;
    @Autowired
    private AlunoDisciplinaService alunoDisciplinaService;
    @Autowired
    private PendenciaAlunoService pendenciaAlunoService;
    @Autowired
    private DepartamentoService departamentoService;
    @Autowired
    private RelatorioService relatorioService;

    @PostConstruct
    public void initialize() {

        inicializarBolsa();
        inicializarTurma();
        inicializarDepartamento();
        inicializarCurso();
        inicializarAluno();
        inicializarDisciplina();
        inicializarAlunoDisciplina();
        inicializarNotasAlunos();
        inicializarDadosEnade();
        inicializarPendenciaAluno();

        gerandoRelatorios();
    }

    private void gerandoRelatorios() {        
        relatorioService.gerarRelatorioHistoricoGeral("13097572");
        
        geraRelHistoricoGeral();
        geraRelNadaConsta();
        geraRelMediaFaltas();        
    }

    private void geraRelHistoricoGeral() {
        try {            
            File historicoGeral = new File(getDiretorioBase(), "HistoricoGeral.pdf");
            OutputStream historicoGeralPDF;
            historicoGeralPDF = new FileOutputStream(historicoGeral);
            
            JasperPrint printHistoricoGeral = relatorioService.gerarRelatorioHistoricoGeral("13097572");
            JasperExportManager.exportReportToPdfStream(printHistoricoGeral, historicoGeralPDF);
        } catch (FileNotFoundException | JRException ex) {
            Logger.getLogger(Initializer.class.getName()).log(Level.SEVERE, null, ex);
        } 
    }
    
    private void geraRelNadaConsta() {
        try {
            File historicoGeral = new File(getDiretorioBase(), "NadaConsta.pdf");
            OutputStream nadaConstaPDF = new FileOutputStream(historicoGeral);
            
            JasperPrint printNadaConsta = relatorioService.gerarRelatorioNadaConsta("13097572","CETA");
            JasperExportManager.exportReportToPdfStream(printNadaConsta, nadaConstaPDF);
        } catch (FileNotFoundException | JRException ex) {
            Logger.getLogger(Initializer.class.getName()).log(Level.SEVERE, null, ex);
        } 
    }
    
    private void geraRelMediaFaltas() {
        try {
            File raiz = getDiretorioBase();
            File mediaFaltas = new File(raiz, "MediaFaltasDeAluno.pdf");
            OutputStream mediaFaltasPDF = new FileOutputStream(mediaFaltas);
            
            JasperPrint printMediaFaltas = relatorioService.gerarRelatorioMediaFaltas("13097572");
            JasperExportManager.exportReportToPdfStream(printMediaFaltas, mediaFaltasPDF);
        } catch (FileNotFoundException | JRException ex) {
            Logger.getLogger(Initializer.class.getName()).log(Level.SEVERE, null, ex);
        } 
    }

    private File getDiretorioBase() {
        //Gera relatório MediaFaltas
        File raiz = new File(System.getProperty("user.home"));
        return raiz;
    }

    private void inicializarDepartamento() {
        departamentoService.criarDepartamento(new Departamento("CETA", "Ciências Exatas, Tecnológicas e Agrárias"));
    }

    private void inicializarPendenciaAluno() {
        List<Aluno> alunos = alunoService.buscarTodos();
        for (Aluno aluno : alunos) {
            pendenciaAlunoService.criarPendenciaAluno(new PendenciaAluno(aluno, "2014/12", "Nada Consta", "Nada Consta", "Nada Consta", "Nada Consta", "Nada Consta", "Nada Consta", "Nada Consta", "Nada Consta", "Aqui vai algumas informações adicionais sobre o aluno.... :>"));
        }
    }

    private void inicializarBolsa() {
        Calendar ano = Calendar.getInstance();
        ano.set(2013, 01, 01);
        Calendar inicio = Calendar.getInstance();
        inicio.set(2013, 01, 01);
        Calendar fim = Calendar.getInstance();
        fim.set(2013, 12, 30);
        bolsaService.criar(new Bolsa(ano, inicio, fim, 50.0, "Funcionários Cesumar(Cesumar)", "Nada Consta"));
        bolsaService.criar(new Bolsa(ano, inicio, fim, 50.0, "Funcionários Cesumar(Cesumar)", "Nada Consta"));
        bolsaService.criar(new Bolsa(ano, inicio, fim, 100.0, "Fies", "Nada Consta"));
        bolsaService.criar(new Bolsa(ano, inicio, fim, 100.0, "Prouni", "Nada Consta"));
        bolsaService.criar(new Bolsa(ano, inicio, fim, 100.0, "Prouni", "Nada Consta"));
        bolsaService.criar(new Bolsa(ano, inicio, fim, 50.0, "Fies", "Nada Consta"));
    }

    private void inicializarCurso() {
        cursoService.criar(new Curso("CST_ADSIS", "Superior de Tecnologia em Análise e Desenvolvimento de Sistemas", "Cesumar - Centro Universitário de Maringá", "Cesumar", departamentoService.buscarDepartamento(1L)));
        cursoService.criar(new Curso("CST_SISIN", "Superior de Tecnologia de Sistemas para Internet", "Cesumar - Centro Universitário de Maringá", "Cesumar", departamentoService.buscarDepartamento(1L)));
    }

    private void inicializarAluno() {
        Calendar anoInicio = Calendar.getInstance();
        anoInicio.set(2013, 01, 01);

        List<Bolsa> bolsas = bolsaService.buscarTodos();
        List<Turma> turmas = turmaService.buscarTodos();

        alunoService.criar(new Aluno("13002602", "Giovanni De Ganello Dias", "CETA", "SIM", 0, "Noturno", anoInicio, AlunoSituacao.ATIVO, cursoService.buscar(1L), turmas.get(2), bolsas, "Não", "Matriculado"));
        alunoService.criar(new Aluno("13097992", "Renato Kenji", "CETA", "SIM", 0, "Noturno", anoInicio, AlunoSituacao.ATIVO, cursoService.buscar(1L), turmas.get(2), bolsas, "Não", "Matriculado"));
        alunoService.criar(new Aluno("13002702", "Roney Cesar de Campos ", "CETA", "SIM", 0, "Noturno", anoInicio, AlunoSituacao.ATIVO, cursoService.buscar(1L), turmas.get(2), bolsas, "Não", "Matriculado"));
        alunoService.criar(new Aluno("11002782", "Luiz Gustavo Sabaine Fagundes", "CETA", "SIM", 0, "Noturno", anoInicio, AlunoSituacao.ATIVO, cursoService.buscar(2L), turmas.get(5), bolsas, "Não", "Matriculado"));
        alunoService.criar(new Aluno("13078102", "Willian Zanuto Oliveira", "CETA", "SIM", 0, "Noturno", anoInicio, AlunoSituacao.ATIVO, cursoService.buscar(2L), turmas.get(5), bolsas, "Não", "Matriculado"));
        alunoService.criar(new Aluno("13089252", "Filipe Martins Maldonado", "CETA", "SIM", 0, "Noturno", anoInicio, AlunoSituacao.ATIVO, cursoService.buscar(1L), turmas.get(2), bolsas, "Não", "Matriculado"));
        alunoService.criar(new Aluno("13003052", "Liz Regina Okuzono", "CETA", "SIM", 0, "Noturno", anoInicio, AlunoSituacao.ATIVO, cursoService.buscar(1L), turmas.get(2), bolsas, "Não", "Matriculado"));
        alunoService.criar(new Aluno("13097572", "Rodrigo Ferreira de Souza", "CETA", "SIM", 0, "Noturno", anoInicio, AlunoSituacao.ATIVO, cursoService.buscar(1L), turmas.get(2), bolsas, "Não", "Matriculado"));
    }

    private void inicializarTurma() {
        Calendar primeiroAno = Calendar.getInstance();
        primeiroAno.set(2013, 01, 01);
        Calendar segundoAno = Calendar.getInstance();
        segundoAno.set(2014, 01, 01);
        Calendar terceiroAno = Calendar.getInstance();
        terceiroAno.set(2015, 01, 01);

        turmaService.criar(new Turma("CTS_ADSIS", primeiroAno, terceiroAno, "Noturno", 1, TurmaSituacao.ATIVA));
        turmaService.criar(new Turma("CTS_ADSIS", segundoAno, terceiroAno, "Noturno", 2, TurmaSituacao.ATIVA));
        turmaService.criar(new Turma("CTS_ADSIS", terceiroAno, terceiroAno, "Noturno", 3, TurmaSituacao.ATIVA));
        turmaService.criar(new Turma("CTS_SISIN", primeiroAno, terceiroAno, "Noturno", 1, TurmaSituacao.ATIVA));
        turmaService.criar(new Turma("CTS_SISIN", segundoAno, terceiroAno, "Noturno", 2, TurmaSituacao.ATIVA));
        turmaService.criar(new Turma("CTS_SISIN", terceiroAno, terceiroAno, "Noturno", 3, TurmaSituacao.ATIVA));
    }

    private void inicializarDisciplina() {
        disciplinaService.criar(new Disciplina("NGER160_007", "algoritmos e lógica de programação", 160,1));
        disciplinaService.criar(new Disciplina("NGER160_009", "fundamentos e arquitetura de computadores", 160,1));
        disciplinaService.criar(new Disciplina("NGER160_008", "matemática para computação", 160,1));
        disciplinaService.criar(new Disciplina("NGER160_004", "metodologia da pesquisa científica", 160,1));
        disciplinaService.criar(new Disciplina("NGER160_052", "processos de negócio", 80,1));
        disciplinaService.criar(new Disciplina("NGER160_050", "programação I", 80,1));
        disciplinaService.criar(new Disciplina("NGER160_054", "sistemas operacionais", 80,1));
        disciplinaService.criar(new Disciplina("NGER160_010", "banco de dados i", 160,2));
        disciplinaService.criar(new Disciplina("NGER160_055", "design de interação", 80,2));
        disciplinaService.criar(new Disciplina("NGER160_012", "engenharia de software i", 160,2));
        disciplinaService.criar(new Disciplina("NGER160_013", "estrutura de dados", 160,2));
        disciplinaService.criar(new Disciplina("NGER160_001", "formação sociocultural e ética", 80,2));
        disciplinaService.criar(new Disciplina("NGER160_051", "fundamentos de redes de computadores", 160,2));
        disciplinaService.criar(new Disciplina("NGER160_011", "programação ii", 160,2));
        disciplinaService.criar(new Disciplina("NGER160_037", "programação avançada", 160,3));
        disciplinaService.criar(new Disciplina("NGER160_038", "empreendedorismo", 80,3));
        disciplinaService.criar(new Disciplina("NGER160_039", "projeto de sistemas", 80,3));
        disciplinaService.criar(new Disciplina("NGER160_036", "projeto integrador - escola de ti", 320,3));
        disciplinaService.criar(new Disciplina("NGER160_032", "gerenciamento de projetos", 80,3));
        disciplinaService.criar(new Disciplina("NGER160_032", "tópicos especiais em ads", 80,3));
    }

    private void inicializarNotasAlunos() {
        List<Aluno> alunos = alunoService.buscarTodos();
        List<Disciplina> disciplinas = disciplinaService.buscarTodos();

        for (Aluno aluno : alunos) {
            for (Disciplina disciplina : disciplinas) {
                notasAlunoService.criar(preencheNotas(aluno, disciplina));
            }
        }
    }

    private NotasAlunoDisciplina preencheNotas(Aluno aluno, Disciplina disciplina) {
        Random gerador = new Random();
        double[] notas = gerarNotasAleatorias(gerador);
        double media = calculaMedia(notas);
        double notaQueFalta = calculaNotaQueFalta(notas);

        int faltasNaDisciplina = geraFaltas(gerador);
        int aulasDadas = 40;
        double frequencia = calculaFrequencia(faltasNaDisciplina, aulasDadas);
        DisciplinaAlunoSituacao situacao = verificaAprovacao(media);

        return new NotasAlunoDisciplina(aluno, disciplina, SituacaoDisciplina.CURRICULAR, verificaResultadoParcialDisciplina(notaQueFalta), notas[0], notas[1], notas[2], notas[3], notas[4], notas[5],
                media, media, notaQueFalta, faltasNaDisciplina, aulasDadas, frequencia, situacao);
    }

    private double[] gerarNotasAleatorias(Random gerador) {
        double[] notas = {1.5, 2.0, 2.5, 3.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0};

        for (int i = 0; i < 6; i++) {
            notas[i] = notas[gerador.nextInt(12)];
        }

        return notas;
    }

    private double calculaMedia(double[] notas) {
        double soma = somaNotas(notas);
        double media = soma / 4;

        return media;
    }

    private double somaNotas(double[] notas) {
        double soma = 0;
        double menor = notas[0];
        for (int i = 0; i < 3; i++) {
            soma += notas[i];
            if (notas[i] < menor) {
                menor = notas[i];
            }
        }
        soma = soma - menor;

        menor = notas[3];
        for (int i = 3; i < 6; i++) {
            soma += notas[i];
            if (notas[i] < menor) {
                menor = notas[i];
            }
        }
        soma = soma - menor;
        return soma;
    }

    private double calculaNotaQueFalta(double notas[]) {
        double valorMinimoParaAprovacao = 24.0;
        double soma = somaNotas(notas);

        return valorMinimoParaAprovacao - soma;
    }

    private int geraFaltas(Random gerador) {
        int valorGerado = gerador.nextInt(20);
        return valorGerado;
    }

    private double calculaFrequencia(int faltasNaDisciplina, int aulasDadas) {
        double resultado = 0.0;
        if (faltasNaDisciplina > 0) {
            resultado = aulasDadas / faltasNaDisciplina;
        }
        return resultado;
    }

    private ResultadoParcial verificaResultadoParcialDisciplina(double mediaQueFalta) {
        if (mediaQueFalta <= 0.0) {
            return ResultadoParcial.APROVADO;
        }
        return ResultadoParcial.REPROVADO;
    }

    private DisciplinaAlunoSituacao verificaAprovacao(double media) {
        if (media >= 6.0) {
            return DisciplinaAlunoSituacao.APROVADO;
        }
        return DisciplinaAlunoSituacao.REPROVADO;
    }

    private void inicializarDadosEnade() {
        List<Aluno> alunos = alunoService.buscarTodos();
        Calendar ano = Calendar.getInstance();
        ano.set(2015, 01, 01);

        for (Aluno aluno : alunos) {
            enadeService.criar(new DadosEnade(aluno, ano, "Não", false, false));
        }
    }

    private void inicializarAlunoDisciplina() {
        List<Aluno> alunos = alunoService.buscarTodos();
        List<Disciplina> disciplinas = disciplinaService.buscarTodos();
        List<Turma> turmas = turmaService.buscarTodos();
        int cont;

        for (Aluno aluno : alunos) {
            cont = 0;
            for (Disciplina disciplina : disciplinas) {
                cont++;
                if (cont <= 7) {
                    alunoDisciplinaService.criar(new AlunoDisciplina(aluno, disciplina, turmas.get(0), StatusDisciplina.COMPLETA));
                } else if (cont > 7 && cont <= 14) {
                    alunoDisciplinaService.criar(new AlunoDisciplina(aluno, disciplina, turmas.get(1), StatusDisciplina.COMPLETA));
                } else {
                    alunoDisciplinaService.criar(new AlunoDisciplina(aluno, disciplina, turmas.get(2), StatusDisciplina.INCOMPLETA));
                }
            }
        }

    }

}
