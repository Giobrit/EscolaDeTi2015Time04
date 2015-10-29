package br.unicesumar.webservicelyceum.pendenciasAluno;

import br.unicesumar.webservicelyceum.aluno.Aluno;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class PendenciaAluno {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    
    @ManyToOne
    private Aluno aluno;    
    
    @Column(name = "ultimoperiodocursado")
    private String ultimoPeriodoCursado;
    
    @Column(name = "periodotrancado")
    private String periodoTrancado;
    
    @Column(name = "analisecredito")
    private String analiseCredito;
    
    @Column(name = "obsfinanceiras")
    private String obsFinanceiras;
    
    @Column(name = "devemultabiblioteca")
    private String deveMultaBiblioteca;
    
    @Column(name = "develivrobiblioteca")
    private String deveLivroBiblioteca;
    
    @Column(name = "documentos")
    private String documentos;
    
    @Column(name = "inadimplente")
    private String inadimplente;
    
    @Column(name = "juridico")
    private String juridico;
    
    @Column(name = "informacoesadicionais")
    private String informacoesAdicionais;
    

    public PendenciaAluno() {
    }

    public PendenciaAluno(Aluno aluno, String ultimoPeriodoCursado, String periodoTrancado, String analiseCredito, String obsFinanceiras, String deveMultaBiblioteca, String deveLivroBiblioteca, String documentos, String inadimplente, String juridico, String informacoesAdicionais) {
        this.aluno = aluno;
        this.ultimoPeriodoCursado = ultimoPeriodoCursado;
        this.periodoTrancado = periodoTrancado;
        this.analiseCredito = analiseCredito;
        this.obsFinanceiras = obsFinanceiras;
        this.deveMultaBiblioteca = deveMultaBiblioteca;
        this.deveLivroBiblioteca = deveLivroBiblioteca;
        this.documentos = documentos;
        this.inadimplente = inadimplente;
        this.juridico = juridico;
        this.informacoesAdicionais = informacoesAdicionais;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public String getUltimoPeriodoCursado() {
        return ultimoPeriodoCursado;
    }

    public void setUltimoPeriodoCursado(String ultimoPeriodoCursado) {
        this.ultimoPeriodoCursado = ultimoPeriodoCursado;
    }

    public String getJuridico() {
        return juridico;
    }

    public void setJuridico(String juridico) {
        this.juridico = juridico;
    }

    public String getPeriodoTrancado() {
        return periodoTrancado;
    }

    public void setPeriodoTrancado(String periodoTrancado) {
        this.periodoTrancado = periodoTrancado;
    }

    public String getAnaliseCredito() {
        return analiseCredito;
    }

    public void setAnaliseCredito(String analiseCredito) {
        this.analiseCredito = analiseCredito;
    }

    public String getObsFinanceiras() {
        return obsFinanceiras;
    }

    public void setObsFinanceiras(String obsFinanceiras) {
        this.obsFinanceiras = obsFinanceiras;
    }

    public String getDeveMultaBiblioteca() {
        return deveMultaBiblioteca;
    }

    public void setDeveMultaBiblioteca(String deveMultaBiblioteca) {
        this.deveMultaBiblioteca = deveMultaBiblioteca;
    }

    public String getDeveLivroBiblioteca() {
        return deveLivroBiblioteca;
    }

    public void setDeveLivroBiblioteca(String deveLivroBiblioteca) {
        this.deveLivroBiblioteca = deveLivroBiblioteca;
    }

    public String getDocumentos() {
        return documentos;
    }

    public void setDocumentos(String documentos) {
        this.documentos = documentos;
    }

    public String getInadimplente() {
        return inadimplente;
    }

    public void setInadimplente(String inadimplente) {
        this.inadimplente = inadimplente;
    }

    public String getInformacoesAdicionais() {
        return informacoesAdicionais;
    }

    public void setInformacoesAdicionais(String informacoesAdicionais) {
        this.informacoesAdicionais = informacoesAdicionais;
    }
    
    

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 83 * hash + Objects.hashCode(this.id);
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
        final PendenciaAluno other = (PendenciaAluno) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "PendenciaAluno{" + "id=" + id + ", aluno=" + aluno + ", ultimoPeriodoCursado=" + ultimoPeriodoCursado + ", periodoTrancado=" + periodoTrancado + ", analiseCredito=" + analiseCredito + ", obsFinanceiras=" + obsFinanceiras + ", deveMultaBiblioteca=" + deveMultaBiblioteca + ", deveLivroBiblioteca=" + deveLivroBiblioteca + ", documentos=" + documentos + ", inadimplente=" + inadimplente + ", juridico=" + juridico + '}';
    }
}
