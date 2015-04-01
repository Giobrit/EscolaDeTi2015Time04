package br.unicesumar.escoladeti2015time04.perfilacesso;

import java.util.Objects;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PerfilAcesso {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(nullable = true)//Nome do perfil é obrigatorio
    private String nome;
    //Falta colocar um Set de itens de acesso aqui  
    //private Set<ItensAcesso> itensAcesso = new Set<>();
    
    public PerfilAcesso() {
    }
    //Não sei se há necessidade de um construtor alternativo
    public PerfilAcesso(String nome) {
        /*Não pode existir perfil com nomes duplicados*/
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        /*Não pode existir perfil com nomes duplicados, deve ser implementado verificação*/
        this.nome = nome;
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
