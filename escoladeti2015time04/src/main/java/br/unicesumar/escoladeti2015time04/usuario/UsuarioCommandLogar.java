package br.unicesumar.escoladeti2015time04.usuario;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;

public class UsuarioCommandLogar {

    @Column(nullable = false)
    private String loginOuEmail;
    
    @Column(nullable = false)
    private Senha senha;

    @JsonCreator
    public UsuarioCommandLogar(@JsonProperty("loginOuEmail") String loginOuEmail, @JsonProperty("senha") Senha senha) {
        this.loginOuEmail = loginOuEmail;
        this.senha = senha;
    }

    public String getLoginOuEmail() {
        return loginOuEmail;
    }

    public Senha getSenha() {
        return senha;
    }

}
