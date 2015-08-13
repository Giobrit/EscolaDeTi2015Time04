package br.unicesumar.webservicelyceum.notasAlunoDisciplina;

import br.unicesumar.webservicelyceum.aluno.Aluno;
import br.unicesumar.webservicelyceum.disciplina.Disciplina;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class NotasAlunoDisciplina implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    @ManyToOne
    private Disciplina disciplina;
    @ManyToOne
    private Aluno aluno;
    private double Bimestre1;
    private double Bimestre2;
    private double Sub1;
    private double Bimestre3;
    private double Bimestre4;
    private double Sub2;
    private double mediaCalculada;
    private double mediaLyceum;
    private double notaQueFalta;
    private int totalFaltas;
    private int aulasDadas;
    private double frequencia;
    private String situacao; 

    public NotasAlunoDisciplina() {
    }

    public NotasAlunoDisciplina(Aluno aluno, Disciplina disciplina, double Bimestre1, double Bimestre2, double Sub1, double Bimestre3, 
            double Bimestre4, double Sub2, double mediaCalculada, double mediaLyceum, double notaQueFalta, int totalFaltas, 
            int aulasDadas, double frequencia, String situacao) {        
        this.aluno = aluno;
        this.disciplina = disciplina;
        this.Bimestre1 = Bimestre1;
        this.Bimestre2 = Bimestre2;
        this.Sub1 = Sub1;
        this.Bimestre3 = Bimestre3;
        this.Bimestre4 = Bimestre4;
        this.Sub2 = Sub2;
        this.mediaCalculada = mediaCalculada;
        this.mediaLyceum = mediaLyceum;
        this.notaQueFalta = notaQueFalta;
        this.totalFaltas = totalFaltas;
        this.aulasDadas = aulasDadas;
        this.frequencia = frequencia;
        this.situacao = situacao;
    }

    
   
    
    
}
