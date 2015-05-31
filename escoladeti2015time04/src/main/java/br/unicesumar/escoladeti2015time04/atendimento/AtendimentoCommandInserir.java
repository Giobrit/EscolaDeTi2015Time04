package br.unicesumar.escoladeti2015time04.atendimento;

import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;

public class AtendimentoCommandInserir {

    @Column(nullable = false)
    protected Long id;

    @Column(nullable = false)
    protected Date data;

    @Column(nullable = false)
    protected String ra;

    @Column(nullable = false)
    protected String centro;

    @Column(nullable = false)
    protected String nomeAluno;

    @Column(nullable = false)
    protected String curso;

    @Column(nullable = false)
    protected int serieSemestre;

    @Column(nullable = false)
    protected String turno;

    @Column(nullable = false)
    protected Boolean matriculado;

    @Column(nullable = false)
    protected String bolsaFinanciamento;

    @Column(nullable = false)
    protected String descricaoPublica;

    @Column(nullable = false)
    protected String descricaoPrivada;

    public AtendimentoCommandInserir() {
    }

    public AtendimentoCommandInserir(Long id, Date data, String ra, String centro, String nomeAluno, String curso, int serieSemestre, String turno, Boolean matriculado, String bolsaFinanciamento, String descricaoPublica, String descricaoPrivada) {
        this.id = id;
        this.data = data;
        this.ra = ra;
        this.centro = centro;
        this.nomeAluno = nomeAluno;
        this.curso = curso;
        this.serieSemestre = serieSemestre;
        this.turno = turno;
        this.matriculado = matriculado;
        this.bolsaFinanciamento = bolsaFinanciamento;
        this.descricaoPublica = descricaoPublica;
        this.descricaoPrivada = descricaoPrivada;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getRa() {
        return ra;
    }

    public void setRa(String ra) {
        this.ra = ra;
    }

    public String getCentro() {
        return centro;
    }

    public void setCentro(String centro) {
        this.centro = centro;
    }

    public String getNomeAluno() {
        return nomeAluno;
    }

    public void setNomeAluno(String nomeAluno) {
        this.nomeAluno = nomeAluno;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public int getSerieSemestre() {
        return serieSemestre;
    }

    public void setSerieSemestre(int serieSemestre) {
        this.serieSemestre = serieSemestre;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }

    public Boolean getMatriculado() {
        return matriculado;
    }

    public void setMatriculado(Boolean matriculado) {
        this.matriculado = matriculado;
    }

    public String getBolsaFinanciamento() {
        return bolsaFinanciamento;
    }

    public void setBolsaFinanciamento(String bolsaFinanciamento) {
        this.bolsaFinanciamento = bolsaFinanciamento;
    }

    public String getDescricaoPublica() {
        return descricaoPublica;
    }

    public void setDescricaoPublica(String descricaoPublica) {
        this.descricaoPublica = descricaoPublica;
    }

    public String getDescricaoPrivada() {
        return descricaoPrivada;
    }

    public void setDescricaoPrivada(String descricaoPrivada) {
        this.descricaoPrivada = descricaoPrivada;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 67 * hash + Objects.hashCode(this.id);
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
        final AtendimentoCommandInserir other = (AtendimentoCommandInserir) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "AtendimentoCommandInserir{" + "id=" + id + ", data=" + data + ", ra=" + ra + ", centro=" + centro + ", nomeAluno=" + nomeAluno + ", curso=" + curso + ", serieSemestre=" + serieSemestre + ", turno=" + turno + ", matriculado=" + matriculado + ", bolsaFinanciamento=" + bolsaFinanciamento + ", descricaoPublica=" + descricaoPublica + ", descricaoPrivada=" + descricaoPrivada + '}';
    }

}
