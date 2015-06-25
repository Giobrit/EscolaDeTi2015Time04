package br.unicesumar.escoladeti2015time04.atendimento.preventivo;

import br.unicesumar.escoladeti2015time04.atendimento.AtendimentoCommandInserir;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import javax.persistence.Column;

public class AtendimentoPreventivoCommandInserir extends AtendimentoCommandInserir {

    @Column(nullable = false)
    private int numeroReprovacoes;

    private String meioContato;

    private String encaminhamento;

    @Column(nullable = false)
    private Long idMotivo;

    public AtendimentoPreventivoCommandInserir(
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
            @JsonProperty("numeroReprovacoes") int numeroReprovacoes,
            @JsonProperty("meioContato") String meioContato,
            @JsonProperty("encaminhamento") String encaminhamento,
            @JsonProperty("idMotivo") Long idMotivo) {
        super(data, ra, centro, nomeAluno, curso, serieSemestre, turno, matriculado, bolsaFinanciamento, descricaoPublica, descricaoPrivada);
        this.numeroReprovacoes = numeroReprovacoes;
        this.meioContato = meioContato;
        this.encaminhamento = encaminhamento;
        this.idMotivo = idMotivo;
    }

    public int getNumeroReprovacoes() {
        return numeroReprovacoes;
    }

    public Long getIdMotivo() {
        return idMotivo;
    }

    public String getMeioContato() {
        return meioContato;
    }

    public String getEncaminhamento() {
        return encaminhamento;
    }

}
