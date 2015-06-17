package br.unicesumar.escoladeti2015time04.atendimento.preventivo;

import br.unicesumar.escoladeti2015time04.atendimento.Atendimento;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.preventivo.motivo.PreventivoMotivo;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "atendimentopreventivo")
public class AtendimentoPreventivo extends Atendimento implements Serializable{
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
    public String toString() {
        return "AtendimentoPreventivo{" + "numeroReprovacoes=" + numeroReprovacoes + ", motivo=" + motivo + ", meioContato=" + meioContato + ", encaminhamento=" + encaminhamento + '}';
    }
        
}
