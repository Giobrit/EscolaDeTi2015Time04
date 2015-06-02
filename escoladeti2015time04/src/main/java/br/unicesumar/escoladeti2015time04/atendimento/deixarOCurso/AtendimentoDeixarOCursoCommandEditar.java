package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.atendimento.AtendimentoCommandEditar;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivo;
import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import br.unicesumar.escoladeti2015time04.utils.service.CommandEditar;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import javax.persistence.Column;

@CommandEditar
public class AtendimentoDeixarOCursoCommandEditar extends AtendimentoCommandEditar {

    @AtributoCommand
    private Long protocolo;

    @AtributoCommand
    private String coordenadorDiretor;

    @AtributoCommand
    private String transferencia;

    @AtributoCommand
    @Column(nullable = false)
    private int numeroReprovacoes;

    @AtributoCommand
    @Column(nullable = false)
    private Long idMotivo;

    @AtributoCommand
    @Column(nullable = false)
    private Long idObjetivo;

    public AtendimentoDeixarOCursoCommandEditar(@JsonProperty("id") Long id, @JsonProperty("protocolo") Long protocolo,
            @JsonProperty("coordenadorDiretor") String coordenadorDiretor, @JsonProperty("transferencia") String transferencia,
            @JsonProperty("numeroReprovacoes") int numeroReprovacoes, @JsonProperty("motivo") Long idMotivo,
            @JsonProperty("objetivo") Long idObjetivo, @JsonProperty("data") Date data, @JsonProperty("ra") String ra,
            @JsonProperty("centro") String centro, @JsonProperty("nomeAluno") String nomeAluno, @JsonProperty("curso") String curso,
            @JsonProperty("serieSemestre") int serieSemestre, @JsonProperty("turno") String turno,
            @JsonProperty("matriculado") Boolean matriculado, @JsonProperty("bolsaFinanciamento") String bolsaFinanciamento,
            @JsonProperty("descricaoPublica") String descricaoPublica, @JsonProperty("descricaoPrivada") String descricaoPrivada) {
        this.id = id;
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.transferencia = transferencia;
        this.numeroReprovacoes = numeroReprovacoes;
        this.idMotivo = idMotivo;
        this.idObjetivo = idObjetivo;
        this.data = data;
        this.ra = ra;
        this.centro = centro;
        this.nomeAluno = nomeAluno;
        this.curso = curso;
        this.serieSemestre = serieSemestre;
        this.turno = turno;
        this.matriculado = matriculado;
        this.bolsaFinanciamento = bolsaFinanciamento;
        this.descricaoPublica = descricaoPublica;
        this.descricaoPrivada = descricaoPrivada;
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

    public Long getIdMotivo() {
        return idMotivo;
    }

    public Long getIdObjetivo() {
        return idObjetivo;
    }

}
