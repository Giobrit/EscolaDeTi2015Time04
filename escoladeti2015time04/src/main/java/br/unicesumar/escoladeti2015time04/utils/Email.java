package br.unicesumar.escoladeti2015time04.utils;

import java.io.Serializable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.persistence.Embeddable;

@Embeddable
public class Email implements Serializable{
    
    private String email;

    public Email() {
    }

    public Email(String email) {
        this.email = email;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        try{
            if(validarEmail(email)){
                this.email = email;
            }
        }catch(IllegalArgumentException e){
            e.printStackTrace();
        }
    }

    private boolean validarEmail(String email) {
        // Expressão Regular para validar E-mail
        Pattern p = Pattern.compile("^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$");
        Matcher m = p.matcher(email);
        if(!m.find()) {
            return true;
        } else {
            return false;
        }        
    }

    @Override
    public String toString() {
        return email;
    }
    
    
}
