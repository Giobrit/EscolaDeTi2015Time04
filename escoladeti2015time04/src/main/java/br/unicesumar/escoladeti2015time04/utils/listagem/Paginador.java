package br.unicesumar.escoladeti2015time04.utils.listagem;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

public abstract class Paginador {

    protected Long numeroItens;
    protected Long paginaAtual;

    public Paginador() {
    }

    public Paginador(Long numeroItens, Long paginaAtual) {
        this.numeroItens = numeroItens;
        this.paginaAtual = paginaAtual;
    }

    public abstract String getPaginacao(MapSqlParameterSource parans);
}
