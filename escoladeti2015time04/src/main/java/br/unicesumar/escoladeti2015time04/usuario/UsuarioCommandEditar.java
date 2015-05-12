package br.unicesumar.escoladeti2015time04.usuario;

import br.unicesumar.escoladeti2015time04.utils.Email;
import br.unicesumar.escoladeti2015time04.utils.service.CommandEditar;
import br.unicesumar.escoladeti2015time04.utils.service.IdCommand;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;

@CommandEditar
public class UsuarioCommandEditar {
    
    @IdCommand
    private final Long id;
    @Column(nullable = false)
    private final String nome;

    @Column(unique = true, nullable = false)
    private String login;

    private Email email;

    private Status status;

    @JsonCreator
    public UsuarioCommandEditar(@JsonProperty("id") Long id, @JsonProperty("nome") String nome, @JsonProperty("login") String login, @JsonProperty("email") Email email, @JsonProperty("status") Status status) {
        this.id = id;
        this.nome = nome;
        this.login = login;
        this.email = email;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getLogin() {
        return login;
    }

    public Email getEmail() {
        return email;
    }

    public Status getStatus() {
        return status;
    }

}
