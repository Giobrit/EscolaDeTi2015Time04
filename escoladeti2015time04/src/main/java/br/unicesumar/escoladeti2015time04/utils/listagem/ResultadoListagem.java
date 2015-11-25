package br.unicesumar.escoladeti2015time04.utils.listagem;

import java.util.List;

public class ResultadoListagem<T> {

    private Long numeroTotalRegistros;
    private List<T> itens;

    public ResultadoListagem() {
    }

    public ResultadoListagem(Long numeroTotalRegistros, List<T> itens) {
        this.numeroTotalRegistros = numeroTotalRegistros;
        this.itens = itens;
    }

    public Long getNumeroTotalRegistros() {
        return numeroTotalRegistros;
    }

    public void setNumeroTotalRegistros(Long numeroTotalRegistros) {
        this.numeroTotalRegistros = numeroTotalRegistros;
    }

    public List<T> getItens() {
        return itens;
    }

    public void setItens(List<T> itens) {
        this.itens = itens;
    }

}
