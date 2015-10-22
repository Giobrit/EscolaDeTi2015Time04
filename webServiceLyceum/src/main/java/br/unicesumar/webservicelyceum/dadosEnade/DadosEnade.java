package br.unicesumar.webservicelyceum.dadosEnade;

import br.unicesumar.webservicelyceum.aluno.Aluno;
import java.io.Serializable;
import java.util.Calendar;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "dadosenade")
@SuppressWarnings("PersistenceUnitPresent")
public class DadosEnade implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "idaluno")
    private Aluno aluno;
    
    @Column(name = "ano")
    @Temporal(TemporalType.DATE)
    private Calendar ano;
    
    @Column(name = "tipo")
    private String tipo;
    
    @Column(name = "compareceu")
    private boolean compareceu;
    
    @Column(name = "dispensado")
    private boolean dispensado;

    public DadosEnade() {
    }

    public DadosEnade(Aluno aluno, Calendar ano, String tipo, boolean compareceu, boolean dispensado) {
        this.aluno = aluno;
        this.ano = ano;
        this.tipo = tipo;
        this.compareceu = compareceu;
        this.dispensado = dispensado;
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

    public Calendar getAno() {
        return ano;
    }

    public void setAno(Calendar ano) {
        this.ano = ano;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public boolean isCompareceu() {
        return compareceu;
    }

    public void setCompareceu(boolean compareceu) {
        this.compareceu = compareceu;
    }

    public boolean isDispensado() {
        return dispensado;
    }

    public void setDispensado(boolean dispensado) {
        this.dispensado = dispensado;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 29 * hash + Objects.hashCode(this.id);
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
        final DadosEnade other = (DadosEnade) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "DadosEnade{" + "id=" + id + ", aluno=" + aluno + ", ano=" + ano + ", tipo=" + tipo + ", compareceu=" + compareceu + ", dispensado=" + dispensado + '}';
    }
        
}
