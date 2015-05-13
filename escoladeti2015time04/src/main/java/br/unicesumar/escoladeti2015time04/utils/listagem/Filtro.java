package br.unicesumar.escoladeti2015time04.utils.listagem;

import java.lang.reflect.Field;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

public class Filtro<E> {

    protected String valorFiltro;
    protected String condicaoPadrao = "true";

    public Filtro() {
    }

    public Filtro(String valorFiltro) {
        this.valorFiltro = valorFiltro;
    }

    public void setCondicaoPadrao(String condicao) {
        this.condicaoPadrao = condicao;
    }

    public String getFiltros(Field[] atributosEntidade, MapSqlParameterSource parans) {
        String filtros = "where ";
        filtros += condicaoPadrao;
        try {
            parans.addValue("valorFiltroRelativo", "%" + valorFiltro.toLowerCase().trim() + "%");
            parans.addValue("valorFiltroExato", valorFiltro.toLowerCase().trim());

            filtros += " AND (";

            for (Field atributoEntidade : atributosEntidade) {
                ColunaListavel[] politicasFiltragem = atributoEntidade.getAnnotationsByType(ColunaListavel.class);
                if (politicasFiltragem.length == 0) {
                    continue;
                }

                if (politicasFiltragem[0].politicaFiltro()== Politica.RELATIVO) {
                    filtros += "lower(" + atributoEntidade.getName() + ") like :valorFiltroRelativo or ";
                } else if (politicasFiltragem[0].politicaFiltro()== Politica.VALOR_COMPLETO) {
                    filtros += "lower(" + atributoEntidade.getName() + ") = :valorFiltroExato ";
                }
            }

            filtros += ")   ";
        } catch (Exception e) {
            filtros = "  ";
        }

        return filtros;
    }
}
