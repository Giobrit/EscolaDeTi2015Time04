package br.unicesumar.escoladeti2015time04.itemAcesso;

import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "itemacesso")
public class ItemAcesso {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @Column(nullable = false, unique = true)
    private String descricao;

    @Column(unique = true)
    private String rota;
    
    @Column(nullable = false)
    private Boolean grupo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "superior")
    private ItemAcesso superior;

    public ItemAcesso() {
    }

    public ItemAcesso(String descricao, String rota) {
        this.descricao = descricao;
        this.rota = rota;
        this.grupo = false;
    }

    public ItemAcesso(String descricao, ItemAcesso superior) {
        this.descricao = descricao;
        this.grupo = false;
        this.superior = superior;
    }
    
    public ItemAcesso(String descricao, ItemAcesso superior, Boolean grupo) {
        this.descricao = descricao;
        this.superior = superior;
        this.grupo = grupo;
    }

    public ItemAcesso(String descricao, String rota, ItemAcesso superior) {
        this.descricao = descricao;
        this.rota = rota;
        this.grupo = false;
        this.superior = superior;
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

    public String getRota() {
        return rota;
    }

    public void setRota(String rota) {
        this.rota = rota;
    }

    public ItemAcesso getSuperior() {
        return superior;
    }

    public void setSuperior(ItemAcesso superior) {
        this.superior = superior;
    }

    @Override
    public int hashCode() {
        int hash = 7;
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
        final ItemAcesso other = (ItemAcesso) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ItemAcesso{" + "id=" + id + ", descricao=" + descricao + ", rota=" + rota + ", grupo=" + grupo + ", superior=" + superior + '}';
    }
}
