package br.unicesumar.escoladeti2015time04.utils.listagem;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

public class PaginadorPostgreSQL extends Paginador {

    public PaginadorPostgreSQL() {
    }

    public PaginadorPostgreSQL(Long numeroItens, Long paginaAtual) {
        super(numeroItens, paginaAtual);
    }

    @Override
    public String getPaginacao(MapSqlParameterSource parans) {
        String paginacao;
        try {
            parans.addValue("limite", numeroItens);
            parans.addValue("inicio", (paginaAtual - 1) * numeroItens);
            paginacao = "limit :limite offset :inicio";
        } catch (Exception e) {
            paginacao = "";
        }

        return paginacao;
    }

}
