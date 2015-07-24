package br.unicesumar.escoladeti2015time04.atendimento.preventivo;

import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivoService;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.usuario.UsuarioService;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.service.ColunaLocalizavel;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AtendimentoPreventivoService extends Service<AtendimentoPreventivo, AtendimentoPreventivoRepository, AtendimentoPreventivoCommandEditar> {

    @Autowired
    private AtendimentoMotivoService motivoService;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    protected void init() {
        this.colunasListaveisEntidade.putAll(getMapFieldAnotacao(ColunaListavel.class));
        this.colunasListaveisEntidade.putAll(getMapFieldAnotacao(ColunaListavel.class, getClassEntity().getSuperclass()));
        this.colunasLocalizaveisEntidade.putAll(getMapFieldAnotacao(ColunaLocalizavel.class));
        this.colunasLocalizaveisEntidade.putAll(getMapFieldAnotacao(ColunaLocalizavel.class, getClassEntity().getSuperclass()));
        this.idEntidade = getIdEntidade(getClassEntity().getSuperclass());
        this.select = montarSelectListar();
        this.from = montarFromListar();
        this.selectNumeroRegistros = montarSelectNumeroTotalRegistros(getClassEntity().getSuperclass());
    }

    @Override
    protected String montarFromListar() {
        String fromDoSelect;

        fromDoSelect = super.montarFromListar();

        fromDoSelect += " inner join atendimento a on a.id = atendimentoPreventivo.id";
        fromDoSelect += " inner join atendimentoMotivo m on m.id = atendimentoPreventivo.motivo";

        return fromDoSelect + "  ";
    }

    @Override
    protected Class<AtendimentoPreventivo> getClassEntity() {
        return AtendimentoPreventivo.class;
    }

    void criar(AtendimentoPreventivoCommandInserir commandInserir) {
        final AtendimentoMotivo motivo = motivoService.localizarObjeto(commandInserir.getIdMotivo());

        final Usuario usuario = usuarioService.localizarObjeto(new Long(1));

        AtendimentoPreventivo atendimentoPreventivo = new AtendimentoPreventivo(
                commandInserir.getNumeroReprovacoes(),
                motivo,
                commandInserir.getMeioContato(),
                commandInserir.getEncaminhamento(),
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
                commandInserir.getDescricaoPrivada());

        super.criar(atendimentoPreventivo);
    }

    @Override
    public void editar(AtendimentoPreventivoCommandEditar command) {
        repository.getOne(command.getId());
        final AtendimentoMotivo motivo = motivoService.localizarObjeto(command.getIdMotivo());

        AtendimentoPreventivo atendimentoPreventivo = repository.getOne(command.getId());
        atendimentoPreventivo.setData(command.getData());
        atendimentoPreventivo.setCentro(command.getCentro());
        atendimentoPreventivo.setNomeAluno(command.getNomeAluno());
        atendimentoPreventivo.setCurso(command.getCurso());
        atendimentoPreventivo.setSerieSemestre(command.getSerieSemestre());
        atendimentoPreventivo.setTurno(command.getTurno());
        atendimentoPreventivo.setMatriculado(command.getMatriculado());
        atendimentoPreventivo.setBolsaFinanciamento(command.getBolsaFinanciamento());
        atendimentoPreventivo.setDescricaoPublica(command.getDescricaoPublica());
        atendimentoPreventivo.setDescricaoPrivada(command.getDescricaoPrivada());
        atendimentoPreventivo.setNumeroReprovacoes(command.getNumeroReprovacoes());
        atendimentoPreventivo.setMeioContato(command.getMeioContato());
        atendimentoPreventivo.setEncaminhamento(command.getEncaminhamento());
        atendimentoPreventivo.setMotivo(motivo);

        repository.save(atendimentoPreventivo);

    }

}
