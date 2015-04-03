package br.unicesumar.escoladeti2015time04.perfilacesso;

import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcesso;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "perfilacesso")
public class PerfilAcesso {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(nullable = true)
    private String nome;
    /*@Column(nullable = true, unique = true)
     private Set<ItemAcesso> listaItensAcesso = new HashSet<ItemAcesso>();;
     */

    public PerfilAcesso() {
    }

    public PerfilAcesso(String nome) {
        this.nome = nome;
    }

    public PerfilAcesso(Long id, String nome) {
        this.id = id;
        this.nome = nome;
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
    /*
     public Set<ItemAcesso> getListaItensAcesso() {
     return listaItensAcesso;
     }

     public void setListaItensAcesso(Set<ItemAcesso> itensAcesso) {
     this.listaItensAcesso = itensAcesso;
     }
     */

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
