
package br.unicesumar.escoladeti2015time04.atendimento;

import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import br.unicesumar.escoladeti2015time04.utils.service.CommandEditar;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;
import javax.persistence.Column;


@CommandEditar
public class AtendimentoCommandEditar {
 
    @AtributoCommand
    @Column(nullable = false)
    private final Long id;

    @AtributoCommand
    @Column(nullable = false)
    private final Date data;
            
    @AtributoCommand
    @Column(nullable = false)
    private final String ra;
    
    @AtributoCommand
    @Column(nullable = false)
    private final String centro;
    
    @AtributoCommand
    @Column(nullable = false)
    private final String nomeAluno;
    
    @AtributoCommand
    @Column(nullable = false)
    private final String curso;
    
    @AtributoCommand
    @Column(nullable = false)
    private final int serieSemestre;
    
    @AtributoCommand
    @Column(nullable = false)
    private final String turno;
    
    @AtributoCommand
    @Column(nullable = false)
    private final Boolean matriculado;
    
    @AtributoCommand
    @Column(nullable = false)
    private final String bolsaFinanciamento;
    
    @AtributoCommand
    @Column(nullable = false)
    private String descricaoPublica;
    
    @AtributoCommand
    @Column(nullable = false)
    private String descricaoPrivada;

    public AtendimentoCommandEditar(@JsonProperty("id") Long id, @JsonProperty("data") Date data, @JsonProperty("ra") String ra, 
            @JsonProperty("centro") String centro, @JsonProperty("nomealuno") String nomeAluno, @JsonProperty("curso") String curso, 
            @JsonProperty("seriesemestre") int serieSemestre, @JsonProperty("turno") String turno,  
            @JsonProperty("matriculado") Boolean matriculado, @JsonProperty("bolsafinanciamento") String bolsaFinanciamento,  
            @JsonProperty("descricaopublica") String descricaoPublica, @JsonProperty("descricaoprivada") String descricaoPrivada) {
        
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
    }
    
    
    

    public Date getData() {
        return data;
    }

    public String getRa() {
        return ra;
    }

    public String getCentro() {
        return centro;
    }

    public String getNomeAluno() {
        return nomeAluno;
    }

    public String getCurso() {
        return curso;
    }

    public int getSerieSemestre() {
        return serieSemestre;
    }

    public String getTurno() {
        return turno;
    }

    public Boolean getMatriculado() {
        return matriculado;
    }

    public String getBolsaFinanciamento() {
        return bolsaFinanciamento;
    }

    public String getDescricaoPublica() {
        return descricaoPublica;
    }

    public String getDescricaoPrivada() {
        return descricaoPrivada;
    }
    
}
