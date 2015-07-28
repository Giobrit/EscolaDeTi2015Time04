package br.unicesumar.escoladeti2015time04.usuario;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Set;
import javax.persistence.Column;

public class UsuarioCommandEditarPerfilUsuario {

    private final Long idUsuario;

    @Column(nullable = false)
    private final Set<Long> perfisDeAcesso;

    @JsonCreator
    public UsuarioCommandEditarPerfilUsuario(@JsonProperty("idUsuario") Long idUsuario, @JsonProperty("perfisDeAcesso") Set<Long> perfisDeAcesso) {
        this.idUsuario = idUsuario;
        this.perfisDeAcesso = perfisDeAcesso;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public Set<Long> getPerfisDeAcesso() {
        return perfisDeAcesso;
    }

}
