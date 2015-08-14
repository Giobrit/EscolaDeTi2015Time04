package br.unicesumar.webservicelyceum.notasAlunoDisciplina;

import br.unicesumar.webservicelyceum.aluno.Aluno;
import br.unicesumar.webservicelyceum.disciplina.Disciplina;
import java.io.Serializable;
import java.util.Objects;
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

    public NotasAlunoDisciplina(Aluno aluno, Disciplina disciplina, double Bimestre1, double Bimestre2, double Sub1, double Bimestre3, double Bimestre4, double Sub2, double mediaCalculada, double mediaLyceum, double notaQueFalta, int totalFaltas, int aulasDadas, double frequencia, String situacao) {    
        this.disciplina = disciplina;
        this.aluno = aluno;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Disciplina getDisciplina() {
        return disciplina;
    }

    public void setDisciplina(Disciplina disciplina) {
        this.disciplina = disciplina;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public double getBimestre1() {
        return Bimestre1;
    }

    public void setBimestre1(double Bimestre1) {
        this.Bimestre1 = Bimestre1;
    }

    public double getBimestre2() {
        return Bimestre2;
    }

    public void setBimestre2(double Bimestre2) {
        this.Bimestre2 = Bimestre2;
    }

    public double getSub1() {
        return Sub1;
    }

    public void setSub1(double Sub1) {
        this.Sub1 = Sub1;
    }

    public double getBimestre3() {
        return Bimestre3;
    }

    public void setBimestre3(double Bimestre3) {
        this.Bimestre3 = Bimestre3;
    }

    public double getBimestre4() {
        return Bimestre4;
    }

    public void setBimestre4(double Bimestre4) {
        this.Bimestre4 = Bimestre4;
    }

    public double getSub2() {
        return Sub2;
    }

    public void setSub2(double Sub2) {
        this.Sub2 = Sub2;
    }

    public double getMediaCalculada() {
        return mediaCalculada;
    }

    public void setMediaCalculada(double mediaCalculada) {
        this.mediaCalculada = mediaCalculada;
    }

    public double getMediaLyceum() {
        return mediaLyceum;
    }

    public void setMediaLyceum(double mediaLyceum) {
        this.mediaLyceum = mediaLyceum;
    }

    public double getNotaQueFalta() {
        return notaQueFalta;
    }

    public void setNotaQueFalta(double notaQueFalta) {
        this.notaQueFalta = notaQueFalta;
    }

    public int getTotalFaltas() {
        return totalFaltas;
    }

    public void setTotalFaltas(int totalFaltas) {
        this.totalFaltas = totalFaltas;
    }

    public int getAulasDadas() {
        return aulasDadas;
    }

    public void setAulasDadas(int aulasDadas) {
        this.aulasDadas = aulasDadas;
    }

    public double getFrequencia() {
        return frequencia;
    }

    public void setFrequencia(double frequencia) {
        this.frequencia = frequencia;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 31 * hash + Objects.hashCode(this.id);
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
        final NotasAlunoDisciplina other = (NotasAlunoDisciplina) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "NotasAlunoDisciplina{" + "id=" + id + ", disciplina=" + disciplina + ", aluno=" + aluno + ", Bimestre1=" + Bimestre1 + ", Bimestre2=" + Bimestre2 + ", Sub1=" + Sub1 + ", Bimestre3=" + Bimestre3 + ", Bimestre4=" + Bimestre4 + ", Sub2=" + Sub2 + ", mediaCalculada=" + mediaCalculada + ", mediaLyceum=" + mediaLyceum + ", notaQueFalta=" + notaQueFalta + ", totalFaltas=" + totalFaltas + ", aulasDadas=" + aulasDadas + ", frequencia=" + frequencia + ", situacao=" + situacao + '}';
    }
    
}
