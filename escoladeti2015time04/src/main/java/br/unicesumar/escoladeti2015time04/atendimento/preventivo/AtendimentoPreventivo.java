package br.unicesumar.escoladeti2015time04.atendimento.preventivo;

import br.unicesumar.escoladeti2015time04.atendimento.Atendimento;
import br.unicesumar.escoladeti2015time04.atendimento.preventivo.motivo.PreventivoMotivo;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "atendimentopreventivo")
public class AtendimentoPreventivo extends Atendimento implements Serializable {

    @ColunaListavel
    @Column(name = "numeroreprovacoes", nullable = false)
    private int numeroReprovacoes;

    @ManyToOne
    @ColunaListavel(nomeNaQuery = "m.descricao as motivo")
    @JoinColumn(name = "motivo", nullable = false)
    private PreventivoMotivo motivo;

    @ColunaListavel
    @Column(name = "meiocontato", nullable = false)
    private String meioContato;

    @ColunaListavel
    @Column(name = "encaminhamento", nullable = false)
    private String encaminhamento;

    public AtendimentoPreventivo() {
    }

    public AtendimentoPreventivo(int numeroReprovacoes, PreventivoMotivo motivo, String meioContato, String encaminhamento) {
        this.numeroReprovacoes = numeroReprovacoes;
        this.motivo = motivo;
        this.meioContato = meioContato;
        this.encaminhamento = encaminhamento;
    }

    public AtendimentoPreventivo(int numeroReprovacoes, PreventivoMotivo motivo, String meioContato, String encaminhamento, Date data, Usuario usuarioLogado, String ra, String centro, String nomeAluno, String curso, int serieSemestre, String turno, Boolean matriculado, String bolsaFinanciamento, String descricaoPublica, String descricaoPrivada) {
        super(data, usuarioLogado, ra, centro, nomeAluno, curso, serieSemestre, turno, matriculado, bolsaFinanciamento, descricaoPublica, descricaoPrivada);
        this.numeroReprovacoes = numeroReprovacoes;
        this.motivo = motivo;
        this.meioContato = meioContato;
        this.encaminhamento = encaminhamento;
    }

    public int getNumeroReprovacoes() {
        return numeroReprovacoes;
    }

    public void setNumeroReprovacoes(int numeroReprovacoes) {
        this.numeroReprovacoes = numeroReprovacoes;
    }

    public PreventivoMotivo getMotivo() {
        return motivo;
    }

    public void setMotivo(PreventivoMotivo motivo) {
        this.motivo = motivo;
    }

    public String getMeioContato() {
        return meioContato;
    }

    public void setMeioContato(String meioContato) {
        this.meioContato = meioContato;
    }

    public String getEncaminhamento() {
        return encaminhamento;
    }

    public void setEncaminhamento(String encaminhamento) {
        this.encaminhamento = encaminhamento;
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
        final AtendimentoPreventivo other = (AtendimentoPreventivo) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "AtendimentoPreventivo{" + "numeroReprovacoes=" + numeroReprovacoes + ", motivo=" + motivo + ", meioContato=" + meioContato + ", encaminhamento=" + encaminhamento + '}';
    }

}
