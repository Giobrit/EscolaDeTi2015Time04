package br.unicesumar.escoladeti2015time04.usuario;

public class UsuarioCommandEditarPerfilUsuario {

    private final Long id;

    @Column(nullable = false)
    private final Senha senha;

    @JsonCreator
    public UsuarioCommandEditarSenha(@JsonProperty("id") Long id, @JsonProperty("senha") Senha senha) {
        this.id = id;
        this.senha = senha;
    }

    public Long getId() {
        return id;
    }

    public Senha getSenha() {
        return senha;
    }

}
