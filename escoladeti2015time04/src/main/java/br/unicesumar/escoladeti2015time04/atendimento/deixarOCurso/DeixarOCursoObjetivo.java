package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DeixarOCursoObjetivo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    @Column(nullable=false, unique=true)    
    private String descricao;
    @Enumerated(EnumType.STRING)
    private DeixarOCursoObjetivoStatus status;
    
    public DeixarOCursoObjetivo() {
    }

    public DeixarOCursoObjetivoStatus getStatus() {
        return status;
    }

    public void setStatus(DeixarOCursoObjetivoStatus status) {
        this.status = status;
    }
    
    public DeixarOCursoObjetivo(Long id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }


    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return "Objetivo{" + "id=" + id + ", descricao=" + descricao + '}';
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 13 * hash + Objects.hashCode(this.id);
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
        final DeixarOCursoObjetivo other = (DeixarOCursoObjetivo) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }
    
    

    
    
    
}
