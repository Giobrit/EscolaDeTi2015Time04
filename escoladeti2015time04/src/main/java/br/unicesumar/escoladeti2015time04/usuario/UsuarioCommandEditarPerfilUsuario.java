package br.unicesumar.escoladeti2015time04.usuario;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Set;
import javax.persistence.Column;

public class UsuarioCommandEditarPerfilUsuario {

    private final Long idUsuario;

    @Column(nullable = false)
    private final Set<Long> perfisDeAceso;

    @JsonCreator
    public UsuarioCommandEditarPerfilUsuario(@JsonProperty("idUsuario") Long idUsuario, @JsonProperty("perfisDeAceso") Set<Long> perfisDeAceso) {
        this.idUsuario = idUsuario;
        this.perfisDeAceso = perfisDeAceso;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public Set<Long> getPerfisDeAceso() {
        return perfisDeAceso;
    }

}
