package br.unicesumar.escoladeti2015time04.utils;

import br.unicesumar.escoladeti2015time04.utils.excecoes.CampoInvalido;
import java.io.Serializable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Email implements Serializable {

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    public Email() {
    }

    public Email(String email) {
        if (!validarEmail(email)) {
            throw new CampoInvalido("Email");
        }
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (!validarEmail(email)) {
            throw new CampoInvalido("Email");
        }
        this.email = email;
    }

    private boolean validarEmail(String email) {
        // Expressão Regular para validar E-mail
        Pattern p = Pattern.compile("^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$");
        Matcher m = p.matcher(email);
        if (!m.find()) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return email;
    }

}
