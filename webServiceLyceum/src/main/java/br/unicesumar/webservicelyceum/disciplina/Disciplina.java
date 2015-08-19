package br.unicesumar.webservicelyceum.disciplina;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "disciplina")
@SequenceGenerator(name = "seqDisciplina", sequenceName = "seq_disciplina", initialValue = 1, allocationSize = 1)
@SuppressWarnings("PersistenceUnitPresent")
public class Disciplina implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")    
    private Long id;
    
    @Column(name = "codigo")
    private String codigo;
    
    @Column(name = "nome")
    private String nome;
    
    @Column(name = "situacao")
    @Enumerated(EnumType.STRING)
    private DisciplinaSituacao situacao;    
    
    @Column(name = "cargaHoraria")
    private double cargaHoraria;    

    public Disciplina() {
    }

    public Disciplina(String codigo, String nome, DisciplinaSituacao situacao, double cargaHoraria) {
        this.codigo = codigo;
        this.nome = nome;
        this.situacao = situacao;
        this.cargaHoraria = cargaHoraria;
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

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public DisciplinaSituacao getSituacao() {
        return situacao;
    }

    public void setSituacao(DisciplinaSituacao situacao) {
        this.situacao = situacao;
    }

    public double getCargaHoraria() {
        return cargaHoraria;
    }

    public void setCargaHoraria(double cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 37 * hash + Objects.hashCode(this.id);
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
        final Disciplina other = (Disciplina) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Disciplina{" + "id=" + id + ", codigo=" + codigo + ", nome=" + nome + ", situacao=" + situacao + ", cargaHoraria=" + cargaHoraria + '}';
    }
       
}
