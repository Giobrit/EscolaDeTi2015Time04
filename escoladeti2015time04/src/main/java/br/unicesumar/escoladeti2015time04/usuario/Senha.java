
package br.unicesumar.escoladeti2015time04.usuario;

import java.io.Serializable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.persistence.Embeddable;

@Embeddable
public class Senha implements Serializable{
    
    private String senha;

    public Senha() {
    }

    public Senha(String senha) {
        validarSenha(senha);
        this.senha = senha;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        validarSenha(senha);
        this.senha = senha;
       
    }
    
    private void validarSenha(String senha){
        
        Pattern minusculas = Pattern.compile("[a-z]");  
        if ( !minusculas.matcher(senha).find()) 
            System.out.println("senha inválida");
    }
    
}
