package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.atendimento.Atendimento;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.*;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivo;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.utils.service.ColunaLocalizavel;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQuery;
import javax.persistence.Table;

@Entity
@Table(name = "atendimentodeixarocurso")
@NamedNativeQuery(name = "AtendimentoDeixarOCurso.pegarAlgumaCoisa", query = "select * from where id = :id")
public class AtendimentoDeixarOCurso extends Atendimento implements Serializable {

    @ColunaListavel
    @ColunaLocalizavel
    private Long protocolo;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(name = "coordenadordiretor")
    private String coordenadorDiretor;

    @ColunaListavel
    @ColunaLocalizavel
    private String transferencia;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(name = "numeroreprovacoes", nullable = false)
    private int numeroReprovacoes;

    @ManyToOne
    @ColunaListavel(campoNaQuery = "o.descricao", aliasNaQuery = "objetivo")
    @ColunaLocalizavel(campoNaQuery = "o.descricao", aliasNaQuery = "objetivo")
    @JoinColumn(name = "objetivo", nullable = false)
    private DeixarOCursoObjetivo objetivo;

    public AtendimentoDeixarOCurso() {
    }

    public AtendimentoDeixarOCurso(Long protocolo, String coordenadorDiretor, String transferencia, int numeroReprovacoes, DeixarOCursoObjetivo objetivo) {
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.transferencia = transferencia;
        this.numeroReprovacoes = numeroReprovacoes;
        this.objetivo = objetivo;
    }

    public AtendimentoDeixarOCurso(Long protocolo, String coordenadorDiretor, String transferencia, int numeroReprovacoes, AtendimentoMotivo motivo, DeixarOCursoObjetivo objetivo, Date data, Usuario usuarioLogado, String ra, String centro, String nomeAluno, String curso, int serieSemestre, String turno, Boolean matriculado, String bolsaFinanciamento, String descricaoPublica, String descricaoPrivada) {
        super(data, usuarioLogado, ra, centro, nomeAluno, curso, serieSemestre, turno, matriculado, bolsaFinanciamento, motivo, descricaoPublica, descricaoPrivada);
        this.protocolo = protocolo;
        this.coordenadorDiretor = coordenadorDiretor;
        this.transferencia = transferencia;
        this.numeroReprovacoes = numeroReprovacoes;
        this.objetivo = objetivo;
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

    public String getTransferencia() {
        return transferencia;
    }

    public void setTransferencia(String transferencia) {
        this.transferencia = transferencia;
    }

    public int getNumeroReprovacoes() {
        return numeroReprovacoes;
    }

    public void setNumeroReprovacoes(int numeroReprovacoes) {
        this.numeroReprovacoes = numeroReprovacoes;
    }

    public DeixarOCursoObjetivo getObjetivo() {
        return objetivo;
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
        return "AtendimentoDeixarOCurso{" + "protocolo=" + protocolo + ", coordenadorDiretor=" + coordenadorDiretor + ", transferencia=" + transferencia + ", numeroReprovacoes=" + numeroReprovacoes + ", objetivo=" + objetivo + '}';
    }

}
