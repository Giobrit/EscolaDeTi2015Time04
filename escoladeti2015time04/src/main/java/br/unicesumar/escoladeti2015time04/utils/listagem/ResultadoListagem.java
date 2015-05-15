package br.unicesumar.escoladeti2015time04.utils.listagem;

import java.util.List;

public class ResultadoListagem<T> {

    private Long numeroTotalPaginas;
    private List<T> itens;

    public ResultadoListagem() {
    }

    public ResultadoListagem(Long numeroTotalPaginas, List<T> itens) {
        this.numeroTotalPaginas = numeroTotalPaginas;
        this.itens = itens;
    }

    public Long getNumeroTotalPaginas() {
        return numeroTotalPaginas;
    }

    public void setNumeroTotalPaginas(Long itensPorPagina, Long totalItens) {
        this.numeroTotalPaginas = totalItens / itensPorPagina;
    }

    public List<T> getItens() {
        return itens;
    }

    public void setItens(List<T> itens) {
        this.itens = itens;
    }

}
