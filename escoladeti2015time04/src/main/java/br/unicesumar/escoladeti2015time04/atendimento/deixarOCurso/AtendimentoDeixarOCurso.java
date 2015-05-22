
package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.*;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "atendimentodeixarocurso")
public class AtendimentoDeixarOCurso implements Serializable {
  
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    
    @ColunaListavel
    private Long protocolo;
    
    @ColunaListavel
    private String coordenadorDiretor;
    
    @ColunaListavel
    private String transferencia;
    
    @ColunaListavel
    @Column(nullable = false)
    private int numeroReprovacoes;
        
    @ManyToOne
    @ColunaListavel
    private DeixarOCursoMotivo motivo;
    
    @ManyToOne
    @ColunaListavel
    private DeixarOCursoObjetivo objetivo;

    public AtendimentoDeixarOCurso() {
    }

    public AtendimentoDeixarOCurso(Long id, Long protocolo, String coordenadorDiretor, String transferencia, int numeroReprovacoes, DeixarOCursoMotivo motivo, DeixarOCursoObjetivo objetivo) {
        this.id = id;
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
        return "AtendimentoDeixarOCurso{" + "id=" + id + ", protocolo=" + protocolo + ", coordenadorDiretor=" + coordenadorDiretor + ", transferencia=" + transferencia + ", numeroReprovacoes=" + numeroReprovacoes + ", motivo=" + motivo + ", objetivo=" + objetivo + '}';
    }
    
        
    
}
