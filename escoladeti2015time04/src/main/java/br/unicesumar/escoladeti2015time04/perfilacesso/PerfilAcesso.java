package br.unicesumar.escoladeti2015time04.perfilacesso;

import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcesso;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.service.ColunaLocalizavel;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "perfilacesso")
public class PerfilAcesso {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(nullable = false)
    private String nome;

    @NotNull
    @ManyToMany
    @JoinTable(
            name = "perfilacesso_itemacesso",
            joinColumns = {
                @JoinColumn(name = "idperfilacesso", referencedColumnName = "id")},
            inverseJoinColumns = {
                @JoinColumn(name = "iditemacesso", referencedColumnName = "id")}, foreignKey = @ForeignKey(name = "PERFILACESSO_ITEMACESSO_FK"))
    private Set<ItemAcesso> itensDeAcesso = new HashSet<>();

    public PerfilAcesso() {
    }

    public PerfilAcesso(String nome) {
        this.nome = nome;
    }

    public PerfilAcesso(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    public PerfilAcesso(String nome, Set<ItemAcesso> lista) {
        this.nome = nome;
        this.itensDeAcesso = lista;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<ItemAcesso> getItensDeAcesso() {
        return itensDeAcesso;
    }

    public void setItensDeAcesso(Set<ItemAcesso> itensDeAcesso) {
        this.itensDeAcesso = itensDeAcesso;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 97 * hash + Objects.hashCode(this.id);
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
        final PerfilAcesso other = (PerfilAcesso) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PerfilAcesso{" + "id=" + id + ", nome=" + nome + '}';
    }
}
