package br.unicesumar.webservicelyceum.turma;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Turma implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private String codigo;
    private Calendar anoInicio;
    private Calendar anoFim;
    private String turno;
    private Integer serie;
    private String situacao;

    public Turma() {
    }

    public Turma(String codigo, Calendar anoInicio, Calendar anoFim, String periodo, Integer serie, String situacao) {        
        this.codigo = codigo;
        this.anoInicio = anoInicio;
        this.anoFim = anoFim;
        this.turno = periodo;
        this.serie = serie;
        this.situacao = situacao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Calendar getAnoInicio() {
        return anoInicio;
    }

    public void setAnoInicio(Calendar anoInicio) {
        this.anoInicio = anoInicio;
    }

    public Calendar getAnoFim() {
        return anoFim;
    }

    public void setAnoFim(Calendar anoFim) {
        this.anoFim = anoFim;
    }

    public String getPeriodo() {
        return turno;
    }

    public void setPeriodo(String periodo) {
        this.turno = periodo;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }

    public Integer getSerie() {
        return serie;
    }

    public void setSerie(Integer serie) {
        this.serie = serie;
    }
    
    @Override
    public int hashCode() {
        int hash = 5;
        hash = 19 * hash + Objects.hashCode(this.id);
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
        final Turma other = (Turma) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Turma{" + "id=" + id + ", codigo=" + codigo + ", anoInicio=" + anoInicio + ", anoFim=" + anoFim + ", periodo=" + turno + ", serie= " + serie +   '}';
    }
    
}
