package br.unicesumar.escoladeti2015time04.utils.listagem;

import java.lang.reflect.Field;
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
        for (Map.Entry<Field, ColunaListavel> entrySet : atributosEntidade.entrySet()) {
            Field atributo = entrySet.getKey();
            ColunaListavel colunaListavel = entrySet.getValue();

            if (!AND.equals(demaisFiltros)) {
                demaisFiltros += " or ";
            }

            if (colunaListavel.politicaFiltro() == PoliticaFiltragem.RELATIVO) {
                demaisFiltros += " lower(" + atributo.getName() + ") like :valorFiltroRelativo ";
            } else if (colunaListavel.politicaFiltro() == PoliticaFiltragem.VALOR_COMPLETO) {
                demaisFiltros += " lower(" + atributo.getName() + ") = :valorFiltroExato ";
            }
        }
        demaisFiltros += ")   ";
        return demaisFiltros;
    }
}
