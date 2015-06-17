package br.unicesumar.escoladeti2015time04.atendimento.preventivo;

import br.unicesumar.escoladeti2015time04.atendimento.AtendimentoCommandInserir;
import br.unicesumar.escoladeti2015time04.utils.service.AtributoCommand;
import javax.persistence.Column;

class AtendimentoPreventivoCommandInserir extends AtendimentoCommandInserir{
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
