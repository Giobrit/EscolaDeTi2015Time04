package br.unicesumar.escoladeti2015time04.perfilacesso;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;

public class EditarPerfilAcessoCommand {

    private final Long id;
    @Column(nullable = false)
    private final String nome;
    @Column(nullable = false)
    private Set<Long> conjuntoItemAcessoIds = new HashSet<>();

    @JsonCreator
    public EditarPerfilAcessoCommand(@JsonProperty("id") Long id, @JsonProperty("nome") String nome, @JsonProperty("listaItensAcessoIds") Set<Long> conjuntoItemAcessoIds) {
        this.id = id;
        this.nome = nome;
        this.conjuntoItemAcessoIds = conjuntoItemAcessoIds;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public Set<Long> getConjuntoItemAcessoIds() {
        return conjuntoItemAcessoIds;
    }
}
