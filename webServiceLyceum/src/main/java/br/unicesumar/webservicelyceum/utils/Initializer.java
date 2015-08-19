package br.unicesumar.webservicelyceum.utils;

import br.unicesumar.webservicelyceum.aluno.Aluno;
import br.unicesumar.webservicelyceum.aluno.AlunoService;
import br.unicesumar.webservicelyceum.bolsa.Bolsa;
import br.unicesumar.webservicelyceum.bolsa.BolsaService;
import br.unicesumar.webservicelyceum.curso.Curso;
import br.unicesumar.webservicelyceum.curso.CursoService;
import br.unicesumar.webservicelyceum.disciplina.Disciplina;
import br.unicesumar.webservicelyceum.disciplina.DisciplinaService;
import br.unicesumar.webservicelyceum.notasAlunoDisciplina.NotasAlunoDisciplina;
import br.unicesumar.webservicelyceum.notasAlunoDisciplina.NotasAlunoDisciplinaService;
import br.unicesumar.webservicelyceum.turma.Turma;
import br.unicesumar.webservicelyceum.turma.TurmaService;
import java.util.Calendar;
import java.util.List;
import java.util.Random;
import javax.annotation.PostConstruct;
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
    
    @PostConstruct
    public void initialize(){        
        inicializarBolsa();
        inicializarTurma();
        inicializarCurso();
        inicializarAluno();
        inicializarDisciplina();
        inicializarNotasAlunos();        
    }    
    
    private void inicializarBolsa(){        
        Calendar ano = Calendar.getInstance();
        ano.set(2013, 01, 01);
        Calendar inicio = Calendar.getInstance();
        inicio.set(2013,01,01);
        Calendar fim = Calendar.getInstance();
        fim.set(2013,12,30);
        bolsaService.criar(new Bolsa(ano,inicio,fim, 50.0, "Funcionários Cesumar(Cesumar)", "Nada Consta" ));
        bolsaService.criar(new Bolsa(ano,inicio,fim, 50.0, "Funcionários Cesumar(Cesumar)", "Nada Consta" ));
        bolsaService.criar(new Bolsa(ano,inicio,fim, 100.0, "Fies", "Nada Consta" ));
        bolsaService.criar(new Bolsa(ano,inicio,fim, 100.0, "Prouni", "Nada Consta" ));
        bolsaService.criar(new Bolsa(ano,inicio,fim, 100.0, "Prouni", "Nada Consta" ));
        bolsaService.criar(new Bolsa(ano,inicio,fim, 50.0, "Fies", "Nada Consta" ));        
    }
    
    private void inicializarCurso() {        
        cursoService.criar(new Curso("CST_ADSIS", "Superior de Tecnologia em Análise e Desenvolvimento de Sistemas"));
        cursoService.criar(new Curso("CST_SISIN", "Superior de Tecnologia de Sistemas para Internet"));
    }

    private void inicializarAluno() {        
        Calendar anoInicio = Calendar.getInstance();
        anoInicio.set(2013, 01, 01);        
        
        List<Bolsa> bolsas  = bolsaService.buscarTodos();
        
        alunoService.criar(new Aluno("13002602", "Giovanni De Ganello Dias", "CETA","SIM", 0,"Noturno", anoInicio, "Ativo", cursoService.buscar(1L), turmaService.buscar(1L), bolsas));
        alunoService.criar(new Aluno("13097992", "Renato Kenji","CETA","SIM", 0,"Noturno", anoInicio, "Ativo" , cursoService.buscar(1L), turmaService.buscar(1L), bolsas));
        alunoService.criar(new Aluno("13002702", "Roney Cesar de Campos ", "CETA","SIM", 0,"Noturno", anoInicio, "Ativo", cursoService.buscar(1L),turmaService.buscar(1L), bolsas));
        alunoService.criar(new Aluno("11002782", "Luiz Gustavo Sabaine Fagundes", "CETA","SIM", 0,"Noturno", anoInicio, "Ativo", cursoService.buscar(2L),turmaService.buscar(1L), bolsas));
        alunoService.criar(new Aluno("13078102", "Willian Zanuto Oliveira", "CETA","SIM", 0,"Noturno", anoInicio, "Ativo", cursoService.buscar(2L),turmaService.buscar(1L), bolsas));
        alunoService.criar(new Aluno("13089252", "Filipe Martins Maldonado", "CETA","SIM", 0,"Noturno", anoInicio, "Ativo", cursoService.buscar(1L),turmaService.buscar(1L), bolsas));
        alunoService.criar(new Aluno("13003052", "Liz Regina Okuzono", "CETA","SIM", 0,"Noturno", anoInicio, "Ativo", cursoService.buscar(1L),turmaService.buscar(1L), bolsas));
        alunoService.criar(new Aluno("13097572", "Rodrigo Ferreira de Souza", "CETA","SIM", 0,"Noturno", anoInicio, "Ativo", cursoService.buscar(1L),turmaService.buscar(1L), bolsas));
    } 
    
    private void inicializarTurma() {
        System.out.println("Criando turmas!");
        Calendar anoInicio = Calendar.getInstance();
        anoInicio.set(2013, 0, 01);
        Calendar anoFim = Calendar.getInstance();
        anoFim.set(2015, 0, 12);
        
        turmaService.criar(new Turma("CTS_ADSIS", anoInicio, anoFim, "Noturno", 1, "Ativo"));
        turmaService.criar(new Turma("CTS_ADSIS", anoInicio, anoFim, "Noturno", 2, "Ativo"));
        turmaService.criar(new Turma("CTS_ADSIS", anoInicio, anoFim, "Noturno", 3, "Ativo"));
        turmaService.criar(new Turma("CTS_SISIN", anoInicio, anoFim, "Noturno", 1, "Ativo"));
        turmaService.criar(new Turma("CTS_SISIN", anoInicio, anoFim, "Noturno", 2, "Ativo"));
        turmaService.criar(new Turma("CTS_SISIN", anoInicio, anoFim, "Noturno", 3, "Ativo"));
    }

    private void inicializarDisciplina() {
        disciplinaService.criar(new Disciplina("NGER160_007","algoritmos e lógica de programação","Curricular",160));
        disciplinaService.criar(new Disciplina("NGER160_009","fundamentos e arquitetura de computadores","Curricular",160));
        disciplinaService.criar(new Disciplina("NGER160_008","matemática para computação","Curricular",160));
        disciplinaService.criar(new Disciplina("NGER160_004","metodologia da pesquisa científica","Curricular",160));
        disciplinaService.criar(new Disciplina("NGER160_052","processos de negócio","Curricular",80));
        disciplinaService.criar(new Disciplina("NGER160_050","programação I","Curricular",80));
        disciplinaService.criar(new Disciplina("NGER160_054","sistemas operacionais","Curricular",80));
        disciplinaService.criar(new Disciplina("NGER160_010","banco de dados i","Curricular",160));
        disciplinaService.criar(new Disciplina("NGER160_055","design de interação","Curricular",80));
        disciplinaService.criar(new Disciplina("NGER160_012","engenharia de software i","Curricular",160));
        disciplinaService.criar(new Disciplina("NGER160_013","estrutura de dados","Curricular",160));
        disciplinaService.criar(new Disciplina("NGER160_001","formação sociocultural e ética","Curricular",80));
        disciplinaService.criar(new Disciplina("NGER160_051","fundamentos de redes de computadores","Curricular",160));
        disciplinaService.criar(new Disciplina("NGER160_011","programação ii","Curricular",160));
        disciplinaService.criar(new Disciplina("NGER160_037","programação avançada","Curricular",160));
        disciplinaService.criar(new Disciplina("NGER160_038","empreendedorismo","Curricular",80));
        disciplinaService.criar(new Disciplina("NGER160_039","projeto de sistemas","Curricular",80));
        disciplinaService.criar(new Disciplina("NGER160_036","projeto integrador - escola de ti","Curricular",320));
        disciplinaService.criar(new Disciplina("NGER160_032","gerenciamento de projetos","Curricular",80));
        disciplinaService.criar(new Disciplina("NGER160_032","tópicos especiais em ads","Curricular",80));        
    }
    
    private void inicializarNotasAlunos(){                
        List<Aluno> alunos = alunoService.buscarTodos();
        List<Disciplina> disciplinas = disciplinaService.buscarTodos();
        
        for (Aluno aluno : alunos) {
            for(Disciplina disciplina : disciplinas){
                notasAlunoService.criar(preencheNotas(aluno, disciplina));
            }
        }        
    }
    
    private NotasAlunoDisciplina preencheNotas(Aluno aluno, Disciplina disciplina){
        Random gerador = new Random();
        double[] notas = gerarNotasAleatorias(gerador);                
        double media = calculaMedia(notas);
        double notaQueFalta = calculaNotaQueFalta(media);
        
        int faltasNaDisciplina = geraFaltas(gerador);
        int aulasDadas = 40;
        double frequencia = calculaFrequencia(faltasNaDisciplina, aulasDadas);
        String situacao = verificaAprovacao(media);
        return new NotasAlunoDisciplina(aluno, disciplina, notas[0],notas[1],notas[2],notas[3],notas[4],notas[5], 
                media, media, notaQueFalta, faltasNaDisciplina, aulasDadas, frequencia, situacao);
    }
    
    private double[] gerarNotasAleatorias(Random gerador) {       
        double[] notas = {1.5,2.0,2.5,3.0,6.5,7.0,7.5,8.0,8.5,9.0,9.5,10.0};

        for (int i = 0; i < 6; i++) {
            notas[i] = notas[gerador.nextInt(12)];
        }

        return notas;
    }
    
    private static double calculaMedia(double[] notas){
        double soma = 0;
        double menor = notas[0];
        for(int i = 0; i < 3; i++){
            soma += notas[i];
            if(notas[i] < menor)    
                menor = notas[i];
        }        
        soma = soma - menor;
        
        menor = notas[3];        
        for(int i = 3; i < 6; i++){
            soma += notas[i];
            if(notas[i] < menor)    
                menor = notas[i];
        }
        soma = soma - menor;
        
        double media = soma/4;
        
        return media;
    }
    
    private double calculaNotaQueFalta(double media){
        if(media < 6.0){
            return 6.0 - media;
        }
        return 0.0;
    }
    
    private int geraFaltas(Random gerador){
        int valorGerado = gerador.nextInt(20);        
        return valorGerado;
    }

    private double calculaFrequencia(int faltasNaDisciplina, int aulasDadas) {
        double resultado = 0.0;
        if(faltasNaDisciplina > 0){
            resultado = aulasDadas/faltasNaDisciplina;            
        }
        return resultado;
    }

    private String verificaAprovacao(double media) {
        if(media >= 6.0){
            return "Aprovado";
        }
        return "Reprovado";
    }
    
    
}
