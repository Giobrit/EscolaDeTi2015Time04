package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.atendimento.AtendimentoCommandInserir;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivo;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import javax.persistence.Column;

public class AtendimentoDeixarOCursoCommandInserir extends AtendimentoCommandInserir {

    private Long protocolo;

    private String coordenadorDiretor;

    private String transferencia;

    private int numeroReprovacoes;

    @Column(nullable = false)
    private Long idMotivo;

    @Column(nullable = false)
    private Long idObjetivo;

    public AtendimentoDeixarOCursoCommandInserir(
            Long protocolo,
            String coordenadorDiretor,
            String transferencia,
            int numeroReprovacoes,
            Long idMotivo,
            Long idObjetivo,
            Long id,
            Date data,
            String ra,
            String centro,
            String nomeAluno,
            String curso,
            int serieSemestre,
            String turno,
            Boolean matriculado,
            String bolsaFinanciamento,
            String descricaoPublica,
            String descricaoPrivada) {
        super(id, data, ra, centro, nomeAluno, curso, serieSemestre, turno, matriculado, bolsaFinanciamento, descricaoPublica, descricaoPrivada);
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.transferencia = transferencia;
        this.numeroReprovacoes = numeroReprovacoes;
        this.idMotivo = idMotivo;
        this.idObjetivo = idObjetivo;
    }

    public AtendimentoDeixarOCursoCommandInserir(@JsonProperty("id") Long id, @JsonProperty("protocolo") Long protocolo,
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
