package br.unicesumar.escoladeti2015time04.atendimento.motivo;

import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import br.unicesumar.escoladeti2015time04.utils.service.CommandEditar;
import br.unicesumar.escoladeti2015time04.utils.service.TipoAtributoCommand;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Set;
import javax.persistence.Column;

@CommandEditar
public class AtendimentoMotivoCommandEditar {

    @AtributoCommand(tipoAtributo = TipoAtributoCommand.id)
    private final Long id;

    @AtributoCommand()
    @Column(nullable = false)
    private final String descricao;
    
    @AtributoCommand()
    @Column(nullable = false)
    private final Set<AtendimentoDoMotivo> atendimentosDoMotivo;

    @JsonCreator

    public AtendimentoMotivoCommandEditar(@JsonProperty("id") Long id, @JsonProperty("descricao") String descricao, @JsonProperty("atendimentosDoMotivo") Set<AtendimentoDoMotivo> atendimentosDoMotivo){
        this.id = id;
        this.descricao = descricao;
        this.atendimentosDoMotivo = atendimentosDoMotivo;
    }

    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Set<AtendimentoDoMotivo> getAtendimentosDoMotivo() {
        return atendimentosDoMotivo;
    }
}
