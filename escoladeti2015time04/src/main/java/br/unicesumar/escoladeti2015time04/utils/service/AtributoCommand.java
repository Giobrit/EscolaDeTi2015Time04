package br.unicesumar.escoladeti2015time04.utils.service;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.persistence.Id;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AtributoCommand {
    public String equivalente() default "";
    public TipoAtributoCommand tipoAtributo() default TipoAtributoCommand.atributo;
}
