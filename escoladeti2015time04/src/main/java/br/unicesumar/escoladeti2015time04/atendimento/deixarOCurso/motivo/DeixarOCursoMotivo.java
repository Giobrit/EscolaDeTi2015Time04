package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo;

import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DeixarOCursoMotivo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @Column(nullable = false, unique = true)
    @ColunaListavel
    private String descricao;

    @Column(nullable = false)
    @ColunaListavel
    @Enumerated
    private DeixarOCursoMotivoStatus status;

    public DeixarOCursoMotivo() {
    }

    public DeixarOCursoMotivo(String descricao) {
        this.descricao = descricao;
    }

    public DeixarOCursoMotivo(Long id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public DeixarOCursoMotivoStatus getStatus() {
        return status;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setStatus(DeixarOCursoMotivoStatus status) {
        this.status = status;
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
        final DeixarOCursoMotivo other = (DeixarOCursoMotivo) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Motivo{" + "id=" + id + ", descricao=" + descricao + '}';
    }

}
