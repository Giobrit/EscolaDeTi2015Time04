package br.unicesumar.escoladeti2015time04.atendimento.especial;

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
public class AtendimentoEspecialService extends Service<AtendimentoEspecial, AtendimentoEspecialRepository, AtendimentoEspecialCommandEditar> {

    @Autowired
    private AtendimentoMotivoService deixarOCursoMotivoService;

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

        fromDoSelect += " inner join atendimento a on a.id = atendimentoEspecial.id";
        fromDoSelect += " inner join atendimentomotivo m on m.id = a.motivo";

        return fromDoSelect + "  ";
    }

    @Override
    protected Class<AtendimentoEspecial> getClassEntity() {
        return AtendimentoEspecial.class;
    }

    public void criar(AtendimentoEspecialCommandInserir commandInserir) {
        final AtendimentoMotivo motivo = deixarOCursoMotivoService.localizarObjeto(commandInserir.getIdMotivo());
        final Usuario usuario = usuarioService.localizarObjeto(commandInserir.getUsuario());

        AtendimentoEspecial atendimentoEspecial = new AtendimentoEspecial(
                commandInserir.getProtocolo(),
                commandInserir.getCoordenadorDiretor(),
                commandInserir.isLaudoMedico(), motivo,
                commandInserir.getEncaminhadoPara(),
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
        final AtendimentoMotivo motivo = deixarOCursoMotivoService.localizarObjeto(command.getIdMotivo());

        AtendimentoEspecial atendimentoEspecial = repository.getOne(command.getId());
        atendimentoEspecial.setData(command.getData());
        atendimentoEspecial.setRa(command.getRa());
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
        atendimentoEspecial.setEncaminhadoPara(command.getEncaminhadoPara());
        atendimentoEspecial.setSolicitacao(command.getSolicitacao());

        repository.save(atendimentoEspecial);

    }
}
