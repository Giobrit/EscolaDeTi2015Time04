package br.unicesumar.escoladeti2015time04.atendimento.especial;

import br.unicesumar.escoladeti2015time04.atendimento.Atendimento;
import br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao.EspecialSolicitacao;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivo;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.utils.service.ColunaLocalizavel;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "atendimentoespecial")
public class AtendimentoEspecial extends Atendimento implements Serializable {

    @ColunaListavel
    @ColunaLocalizavel
    private Long protocolo;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(name = "coordenadordiretor")
    private String coordenadorDiretor;

    @ColunaLocalizavel
    @Column(name = "laudomedico", nullable = false)
    @ColunaListavel(campoNaQuery = "CASE laudomedico WHEN true THEN 'Sim' ELSE 'Não' END", aliasNaQuery = "laudomedico")
    private boolean laudoMedico;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(name = "encaminhadopara")
    private String encaminhadoPara;

    @ManyToMany
    @JoinTable(
            name = "atendimentoespecial_especialsolicitacao",
            joinColumns = {
                @JoinColumn(name = "idatendimentoespecial", referencedColumnName = "id")},
            inverseJoinColumns = {
                @JoinColumn(name = "idespecialsolicitacao", referencedColumnName = "id")})
    private Set<EspecialSolicitacao> solicitacoes;

    public AtendimentoEspecial() {
    }

    public AtendimentoEspecial(Long protocolo, String coordenadorDiretor, boolean laudoMedico, String encaminhadoPara, Set<EspecialSolicitacao> solicitacoes) {
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.laudoMedico = laudoMedico;
        this.encaminhadoPara = encaminhadoPara;
        this.solicitacoes = solicitacoes;
    }

    public AtendimentoEspecial(Long protocolo, String coordenadorDiretor, boolean laudoMedico, AtendimentoMotivo motivo, String encaminhadoPara, Set<EspecialSolicitacao> solicitacoes, Date data, Usuario usuarioLogado, String ra, String centro, String nomeAluno, String curso, int serieSemestre, String turno, Boolean matriculado, String bolsaFinanciamento, String descricaoPublica, String descricaoPrivada) {
        super(data, usuarioLogado, ra, centro, nomeAluno, curso, serieSemestre, turno, matriculado, bolsaFinanciamento, motivo, descricaoPublica, descricaoPrivada);
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.laudoMedico = laudoMedico;
        this.encaminhadoPara = encaminhadoPara;
        this.solicitacoes = solicitacoes;
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
        return "AtendimentoEspecial{" + "protocolo=" + protocolo + ", coordenadorDiretor=" + coordenadorDiretor + ", laudoMedico=" + laudoMedico + ", encaminhadoPara=" + encaminhadoPara + ", solicitacao=" + solicitacoes + '}';
    }

}
