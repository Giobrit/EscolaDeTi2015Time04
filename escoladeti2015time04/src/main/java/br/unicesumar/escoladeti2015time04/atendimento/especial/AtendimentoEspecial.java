package br.unicesumar.escoladeti2015time04.atendimento.especial;

import br.unicesumar.escoladeti2015time04.atendimento.Atendimento;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "atendimentoespecial")
public class AtendimentoEspecial extends Atendimento implements Serializable {

    @ColunaListavel
    private Long protocolo;

    @ColunaListavel
    @Column(name = "coordenadordiretor")
    private String coordenadorDiretor;

    @ColunaListavel(nomeNaQuery = "CASE laudo WHEN true THEN 'Sim' ELSE 'Não' END AS laudo")
    @Column(name = "laudo", nullable = false)
    private boolean laudoMedico;

    @ManyToOne
    @ColunaListavel(nomeNaQuery = "m.descricao as motivo")
    @JoinColumn(name = "motivo", nullable = false)
    private DeixarOCursoMotivo motivo;

    @ColunaListavel
    @Column(name = "encaminhamento")
    private String encaminhamento;
    
    @ColunaListavel
    @Column(name = "solicitacao")
    private String solicitacao;

    public AtendimentoEspecial() {
    }

    public AtendimentoEspecial(Long protocolo, String coordenadorDiretor, boolean laudoMedico, DeixarOCursoMotivo motivo, String encaminhamento, String solicitacao) {
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.laudoMedico = laudoMedico;
        this.motivo = motivo;
        this.encaminhamento = encaminhamento;
        this.solicitacao = solicitacao;
    }

    public AtendimentoEspecial(Long protocolo, String coordenadorDiretor, boolean laudoMedico, DeixarOCursoMotivo motivo, String encaminhamento, String solicitacao, Date data, Usuario usuarioLogado, String ra, String centro, String nomeAluno, String curso, int serieSemestre, String turno, Boolean matriculado, String bolsaFinanciamento, String descricaoPublica, String descricaoPrivada) {
        super(data, usuarioLogado, ra, centro, nomeAluno, curso, serieSemestre, turno, matriculado, bolsaFinanciamento, descricaoPublica, descricaoPrivada);
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.laudoMedico = laudoMedico;
        this.motivo = motivo;
        this.encaminhamento = encaminhamento;
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

    public DeixarOCursoMotivo getMotivo() {
        return motivo;
    }

    public void setMotivo(DeixarOCursoMotivo motivo) {
        this.motivo = motivo;
    }

    public String getEncaminhamento() {
        return encaminhamento;
    }

    public void setEncaminhamento(String encaminhamento) {
        this.encaminhamento = encaminhamento;
    }

    public String getSolicitacao() {
        return solicitacao;
    }

    public void setSolicitacao(String solicitacao) {
        this.solicitacao = solicitacao;
    }
    
    @Override
    public int hashCode() {
        int hash = 3;
        hash = 53 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final AtendimentoEspecial other = (AtendimentoEspecial) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "AtendimentoEspecial{" + "protocolo=" + protocolo + ", coordenadorDiretor=" + coordenadorDiretor + ", laudoMedico=" + laudoMedico + ", motivo=" + motivo + ", encaminhamento=" + encaminhamento + ", solicitacao=" + solicitacao + '}';
    }
}
