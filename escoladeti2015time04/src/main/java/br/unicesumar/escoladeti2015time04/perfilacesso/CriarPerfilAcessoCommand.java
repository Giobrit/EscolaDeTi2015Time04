package br.unicesumar.escoladeti2015time04.perfilacesso;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.HashSet;
import java.util.Set;

public class CriarPerfilAcessoCommand {
    private String nome;
    private Set<Long> listaItensAcessoIds = new HashSet<Long>();
    
    @JsonCreator
    public CriarPerfilAcessoCommand(@JsonProperty("nome") String nome, @JsonProperty("listaItensAcessoIds") Set<Long> listaItensAcessoIds){
        this.nome = nome;
        this.listaItensAcessoIds = listaItensAcessoIds;
    }

    public String getNome() {
        return nome;
    }

    public Set<Long> getListaItensAcessoIds() {
        return listaItensAcessoIds;
    }    
}
