package br.unicesumar.escoladeti2015time04.aluno;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.HashMap;
import java.util.Map;

public class FiltroLinhaTempo {

    private final String nome;
    private final String alias;

    @JsonCreator
    public FiltroLinhaTempo(@JsonProperty("nome") String nome) {
        this.nome = nome;
        this.alias = prepararAlias();
    }

    public String getCase() {
//        when ate.id is not null then 'Atendimento Especial' 

        return " when " + alias + ".id is not null then '" + getLabel() + "'";
    }

    public String getInnerJoin() {
        //left join usuario us on att.usuariologado = us.id 

        return " left join " + nome + " " + alias + " on " + alias + ".id = att.id";
    }

    public String getWhere() {
        //atp.id is not null 

        return alias + ".id is not null ";
    }

    private String prepararAlias() {
        String alias = "";
        for (char caractere : nome.toCharArray()) {
            if (Character.isUpperCase(caractere)) {
                alias += caractere;
            }
        }

        return alias.toLowerCase();
    }

    private String getLabel() {
        Map<String, String> labels = new HashMap<>();
        labels.put("AtendimentoDeixarOCurso", "Atendimento");
        labels.put("AtendimentoPreventivo", "Atendimento Preventivo");
        labels.put("AtendimentoEspecial", "Atendimento Especial");

        return labels.get(nome);
    }

}
