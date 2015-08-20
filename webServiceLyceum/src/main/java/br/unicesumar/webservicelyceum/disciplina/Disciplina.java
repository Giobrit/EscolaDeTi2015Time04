package br.unicesumar.webservicelyceum.disciplina;

import br.unicesumar.webservicelyceum.aluno.Aluno;
import br.unicesumar.webservicelyceum.aluno.AlunoSituacao;
import br.unicesumar.webservicelyceum.notasAlunoDisciplina.DisciplinaAlunoSituacao;
import br.unicesumar.webservicelyceum.turma.Turma;
import java.io.Serializable;
import java.util.Calendar;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "disciplina")
@SuppressWarnings("PersistenceUnitPresent")
public class Disciplina implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id")    
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "idAluno")    
    private Aluno aluno;
    
    @Column(name = "codigo")
    private String codigo;
    
    @Column(name = "nome")
    private String nome;
    
    @ManyToOne
    @JoinColumn(name = "idTurma")
    private Turma turma;
    
    @Column(name = "anoSemestre")
    @Temporal(TemporalType.DATE)
    private Calendar anoSemestre;
    
    @Column(name = "notaFinal")
    private Double notaFinal;
    
    @Column(name = "frequencia")
    private Double frequencia;
    
    @Column(name = "cargaHoraria")
    private double cargaHoraria; 
    
    @Column(name = "situacao")
    @Enumerated(EnumType.STRING)
    private DisciplinaSituacao situacao;    
    //--------------------------------------------------------------------//
    @Column(name = "resultadoParcial")
    @Enumerated(EnumType.STRING)
    private DisciplinaAlunoSituacao resultadoParcial;
    
    @Column(name = "situacaoAluno")
    @Enumerated(EnumType.STRING)
    private AlunoSituacao situacaoAluno;    
    
    
    
       
}
