package br.unicesumar.webservicelyceum.gradeDisciplina;

import br.unicesumar.webservicelyceum.aluno.Aluno;
import br.unicesumar.webservicelyceum.disciplina.Disciplina;
import br.unicesumar.webservicelyceum.turma.Turma;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Grade implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long idGrade;
    
    @ManyToOne
    @JoinColumn(name = "idAluno")
    private Aluno aluno;
    @ManyToOne
    @JoinColumn(name = "idDisciplina")
    private Disciplina disciplina;
    @ManyToOne
    @JoinColumn(name = "idTurma")
    private Turma turma;
    
    private Double notaFinal;
    private Double frequencia;
    private Double cargaHoraria;
    private String situacao;

    public Grade() {
    }

    public Grade( Aluno aluno, Disciplina disciplina, Turma turma, Double notaFinal, Double frequencia, Double cargaHoraria, String situacao) {        
        this.aluno = aluno;
        this.disciplina = disciplina;
        this.turma = turma;
        this.notaFinal = notaFinal;
        this.frequencia = frequencia;
        this.cargaHoraria = cargaHoraria;
        this.situacao = situacao;
    }

    public Long getIdGrade() {
        return idGrade;
    }

    public void setIdGrade(Long idGrade) {
        this.idGrade = idGrade;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }

    public Turma getTurma() {
        return turma;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }

    public Double getNotaFinal() {
        return notaFinal;
    }

    public void setNotaFinal(Double notaFinal) {
        this.notaFinal = notaFinal;
    }

    public Double getFrequencia() {
        return frequencia;
    }

    public void setFrequencia(Double frequencia) {
        this.frequencia = frequencia;
    }

    public Double getCargaHoraria() {
        return cargaHoraria;
    }

    public void setCargaHoraria(Double cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 53 * hash + Objects.hashCode(this.idGrade);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Grade other = (Grade) obj;
        if (!Objects.equals(this.idGrade, other.idGrade)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Grade{" + "idGrade=" + idGrade + ", aluno=" + aluno + ", disciplina=" + disciplina + ", turma=" + turma + ", notaFinal=" + notaFinal + ", frequencia=" + frequencia + ", cargaHoraria=" + cargaHoraria + ", situacao=" + situacao + '}';
    }

}
