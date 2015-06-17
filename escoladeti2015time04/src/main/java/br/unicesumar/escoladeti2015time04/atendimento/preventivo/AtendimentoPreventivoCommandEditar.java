package br.unicesumar.escoladeti2015time04.atendimento.preventivo;

import br.unicesumar.escoladeti2015time04.atendimento.AtendimentoCommandEditar;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class AtendimentoPreventivoCommandEditar extends AtendimentoCommandEditar{
    @AtributoCommand
    @Column(nullable = false)
    private int numeroReprovacoes;
    
    
    @AtributoCommand
    private String meioContato;
    
    @AtributoCommand
    private String encaminhamento;
    
    @AtributoCommand
    @Column(nullable = false)
    private Long idMotivo;
    
    public AtendimentoPreventivoCommandEditar(@JsonProperty("id") Long id, @JsonProperty("numeroReprovacoes") int numeroReprovacoes, 
            @JsonProperty("meioContato") String meioContato,@JsonProperty("encaminhamento") String encaminhamento,
            @JsonProperty("motivo") Long idMotivo, @JsonProperty("data") Date data, @JsonProperty("ra") String ra,
            @JsonProperty("centro") String centro, @JsonProperty("nomeAluno") String nomeAluno, @JsonProperty("curso") String curso,
            @JsonProperty("serieSemestre") int serieSemestre, @JsonProperty("turno") String turno,
            @JsonProperty("matriculado") Boolean matriculado, @JsonProperty("bolsaFinanciamento") String bolsaFinanciamento,
            @JsonProperty("descricaoPublica") String descricaoPublica, @JsonProperty("descricaoPrivada") String descricaoPrivada) {
        this.id = id;        
        this.numeroReprovacoes = numeroReprovacoes;
        this.meioContato = meioContato;
        this.encaminhamento = encaminhamento;
        this.idMotivo = idMotivo;        
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
    
    public int getNumeroReprovacoes() {
        return numeroReprovacoes;
    }

    public String getMeioContato() {
        return meioContato;
    }

    public String getEncaminhamento() {
        return encaminhamento;
    }

    public Long getIdMotivo() {
        return idMotivo;
    }
    
    
}
