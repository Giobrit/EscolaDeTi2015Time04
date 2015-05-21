package br.unicesumar.escoladeti2015time04.utils.listagem;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RequisicaoListagem {

    private Long numeroItensPorPagina;
    private Long paginaAtual;
    private String[] colunasVisiveis;
    private String colunaOrdenacao;
    private Boolean ordenacaoCrescente;
    private String valorFiltragem;

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

    public String getOrdenacao() {
        String ordenacao;
        if (ordenacaoCrescente) {
            ordenacao = "asc";
        } else {
            ordenacao = "desc";
        }

        return " order by " + colunaOrdenacao + " " + ordenacao + " ";
    }
}
