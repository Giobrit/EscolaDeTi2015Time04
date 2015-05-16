package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo;

import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import br.unicesumar.escoladeti2015time04.utils.service.CommandEditar;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;

@CommandEditar
public class DeixarOCursoMotivoCommandEditar {

    @AtributoCommand()
    private final Long id;

    @AtributoCommand()
    @Column(nullable = false)
    private final String descricao;

    @JsonCreator

    public DeixarOCursoMotivoCommandEditar(@JsonProperty("id") Long id, @JsonProperty("descricao") String descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

}
