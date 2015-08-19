package br.unicesumar.webservicelyceum.bolsa;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "bolsa")
@SequenceGenerator(name = "seqBolsa", sequenceName = "seq_bolsa", initialValue = 1, allocationSize = 1)
@SuppressWarnings("PersistenceUnitPresent")
public class Bolsa implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;    
    
    @Column(name = "dataInicio")
    @Temporal(TemporalType.DATE)
    private Calendar dataInicio;
    
    @Column(name = "inicio")
    @Temporal(TemporalType.DATE)
    private Calendar inicio;
    
    @Column(name = "fim")
    @Temporal(TemporalType.DATE)
    private Calendar fim;
    
    @Column(name = "valor")
    private double valor;
    
    @Column(name = "bolsa")
    private String bolsa;
    
    @Column(name = "irmaos")
    private String irmaos;

    public Bolsa() {
    }

    public Bolsa(Calendar dataInicio, Calendar inicio, Calendar fim, double valor, String bolsa, String irmaos) {        
        this.dataInicio = dataInicio;
        this.inicio = inicio;
        this.fim = fim;
        this.valor = valor;
        this.bolsa = bolsa;
        this.irmaos = irmaos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Calendar getData() {
        return dataInicio;
    }

    public void setData(Calendar dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Calendar getInicio() {
        return inicio;
    }

    public void setInicio(Calendar inicio) {
        this.inicio = inicio;
    }

    public Calendar getFim() {
        return fim;
    }

    public void setFim(Calendar fim) {
        this.fim = fim;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public String getBolsa() {
        return bolsa;
    }

    public void setBolsa(String bolsa) {
        this.bolsa = bolsa;
    }

    public String getIrmaos() {
        return irmaos;
    }

    public void setIrmaos(String irmaos) {
        this.irmaos = irmaos;
    }

    @Override
    public int hashCode() {
        int hash = 3;
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
        final Bolsa other = (Bolsa) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Bolsa{" + "id=" + id + ", dataInicio=" + dataInicio + ", inicio=" + inicio + ", fim=" + fim + ", valor=" + valor + ", bolsa=" + bolsa + ", irmaos=" + irmaos + '}';
    }

}
