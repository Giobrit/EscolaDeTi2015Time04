package br.unicesumar.escoladeti2015time04.atendimento.especial;

import br.unicesumar.escoladeti2015time04.atendimento.AtendimentoCommandInserir;
import br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao.EspecialSolicitacao;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import javax.persistence.Column;

public class AtendimentoEspecialCommandInserir extends AtendimentoCommandInserir {

    private Long protocolo;

    private String coordenadorDiretor;

    private boolean laudoMedico;

    @Column(nullable = false)
    private Long idMotivo;

    private String encaminhadoPara;
    
    private EspecialSolicitacao solicitacao;

    public AtendimentoEspecialCommandInserir(
            @JsonProperty("data") Date data,
            @JsonProperty("usuario") Long usuario,
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
            @JsonProperty("solicitacao") EspecialSolicitacao solicitacao,            
            @JsonProperty("idMotivo") Long idMotivo) {
        super(data, usuario, ra, centro, nomeAluno, curso, serieSemestre, turno, matriculado, bolsaFinanciamento, descricaoPublica, descricaoPrivada);
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.laudoMedico = laudoMedico;
        this.idMotivo = idMotivo;
        this.encaminhadoPara = encaminhadoPara;
        this.solicitacao = solicitacao;        
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

    public EspecialSolicitacao getSolicitacao() {
        return solicitacao;
    }

    public void setSolicitacao(EspecialSolicitacao solicitacao) {
        this.solicitacao = solicitacao;
    }

    
}
