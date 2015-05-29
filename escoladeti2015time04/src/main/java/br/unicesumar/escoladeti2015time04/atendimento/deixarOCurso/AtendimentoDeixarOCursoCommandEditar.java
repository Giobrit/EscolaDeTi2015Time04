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
    private DeixarOCursoMotivo motivo;

    @AtributoCommand
    @Column(nullable = false)
    private DeixarOCursoObjetivo objetivo;

    public AtendimentoDeixarOCursoCommandEditar(@JsonProperty("id") Long id, @JsonProperty("protocolo") Long protocolo,
            @JsonProperty("coordenadordiretor") String coordenadorDiretor, @JsonProperty("transferencia") String transferencia,
            @JsonProperty("numeroreprovacoes") int numeroReprovacoes, @JsonProperty("motivo") DeixarOCursoMotivo motivo,
            @JsonProperty("objetivo") DeixarOCursoObjetivo objetivo, @JsonProperty("data") Date data, @JsonProperty("ra") String ra,
            @JsonProperty("centro") String centro, @JsonProperty("nomealuno") String nomeAluno, @JsonProperty("curso") String curso,
            @JsonProperty("seriesemestre") int serieSemestre, @JsonProperty("turno") String turno,
            @JsonProperty("matriculado") Boolean matriculado, @JsonProperty("bolsafinanciamento") String bolsaFinanciamento,
            @JsonProperty("descricaopublica") String descricaoPublica, @JsonProperty("descricaoprivada") String descricaoPrivada) {
        this.id = id;
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.transferencia = transferencia;
        this.numeroReprovacoes = numeroReprovacoes;
        this.motivo = motivo;
        this.objetivo = objetivo;
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

    public DeixarOCursoMotivo getMotivo() {
        return motivo;
    }

    public DeixarOCursoObjetivo getObjetivo() {
        return objetivo;
    }

}
