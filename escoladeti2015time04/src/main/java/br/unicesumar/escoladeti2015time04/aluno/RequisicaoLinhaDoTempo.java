package br.unicesumar.escoladeti2015time04.aluno;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class RequisicaoLinhaDoTempo {

    private String ra;
    private List<FiltroLinhaTempo> filtrosLinhaTempo;

    @JsonCreator
    public RequisicaoLinhaDoTempo(@JsonProperty String ra, @JsonProperty List<FiltroLinhaTempo> filtrosLinhaTempo) {
        this.ra = ra;
        this.filtrosLinhaTempo = filtrosLinhaTempo;
    }

    public String getRa() {
        return ra;
    }

    public void setRa(String ra) {
        this.ra = ra;
    }

    public List<FiltroLinhaTempo> getFiltrosLinhaTempo() {
        return filtrosLinhaTempo;
    }

    public void setFiltrosLinhaTempo(List<FiltroLinhaTempo> filtrosLinhaTempo) {
        this.filtrosLinhaTempo = filtrosLinhaTempo;
    }

}
