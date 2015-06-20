package br.unicesumar.escoladeti2015time04.atendimento;

import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.service.ColunaLocalizavel;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "atendimento")
public class Atendimento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    protected Long id;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(unique = true, nullable = false, columnDefinition = "timestamp with time zone not null")
    @Temporal(value = TemporalType.TIMESTAMP)
    protected Date data;

    @ManyToOne
    @ColunaListavel
    @JoinColumn(name = "usuariologado", nullable = false)
    protected Usuario usuarioLogado;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(nullable = false)
    protected String ra;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(nullable = false)
    protected String centro;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(name = "nomealuno", nullable = false)
    protected String nomeAluno;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(nullable = false)
    protected String curso;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(name = "seriesemestre", nullable = false)
    protected int serieSemestre;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(nullable = false)
    protected String turno;

    @ColunaLocalizavel
    @Column(nullable = false)
    @ColunaListavel(campoNaQuery = "CASE matriculado WHEN true THEN 'Sim' ELSE 'Não' END AS matriculado")
    protected Boolean matriculado;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(name = "bolsafinanciamento", nullable = false)
    protected String bolsaFinanciamento;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(name = "descricaopublica", nullable = false)
    protected String descricaoPublica;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(name = "descricaoprivada", nullable = false)
    protected String descricaoPrivada;

    public Atendimento() {
    }

    public Atendimento(Date data, Usuario usuarioLogado, String ra, String centro, String nomeAluno, String curso, int serieSemestre, String turno, Boolean matriculado, String bolsaFinanciamento, String descricaoPublica, String descricaoPrivada) {

        this.data = data;
        this.usuarioLogado = usuarioLogado;
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

    public Atendimento(Long id, Date data, Usuario usuarioLogado, String ra, String centro, String nomeAluno, String curso, int serieSemestre, String turno, Boolean matriculado, String bolsaFinanciamento, String descricaoPublica, String descricaoPrivada) {

        this.id = id;
        this.data = data;
        this.usuarioLogado = usuarioLogado;
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

    public Usuario getUsuarioLogado() {
        return usuarioLogado;
    }

    public void setUsuarioLogado(Usuario usuarioLogado) {
        this.usuarioLogado = usuarioLogado;
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
        final Atendimento other = (Atendimento) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Atendimento{" + "id=" + id + ", data=" + data + ", usuarioLogado=" + usuarioLogado + ", ra=" + ra + ", centro=" + centro + ", nomeAluno=" + nomeAluno + ", curso=" + curso + ", serieSemestre=" + serieSemestre + ", turno=" + turno + ", matriculado=" + matriculado + ", bolsaFinanciamento=" + bolsaFinanciamento + ", descricaoPublica=" + descricaoPublica + ", descricaoPrivada=" + descricaoPrivada + '}';
    }
}
