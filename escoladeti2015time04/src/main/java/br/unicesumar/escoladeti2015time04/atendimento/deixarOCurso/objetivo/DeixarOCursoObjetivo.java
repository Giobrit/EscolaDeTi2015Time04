package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo;

import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.listagem.PoliticaFiltragem;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "deixarocursoobjetivo")
public class DeixarOCursoObjetivo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @Column(nullable = false, unique = true)
    @ColunaListavel
    private String descricao;

    @Enumerated(EnumType.STRING)
    @ColunaListavel(politicaFiltro = PoliticaFiltragem.VALOR_COMPLETO)
    private DeixarOCursoObjetivoStatus status;

    public DeixarOCursoObjetivo() {
    }

    public DeixarOCursoObjetivo(String descricao) {
        this.descricao = descricao;
    }

    public DeixarOCursoObjetivo(String descricao, DeixarOCursoObjetivoStatus status) {
        this.descricao = descricao;
        this.status = status;
    }

    public DeixarOCursoObjetivo(Long id, String descricao, DeixarOCursoObjetivoStatus status) {
        this.id = id;
        this.descricao = descricao;
        this.status = status;
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

    public DeixarOCursoObjetivoStatus getStatus() {
        return status;
    }

    public void setStatus(DeixarOCursoObjetivoStatus status) {
        this.status = status;
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
