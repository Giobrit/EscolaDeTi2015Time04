package br.unicesumar.escoladeti2015time04.perfilacesso;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;

public class PerfilAcessoCommandInserir {

    @Column(nullable = false)
    private final String nome;
    @Column(nullable = false)
    private Set<Long> itensDeAcesso = new HashSet<>();

    @JsonCreator
    public PerfilAcessoCommandInserir(@JsonProperty("nome") String nome, @JsonProperty("itensDeAcesso") Set<Long> itensDeAcesso) {
        this.nome = nome;
        this.itensDeAcesso = itensDeAcesso;
    }

    public String getNome() {
        return nome;
    }

    public Set<Long> getConjuntoItemAcessoIds() {
        return itensDeAcesso;
    }
}
