package br.unicesumar.escoladeti2015time04.atendimento;

import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import br.unicesumar.escoladeti2015time04.utils.service.CommandEditar;
import br.unicesumar.escoladeti2015time04.utils.service.TipoAtributoCommand;
import java.util.Date;
import javax.persistence.Column;

@CommandEditar
public class AtendimentoCommandEditar {

    @AtributoCommand(tipoAtributo = TipoAtributoCommand.id)
    @Column(nullable = false)
    protected Long id;

    @AtributoCommand
    @Column(nullable = false)
    protected Date data;

    @AtributoCommand
    @Column(nullable = false)
    protected String ra;

    @AtributoCommand
    @Column(nullable = false)
    protected String centro;

    @AtributoCommand
    @Column(nullable = false)
    protected String nomeAluno;

    @AtributoCommand
    @Column(nullable = false)
    protected String curso;

    @AtributoCommand
    @Column(nullable = false)
    protected int serieSemestre;

    @AtributoCommand
    @Column(nullable = false)
    protected String turno;

    @AtributoCommand
    @Column(nullable = false)
    protected Boolean matriculado;

    @AtributoCommand
    @Column(nullable = false)
    protected String bolsaFinanciamento;

    @AtributoCommand
    @Column(nullable = false)
    protected String descricaoPublica;

    @AtributoCommand
    @Column(nullable = false)
    protected String descricaoPrivada;

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
