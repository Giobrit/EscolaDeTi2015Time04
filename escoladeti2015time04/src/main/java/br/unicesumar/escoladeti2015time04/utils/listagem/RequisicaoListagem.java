package br.unicesumar.escoladeti2015time04.utils.listagem;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class RequisicaoListagem {

    private final Long numeroItensPorPagina;
    private final Long paginaAtual;
    private final String[] colunasVisiveis;
    private final String colunaOrdenacao;
    private final Boolean ordenacaoCrescente;
    private final String valorFiltragem;

    @JsonCreator
    public RequisicaoListagem(@JsonProperty("numeroItens") Long numeroItensPorPagina, @JsonProperty("paginaAtual") Long paginaAtual, @JsonProperty("colunaOrdenacao") String colunaOrdenacao, @JsonProperty("valorFiltragem") String valorFiltragem, @JsonProperty("colunasVisiveis") String[] colunasVisiveis, @JsonProperty("ordenacaoCrescente") Boolean ordenacaoCrescente) {
        this.numeroItensPorPagina = numeroItensPorPagina;
        this.paginaAtual = paginaAtual;
        this.colunasVisiveis = colunasVisiveis;
        this.colunaOrdenacao = colunaOrdenacao;
        this.valorFiltragem = valorFiltragem;
        this.ordenacaoCrescente = ordenacaoCrescente;
    }

    public Filtro getFiltro() {
        return new Filtro(valorFiltragem);
    }

    public Paginador getPaginador() {
        return new PaginadorPostgreSQL(numeroItensPorPagina, paginaAtual);
    }

    public Ordenador getOrdenador() {
        return new Ordenador(colunaOrdenacao, ordenacaoCrescente);
    }
    
    public Set<String> getColunasVisiveis() {
        return new HashSet<>(Arrays.asList(this.colunasVisiveis));
    }
}
