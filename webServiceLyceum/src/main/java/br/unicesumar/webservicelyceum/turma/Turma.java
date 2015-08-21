package br.unicesumar.webservicelyceum.turma;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "turma")
@SuppressWarnings("PersistenceUnitPresent")
public class Turma implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "codigo")
    private String codigo;
    
    @Column(name = "anoinicio")
    @Temporal(TemporalType.DATE)
    private Calendar anoInicio;
    
    @Column(name = "anofim")
    @Temporal(TemporalType.DATE)
    private Calendar anoFim;
    
    @Column(name = "turno")
    private String turno;
    
    @Column(name = "serie")
    private Integer serie;
    
    @Column(name = "situacao")
    @Enumerated(EnumType.STRING)
    private TurmaSituacao situacao;

    public Turma() {
    }

    public Turma(String codigo, Calendar anoInicio, Calendar anoFim, String turno, Integer serie, TurmaSituacao situacao) {
        this.codigo = codigo;
        this.anoInicio = anoInicio;
        this.anoFim = anoFim;
        this.turno = turno;
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

    public TurmaSituacao getSituacao() {
        return situacao;
    }

    public void setSituacao(TurmaSituacao situacao) {
        this.situacao = situacao;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 47 * hash + Objects.hashCode(this.id);
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
        return "Turma{" + "id=" + id + ", codigo=" + codigo + ", anoInicio=" + anoInicio + ", anoFim=" + anoFim + ", turno=" + turno + ", serie=" + serie + ", situacao=" + situacao + '}';
    }

    
}
