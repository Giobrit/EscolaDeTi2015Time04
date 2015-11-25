package br.unicesumar.escoladeti2015time04.utils.listagem;

public class Ordenador {

    private static final String DECRESCENTE = "desc";
    private static final String ASCENDENTE = "asc";

    private String colunaDeOrdenacao;
    private Boolean ordenacaoCrescente;

    public Ordenador(String colunaDeOrdenacao) {
        this.colunaDeOrdenacao = colunaDeOrdenacao;
        this.ordenacaoCrescente = true;
    }
    
    public Ordenador(String colunaDeOrdenacao, Boolean ordenacaoCrescente) {
        this.colunaDeOrdenacao = colunaDeOrdenacao;
        this.ordenacaoCrescente = ordenacaoCrescente;
    }

    public String getOrdenacao() {
        String ordem;
        if (ordenacaoCrescente == null || ordenacaoCrescente) {
            ordem = ASCENDENTE;
        } else {
            ordem = DECRESCENTE;
        }

        String ordenacao;

        if (colunaDeOrdenacao != null) {
            ordenacao = " order by " + colunaDeOrdenacao + " " + ordem + " ";
        } else {
            ordenacao = "  ";
        }

        return ordenacao;
    }
}
