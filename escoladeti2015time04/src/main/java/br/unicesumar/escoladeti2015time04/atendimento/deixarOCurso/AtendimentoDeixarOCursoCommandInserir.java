package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.atendimento.AtendimentoCommandInserir;
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
            @JsonProperty("data") Date data,
            @JsonProperty("ra") String ra,
            @JsonProperty("centro") String centro,
            @JsonProperty("nomeAluno") String nomeAluno,
            @JsonProperty("curso") String curso,
            @JsonProperty("serieSemestre") int serieSemestre,
            @JsonProperty("turno") String turno,
            @JsonProperty("matriculado") Boolean matriculado,
            @JsonProperty("bolsaFinanciamento") String bolsaFinanciamento,
            @JsonProperty("descricaoPublica") String descricaoPublica,
            @JsonProperty("descricaoPrivada") String descricaoPrivada,
            @JsonProperty("protocolo") Long protocolo,
            @JsonProperty("coordenadorDiretor") String coordenadorDiretor,
            @JsonProperty("transferencia") String transferencia,
            @JsonProperty("numeroReprovacoes") int numeroReprovacoes,
            @JsonProperty("idMotivo") Long idMotivo,
            @JsonProperty("idObjetivo") Long idObjetivo) {
        super(data, ra, centro, nomeAluno, curso, serieSemestre, turno, matriculado, bolsaFinanciamento, descricaoPublica, descricaoPrivada);
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.transferencia = transferencia;
        this.numeroReprovacoes = numeroReprovacoes;
        this.idMotivo = idMotivo;
        this.idObjetivo = idObjetivo;
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
