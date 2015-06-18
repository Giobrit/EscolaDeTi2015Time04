package br.unicesumar.escoladeti2015time04.atendimento.motivo;

import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.listagem.PoliticaFiltragem;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Table;

@Entity
@Table(name = "atendimentomotivo")
public class AtendimentoMotivo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @Column(nullable = false, unique = true)
    @ColunaListavel
    private String descricao;

    @Column(nullable = false)
    @ColunaListavel(politicaFiltro = PoliticaFiltragem.VALOR_COMPLETO)
    @Enumerated(EnumType.STRING)
    private AtendimentoMotivoStatus status;

    @Column(name = "atendimentodomotivo",nullable = false)
    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = AtendimentoDoMotivo.class)
    @JoinTable(
            name = "atendimentodomotivo",
            joinColumns = {@JoinColumn(name = "atendimentomotivoid", referencedColumnName = "id")}
    )
    private Set<AtendimentoDoMotivo> atendimentosDoMotivo;

    public AtendimentoMotivo() {
    }

    public AtendimentoMotivo(String descricao) {
        this.descricao = descricao;
    }

    public AtendimentoMotivo(Long id, String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public AtendimentoMotivo(String descricao, Set<AtendimentoDoMotivo> atendimentosDoMotivo) {
        this.descricao = descricao;
        this.atendimentosDoMotivo = atendimentosDoMotivo;
    }

    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public AtendimentoMotivoStatus getStatus() {
        return status;
    }

    public Set<AtendimentoDoMotivo> getAtendimentosDoMotivo() {
        return atendimentosDoMotivo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setStatus(AtendimentoMotivoStatus status) {
        this.status = status;
    }

    public void setAtendimentosDoMotivo(Set<AtendimentoDoMotivo> atendimentosDoMotivo) {
        this.atendimentosDoMotivo = atendimentosDoMotivo;
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
        final AtendimentoMotivo other = (AtendimentoMotivo) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "AtendimentoMotivo{" + "id=" + id + ", descricao=" + descricao + ", status=" + status + ", atendimenotsDoMotivo=" + atendimentosDoMotivo + '}';
    }
}
