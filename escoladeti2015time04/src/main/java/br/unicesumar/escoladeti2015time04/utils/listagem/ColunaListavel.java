package br.unicesumar.escoladeti2015time04.utils.listagem;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ColunaListavel {
    public PoliticaFiltragem politicaFiltro() default PoliticaFiltragem.VALOR_RELATIVO;
    public String nomeNaQuery() default "";
}
