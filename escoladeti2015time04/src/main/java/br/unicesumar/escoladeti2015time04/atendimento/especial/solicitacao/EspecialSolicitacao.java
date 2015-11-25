package br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao;

import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.listagem.PoliticaFiltragem;
import br.unicesumar.escoladeti2015time04.utils.service.ColunaLocalizavel;
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
@Table(name = "especialsolicitacao")
public class EspecialSolicitacao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(nullable = false, unique = true)
    private String descricao;
    
    @ColunaLocalizavel
    @Enumerated(EnumType.STRING)
    @ColunaListavel(politicaFiltro = PoliticaFiltragem.VALOR_COMPLETO)
    private EspecialSolicitacaoStatus status;

    public EspecialSolicitacao() {
    }

    public EspecialSolicitacao(String descricao) {
        this.descricao = descricao;
    }

    public EspecialSolicitacao(String descricao, EspecialSolicitacaoStatus status) {
        this.descricao = descricao;
        this.status = status;
    }

    public EspecialSolicitacao(Long id, String descricao, EspecialSolicitacaoStatus status) {
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

    public EspecialSolicitacaoStatus getStatus() {
        return status;
    }

    public void setStatus(EspecialSolicitacaoStatus status) {
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
        final EspecialSolicitacao other = (EspecialSolicitacao) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

}
