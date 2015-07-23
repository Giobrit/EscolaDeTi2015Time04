package br.unicesumar.escoladeti2015time04.perfilacesso;

import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import br.unicesumar.escoladeti2015time04.utils.service.CommandEditar;
import br.unicesumar.escoladeti2015time04.utils.service.TipoAtributoCommand;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;

@CommandEditar
public class PerfilAcessoCommandEditar {

    @AtributoCommand(tipoAtributo = TipoAtributoCommand.id)
    private final Long id;

    @AtributoCommand
    @Column(nullable = false)
    private final String nome;

    @AtributoCommand
    @Column(nullable = false)
    private Set<Long> itensDeAcesso = new HashSet<>();

    @JsonCreator
    public PerfilAcessoCommandEditar(@JsonProperty("id") Long id, @JsonProperty("nome") String nome, @JsonProperty("itensDeAcesso") Set<Long> itensDeAcesso) {
        this.id = id;
        this.nome = nome;
        this.itensDeAcesso = itensDeAcesso;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public Set<Long> getItensDeAcesso() {
        return itensDeAcesso;
    }
}
