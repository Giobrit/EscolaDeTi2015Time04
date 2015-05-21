
package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivo;
import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import br.unicesumar.escoladeti2015time04.utils.service.CommandEditar;
import br.unicesumar.escoladeti2015time04.utils.service.TipoAtributoCommand;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;


@CommandEditar
public class AtendimentoDeixarOCursoCommand {
    
    @AtributoCommand(tipoAtributo = TipoAtributoCommand.id)
    @Column(nullable = false)
    private final Long id;
    
    @AtributoCommand
    private final Long  protocolo;
    
    @AtributoCommand
    private final String coordenadorDiretor;
    
    @AtributoCommand
    private final String transferencia;
    
    @AtributoCommand
    @Column(nullable = false)
    private final int numeroReprovacoes;
    
    @AtributoCommand
    @Column(nullable = false)
    private final DeixarOCursoMotivo motivo;
    
    @AtributoCommand
    @Column(nullable = false)
    private final DeixarOCursoObjetivo objetivo;

    @JsonCreator    
    public AtendimentoDeixarOCursoCommand(@JsonProperty("id") Long id, @JsonProperty("protocolo") Long protocolo, 
                          @JsonProperty("coordenadordiretor") String coordenadorDiretor, @JsonProperty("transferencia") String transferencia, 
                          @JsonProperty("numeroreprovacoes") int numeroReprovacoes, @JsonProperty("motivo") DeixarOCursoMotivo motivo, 
                          @JsonProperty("objetivo") DeixarOCursoObjetivo objetivo) {
        this.id = id;
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.transferencia = transferencia;
        this.numeroReprovacoes = numeroReprovacoes;
        this.motivo = motivo;
        this.objetivo = objetivo;
    }

    public Long getId() {
        return id;
    }

    public Long getProtocolo() {
        return protocolo;
    }

    public String getCoordenadorDiretor() {
        return coordenadorDiretor;
    }

    public String getTransferencia() {
        return transferencia;
    }

    public int getNumeroReprovacoes() {
        return numeroReprovacoes;
    }

    public DeixarOCursoMotivo getMotivo() {
        return motivo;
    }

    public DeixarOCursoObjetivo getObjetivo() {
        return objetivo;
    }
    
    
}
