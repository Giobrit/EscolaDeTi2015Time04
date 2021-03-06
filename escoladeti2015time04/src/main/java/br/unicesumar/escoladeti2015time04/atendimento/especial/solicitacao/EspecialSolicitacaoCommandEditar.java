package br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao;

import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import br.unicesumar.escoladeti2015time04.utils.service.CommandEditar;
import br.unicesumar.escoladeti2015time04.utils.service.TipoAtributoCommand;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;

@CommandEditar
public class EspecialSolicitacaoCommandEditar {

    @AtributoCommand(tipoAtributo = TipoAtributoCommand.id)
    private final Long id;

    @AtributoCommand
    @Column(nullable = false)
    private final String descricao;

    @JsonCreator
    public EspecialSolicitacaoCommandEditar(@JsonProperty("id") Long id, @JsonProperty("descricao") String descricao) {
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
