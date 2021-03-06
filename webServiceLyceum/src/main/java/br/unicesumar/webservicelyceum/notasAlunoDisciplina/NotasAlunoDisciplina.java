package br.unicesumar.webservicelyceum.notasAlunoDisciplina;

import br.unicesumar.webservicelyceum.aluno.Aluno;
import br.unicesumar.webservicelyceum.disciplina.Disciplina;
import java.io.Serializable;
import java.util.Objects;
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

@Entity
@Table(name = "notasalunodisciplina")
@SuppressWarnings("PersistenceUnitPresent")
public class NotasAlunoDisciplina implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id")
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "idaluno")
    private Aluno aluno;
    
    @ManyToOne
    @JoinColumn(name = "iddisciplina")
    private Disciplina disciplina;
        
    @Column(name = "situacaodisciplina")
    @Enumerated(EnumType.STRING)
    private SituacaoDisciplina situacaoDisciplina;
    
    @Column(name = "resultadoparcial")
    @Enumerated(EnumType.STRING)
    private ResultadoParcial resultadoParcial;
    
    @Column(name = "bimestre1")
    private double bimestre1;
    
    @Column(name = "bimestre2")
    private double bimestre2;
    
    @Column(name = "sub1")
    private double sub1;
    
    @Column(name = "bimestre3")
    private double bimestre3;
    
    @Column(name = "bimestre4")
    private double bimestre4;
    
    @Column(name = "sub2")
    private double sub2;
    
    @Column(name = "mediacalculada")
    private double mediaCalculada;
    
    @Column(name = "medialyceum")
    private double mediaLyceum;
    
    @Column(name = "notaquefalta")
    private double notaQueFalta;
    
    @Column(name = "totalfaltas")
    private int totalFaltas;
    
    @Column(name = "aulasdadas")
    private int aulasDadas;
    
    @Column(name = "frequencia")
    private double frequencia;
    
    @Column(name = "situacao")
    @Enumerated(EnumType.STRING)
    private DisciplinaAlunoSituacao situacao; 
    
    
    public NotasAlunoDisciplina() {
    }

    public NotasAlunoDisciplina(Aluno aluno, Disciplina disciplina, SituacaoDisciplina situacaoDisciplina, ResultadoParcial resultadoParcial, double bimestre1, double bimestre2, double sub1, double bimestre3, double bimestre4, double sub2, double mediaCalculada, double mediaLyceum, double notaQueFalta, int totalFaltas, int aulasDadas, double frequencia, DisciplinaAlunoSituacao situacao) {
        this.aluno = aluno;
        this.disciplina = disciplina;
        this.situacaoDisciplina = situacaoDisciplina;
        this.resultadoParcial = resultadoParcial;
        this.bimestre1 = bimestre1;
        this.bimestre2 = bimestre2;
        this.sub1 = sub1;
        this.bimestre3 = bimestre3;
        this.bimestre4 = bimestre4;
        this.sub2 = sub2;
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

    public SituacaoDisciplina getSituacaoDisciplina() {
        return situacaoDisciplina;
    }

    public void setSituacaoDisciplina(SituacaoDisciplina situacaoDisciplina) {
        this.situacaoDisciplina = situacaoDisciplina;
    }

    public ResultadoParcial getResultadoParcial() {
        return resultadoParcial;
    }

    public void setResultadoParcial(ResultadoParcial resultadoParcial) {
        this.resultadoParcial = resultadoParcial;
    }

    public double getBimestre1() {
        return bimestre1;
    }

    public void setBimestre1(double bimestre1) {
        this.bimestre1 = bimestre1;
    }

    public double getBimestre2() {
        return bimestre2;
    }

    public void setBimestre2(double bimestre2) {
        this.bimestre2 = bimestre2;
    }

    public double getSub1() {
        return sub1;
    }

    public void setSub1(double sub1) {
        this.sub1 = sub1;
    }

    public double getBimestre3() {
        return bimestre3;
    }

    public void setBimestre3(double bimestre3) {
        this.bimestre3 = bimestre3;
    }

    public double getBimestre4() {
        return bimestre4;
    }

    public void setBimestre4(double bimestre4) {
        this.bimestre4 = bimestre4;
    }

    public double getSub2() {
        return sub2;
    }

    public void setSub2(double sub2) {
        this.sub2 = sub2;
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

    public DisciplinaAlunoSituacao getSituacao() {
        return situacao;
    }

    public void setSituacao(DisciplinaAlunoSituacao situacao) {
        this.situacao = situacao;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 41 * hash + Objects.hashCode(this.id);
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
        return "NotasAlunoDisciplina{" + "id=" + id + ", aluno=" + aluno + ", disciplina=" + disciplina + ", situacaoDisciplina=" + situacaoDisciplina + ", resultadoParcial=" + resultadoParcial + ", bimestre1=" + bimestre1 + ", bimestre2=" + bimestre2 + ", sub1=" + sub1 + ", bimestre3=" + bimestre3 + ", bimestre4=" + bimestre4 + ", sub2=" + sub2 + ", mediaCalculada=" + mediaCalculada + ", mediaLyceum=" + mediaLyceum + ", notaQueFalta=" + notaQueFalta + ", totalFaltas=" + totalFaltas + ", aulasDadas=" + aulasDadas + ", frequencia=" + frequencia + ", situacao=" + situacao + '}';
    }
    
}
