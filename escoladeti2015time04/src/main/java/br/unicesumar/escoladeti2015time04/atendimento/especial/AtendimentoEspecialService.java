package br.unicesumar.escoladeti2015time04.atendimento.especial;

import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivoService;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivoService;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.usuario.UsuarioService;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AtendimentoEspecialService extends Service<AtendimentoEspecial, AtendimentoEspecialCursoRepository, AtendimentoEspecialCommandEditar> {

    @Autowired
    private DeixarOCursoMotivoService deixarOCursoMotivoService;

    @Autowired
    private DeixarOCursoObjetivoService deixarOCursoObjetivoService;

    // TODO: Ao completar login isto deve sair daqui
    @Autowired
    private UsuarioService usuarioService;

    @Override
    protected void init() {
        this.colunasListaveisEntidade.putAll(getMapFieldColunaListavel());
        this.colunasListaveisEntidade.putAll(getMapFieldColunaListavel(getClassEntity().getSuperclass()));
        this.idEntidade = getIdEntidade(getClassEntity().getSuperclass());
        this.select = montarSelectListar();
        this.from = montarFromListar();
        this.selectNumeroRegistros = montarSelectNumeroTotalRegistros(getClassEntity().getSuperclass());
    }

    @Override
    protected String montarFromListar() {
        String fromDoSelect;

        fromDoSelect = super.montarFromListar();

        fromDoSelect += " inner join atendimento a on a.id = atendimentoEspecial.id";
        fromDoSelect += " inner join deixarocursomotivo m on m.id = atendimentoEspecial.motivo";        

        return fromDoSelect + "  ";
    }

    @Override
    protected Class<AtendimentoEspecial> getClassEntity() {
        return AtendimentoEspecial.class;
    }

    public void criar(AtendimentoEspecialCommandInserir commandInserir) {
        final DeixarOCursoMotivo motivo = deixarOCursoMotivoService.localizarObjeto(commandInserir.getIdMotivo());        
        final Usuario usuario = usuarioService.localizarObjeto(new Long(1));

        AtendimentoEspecial atendimentoEspecial = new AtendimentoEspecial(
                commandInserir.getProtocolo(),
                commandInserir.getCoordenadorDiretor(),
                commandInserir.isLaudoMedico(), motivo,
                commandInserir.getEncaminhamento(),
                commandInserir.getSolicitacao(), 
                commandInserir.getData(), usuario, 
                commandInserir.getRa(), 
                commandInserir.getCentro(), 
                commandInserir.getNomeAluno(), 
                commandInserir.getCurso(), 
                commandInserir.getSerieSemestre(), 
                commandInserir.getTurno(),
                commandInserir.getMatriculado(),
                commandInserir.getBolsaFinanciamento(), 
                commandInserir.getDescricaoPublica(), 
                commandInserir.getDescricaoPrivada()                
        );

        super.criar(atendimentoEspecial);
    }

    @Override
    public void editar(AtendimentoEspecialCommandEditar command) {
        repository.getOne(command.getId());
        final DeixarOCursoMotivo motivo = deixarOCursoMotivoService.localizarObjeto(command.getIdMotivo());        

        AtendimentoEspecial atendimentoEspecial = repository.getOne(command.getId());
        atendimentoEspecial.setData(command.getData());
        atendimentoEspecial.setCentro(command.getCentro());
        atendimentoEspecial.setNomeAluno(command.getNomeAluno());
        atendimentoEspecial.setCurso(command.getCurso());
        atendimentoEspecial.setSerieSemestre(command.getSerieSemestre());
        atendimentoEspecial.setTurno(command.getTurno());
        atendimentoEspecial.setMatriculado(command.getMatriculado());
        atendimentoEspecial.setBolsaFinanciamento(command.getBolsaFinanciamento());
        atendimentoEspecial.setDescricaoPublica(command.getDescricaoPublica());
        atendimentoEspecial.setDescricaoPrivada(command.getDescricaoPrivada());
        atendimentoEspecial.setProtocolo(command.getProtocolo());
        atendimentoEspecial.setCoordenadorDiretor(command.getCoordenadorDiretor());        
        atendimentoEspecial.setMotivo(motivo);
        atendimentoEspecial.setLaudoMedico(command.isLaudoMedico());
        atendimentoEspecial.setEncaminhamento(command.getEncaminhamento());
        atendimentoEspecial.setSolicitacao(command.getSolicitacao());
        
        repository.save(atendimentoEspecial);

    }
}
