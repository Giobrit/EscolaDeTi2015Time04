package br.unicesumar.webservicelyceum.aluno;

import br.unicesumar.webservicelyceum.bolsa.Bolsa;
import br.unicesumar.webservicelyceum.curso.Curso;
import java.io.Serializable;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Aluno implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;    
    private String ra;
    private String nome;
    private String centro;    
    private String matriculado;    
    private Integer reprovacao;    
    @Column(name = "periodo", length = 255)
    private String periodo;
    @Temporal(TemporalType.DATE)   
    private Calendar anoInicio;
    private String situacao;
    @ManyToOne
    @JoinColumn(name = "idCurso")
    private Curso curso;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Bolsa> bolsas;

    public Aluno() {
    }

    public Aluno(String ra, String nome, String centro, String matriculado, Integer reprovacao, String periodo, Calendar anoInicio, String situacao, Curso curso, List<Bolsa> bolsas) {        
        this.ra = ra;
        this.nome = nome;
        this.centro = centro;
        this.matriculado = matriculado;
        this.reprovacao = reprovacao;
        this.periodo = periodo;
        this.anoInicio = anoInicio;
        this.situacao = situacao;
        this.curso = curso;
        this.bolsas = bolsas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRa() {
        return ra;
    }

    public void setRa(String ra) {
        this.ra = ra;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCentro() {
        return centro;
    }

    public void setCentro(String centro) {
        this.centro = centro;
    }

    public String getMatriculado() {
        return matriculado;
    }

    public void setMatriculado(String matriculado) {
        this.matriculado = matriculado;
    }

    public Integer getReprovacao() {
        return reprovacao;
    }

    public void setReprovacao(Integer reprovacao) {
        this.reprovacao = reprovacao;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public Calendar getAnoInicio() {
        return anoInicio;
    }

    public void setAnoInicio(Calendar anoInicio) {
        this.anoInicio = anoInicio;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public List<Bolsa> getBolsas() {
        return bolsas;
    }

    public void setBolsas(List<Bolsa> bolsas) {
        this.bolsas = bolsas;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 43 * hash + Objects.hashCode(this.id);
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
        final Aluno other = (Aluno) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Aluno{" + "id=" + id + ", ra=" + ra + ", nome=" + nome + ", centro=" + centro + ", matriculado=" + matriculado + ", reprovacao=" + reprovacao + ", periodo=" + periodo + ", anoInicio=" + anoInicio + ", situacao=" + situacao + ", curso=" + curso + ", bolsas=" + bolsas + '}';
    }
    
}
