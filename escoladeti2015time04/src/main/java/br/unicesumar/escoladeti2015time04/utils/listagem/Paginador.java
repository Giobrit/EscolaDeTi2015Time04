package br.unicesumar.escoladeti2015time04.utils.listagem;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

public abstract class Paginador {

    protected Long numeroItensPorPagina;
    protected Long paginaAtual;

    public Paginador() {
    }

    public Paginador(Long numeroItens, Long paginaAtual) {
        this.numeroItensPorPagina = numeroItens;
        this.paginaAtual = paginaAtual;
    }

    public abstract String getPaginacao(MapSqlParameterSource parans);

    public Long getNumeroItensPorPagina() {
        return numeroItensPorPagina;
    }

    public Long getPaginaAtual() {
        return paginaAtual;
    }

}
