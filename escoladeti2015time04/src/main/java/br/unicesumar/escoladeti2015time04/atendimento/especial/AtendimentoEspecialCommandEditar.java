package br.unicesumar.escoladeti2015time04.atendimento.especial;

import br.unicesumar.escoladeti2015time04.atendimento.AtendimentoCommandEditar;
import br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao.EspecialSolicitacao;
import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import br.unicesumar.escoladeti2015time04.utils.service.CommandEditar;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import java.util.Set;
import javax.persistence.Column;

@CommandEditar
public class AtendimentoEspecialCommandEditar extends AtendimentoCommandEditar {

    @AtributoCommand
    private Long protocolo;

    @AtributoCommand
    private String coordenadorDiretor;

    @AtributoCommand
    private boolean laudoMedico;

    @AtributoCommand
    @Column(nullable = false)
    private Long idMotivo;

    @AtributoCommand
    private String encaminhadoPara;

    @AtributoCommand
    private Set<EspecialSolicitacao> solicitacoes;

    public AtendimentoEspecialCommandEditar(
            @JsonProperty("id") Long id,
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
            @JsonProperty("laudoMedico") boolean laudoMedico,
            @JsonProperty("encaminhadoPara") String encaminhadoPara,
            @JsonProperty("solicitacao") Set<EspecialSolicitacao> solicitacoes,
            @JsonProperty("idMotivo") Long idMotivo) {
        this.id = id;
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
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.laudoMedico = laudoMedico;
        this.encaminhadoPara = encaminhadoPara;
        this.solicitacoes = solicitacoes;
        this.idMotivo = idMotivo;
    }

    public Long getId() {
        return this.id;
    }

    public Long getProtocolo() {
        return protocolo;
    }

    public void setProtocolo(Long protocolo) {
        this.protocolo = protocolo;
    }

    public String getCoordenadorDiretor() {
        return coordenadorDiretor;
    }

    public void setCoordenadorDiretor(String coordenadorDiretor) {
        this.coordenadorDiretor = coordenadorDiretor;
    }

    public boolean isLaudoMedico() {
        return laudoMedico;
    }

    public void setLaudoMedico(boolean laudoMedico) {
        this.laudoMedico = laudoMedico;
    }

    public Long getIdMotivo() {
        return idMotivo;
    }

    public void setIdMotivo(Long idMotivo) {
        this.idMotivo = idMotivo;
    }

    public String getEncaminhadoPara() {
        return encaminhadoPara;
    }

    public void setEncaminhadoPara(String encaminhadoPara) {
        this.encaminhadoPara = encaminhadoPara;
    }

    public Set<EspecialSolicitacao> getSolicitacoes() {
        return solicitacoes;
    }

    public void setSolicitacoes(Set<EspecialSolicitacao> solicitacoes) {
        this.solicitacoes = solicitacoes;
    }

}
