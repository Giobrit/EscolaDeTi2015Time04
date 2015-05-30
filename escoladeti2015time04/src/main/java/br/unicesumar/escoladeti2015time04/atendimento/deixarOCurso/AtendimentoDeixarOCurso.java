package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.atendimento.Atendimento;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.*;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "atendimentodeixarocurso")
public class AtendimentoDeixarOCurso extends Atendimento implements Serializable {

    @ColunaListavel
    private Long protocolo;

    @ColunaListavel
    @Column(name = "coordenadordiretor")
    private String coordenadorDiretor;

    @ColunaListavel
    private String transferencia;

    @ColunaListavel
    @Column(name = "numeroreprovacoes", nullable = false)
    private int numeroReprovacoes;

    @ManyToOne
    @ColunaListavel
    @JoinColumn(name = "motivo", nullable = false)
    private DeixarOCursoMotivo motivo;

    @ManyToOne
    @ColunaListavel
    @JoinColumn(name = "objetivo", nullable = false)
    private DeixarOCursoObjetivo objetivo;

    public AtendimentoDeixarOCurso() {
    }

    public AtendimentoDeixarOCurso(Long protocolo, String coordenadorDiretor, String transferencia, int numeroReprovacoes, DeixarOCursoMotivo motivo, DeixarOCursoObjetivo objetivo) {
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.transferencia = transferencia;
        this.numeroReprovacoes = numeroReprovacoes;
        this.motivo = motivo;
        this.objetivo = objetivo;
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

    public void setCoordenadorDiretor(String coordenadorDiretor) {
        this.coordenadorDiretor = coordenadorDiretor;
    }

    public void setTransferencia(String transferencia) {
        this.transferencia = transferencia;
    }

    public void setMotivo(DeixarOCursoMotivo motivo) {
        this.motivo = motivo;
    }

    public void setObjetivo(DeixarOCursoObjetivo objetivo) {
        this.objetivo = objetivo;
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
        final AtendimentoDeixarOCurso other = (AtendimentoDeixarOCurso) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "AtendimentoDeixarOCurso{" + "protocolo=" + protocolo + ", coordenadorDiretor=" + coordenadorDiretor + ", transferencia=" + transferencia + ", numeroReprovacoes=" + numeroReprovacoes + ", motivo=" + motivo + ", objetivo=" + objetivo + '}';
    }

}
