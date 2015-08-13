package br.unicesumar.webservicelyceum.bolsa;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Bolsa implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;    
    private Calendar data;
    private Calendar inicio;
    private Calendar fim;
    private double valor;
    private String bolsa;
    private String irmaos;

    public Bolsa() {
    }

    public Bolsa(Calendar data, Calendar inicio, Calendar fim, double valor, String bolsa, String irmaos) {
        this.data = data;
        this.inicio = inicio;
        this.fim = fim;
        this.valor = valor;
        this.bolsa = bolsa;
        this.irmaos = irmaos;
    }

    public Long getId() {
        return id;
    }

    public Calendar getData() {
        return data;
    }

    public void setData(Calendar data) {
        this.data = data;
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
        int hash = 5;
        hash = 73 * hash + Objects.hashCode(this.id);
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
        return "Bolsa{" + "id=" + id + ", data=" + data + ", inicio=" + inicio + ", fim=" + fim + ", valor=" + valor + ", bolsa=" + bolsa + ", irmaos=" + irmaos + '}';
    }
    
    
    
}
