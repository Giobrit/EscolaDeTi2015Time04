package br.unicesumar.escoladeti2015time04.perfilacesso;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;

public class CriarPerfilAcessoCommand {

    @Column(nullable = false)
    private final String nome;
    @Column(nullable = false)
    private Set<Long> conjuntoItemAcessoIds = new HashSet<>();

    @JsonCreator
    public CriarPerfilAcessoCommand(@JsonProperty("nome") String nome, @JsonProperty("listaItensAcessoIds") Set<Long> conjuntoItemAcessoIds) {
        this.nome = nome;
        this.conjuntoItemAcessoIds = conjuntoItemAcessoIds;
    }

    public String getNome() {
        return nome;
    }

    public Set<Long> getConjuntoItemAcessoIds() {
        return conjuntoItemAcessoIds;
    }
}
