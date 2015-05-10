package br.unicesumar.escoladeti2015time04.utils.listagem;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ListPolicy {

    public Policy policy() default Policy.RELATIVE;
}
