package br.unicesumar.escoladeti2015time04.atendimento.preventivo;

import br.unicesumar.escoladeti2015time04.atendimento.AtendimentoCommandEditar;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public class AtendimentoPreventivoCommandEditar extends AtendimentoCommandEditar{
    @AtributoCommand
    @Column(nullable = false)
    private int numeroReprovacoes;
    
    @AtributoCommand
    @Column(nullable = false)
    private Long idMotivo;
    
    @AtributoCommand
    @Column(nullable = false)
    private String meioContato;
    
    @AtributoCommand
    @Column(nullable = false)
    private String encaminhamento;
    
    
}
