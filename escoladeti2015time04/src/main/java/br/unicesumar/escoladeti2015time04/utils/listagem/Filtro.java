package br.unicesumar.escoladeti2015time04.utils.listagem;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.Map;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

public class Filtro {

    private static final String AND = " AND (";

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

    public String getFiltros(Map<Field, ColunaListavel> atributosEntidade, MapSqlParameterSource parans) {
        String filtroPadrao = " where ";
        filtroPadrao += condicaoPadrao;

        try {
            parans.addValue("valorFiltroRelativo", "%" + valorFiltro.toLowerCase().trim() + "%");
            parans.addValue("valorFiltroExato", valorFiltro.toLowerCase().trim());
        } catch (NullPointerException ex) {
            return filtroPadrao;
        }

        return filtroPadrao + getDemaisFiltros(atributosEntidade);
    }

    private String getDemaisFiltros(Map<Field, ColunaListavel> atributosEntidade) {
        String demaisFiltros = AND;
        for (Map.Entry<Field, ColunaListavel> mapAtributo : atributosEntidade.entrySet()) {
            Field atributo = mapAtributo.getKey();
            ColunaListavel colunaListavel = mapAtributo.getValue();

            if (!AND.equals(demaisFiltros)) {
                demaisFiltros += " or ";
            }

            if (colunaListavel.politicaFiltro() == PoliticaFiltragem.VALOR_RELATIVO) {
                demaisFiltros += " lower( (" + getCampoFiltro(colunaListavel, atributo) + ")::varchar) like :valorFiltroRelativo ";
            } else if (colunaListavel.politicaFiltro() == PoliticaFiltragem.VALOR_COMPLETO) {
                demaisFiltros += " lower( (" + getCampoFiltro(colunaListavel, atributo) + ")::varchar) = :valorFiltroExato ";
            }
        }
        demaisFiltros += ") ";
        return demaisFiltros;
    }

    private String getCampoFiltro(ColunaListavel colunaListavel, Field atributo) {
        String campoString;

        if ("".equals(colunaListavel.campoNaQuery())) {
            campoString = atributo.getName();
        } else {
            campoString = colunaListavel.campoNaQuery();
        }

        if (atributo.getType() == Date.class) {
            campoString = "to_char(" + campoString + ", 'DD/mm/YYYY HH24:MI:SS')";
        }

        return campoString;
    }
}
