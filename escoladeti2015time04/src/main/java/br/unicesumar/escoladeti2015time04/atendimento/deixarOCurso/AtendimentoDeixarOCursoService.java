package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivoService;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivoService;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.usuario.UsuarioService;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AtendimentoDeixarOCursoService extends Service<AtendimentoDeixarOCurso, AtendimentoDeixarOCursoRepository, AtendimentoDeixarOCursoCommandEditar> {

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
        this.selectComColunasListaveis = montarSelectListar();
        this.selectNumeroRegistros = montarSelectNumeroTotalRegistros(getClassEntity().getSuperclass());
    }

    @Override
    protected String montarSelectListar() {
        String select;

        select = super.montarSelectListar();
        select += "inner join atendimento a on a.id = atendimentoDeixarOCurso.id";

        return select;
    }

    @Override
    protected Class<AtendimentoDeixarOCurso> getClassEntity() {
        return AtendimentoDeixarOCurso.class;
    }

    public void criar(AtendimentoDeixarOCursoCommandInserir commandInserir) {
        final DeixarOCursoMotivo motivo = deixarOCursoMotivoService.localizarObjeto(commandInserir.getIdMotivo());
        final DeixarOCursoObjetivo objetivo = deixarOCursoObjetivoService.localizarObjeto(commandInserir.getIdObjetivo());
        final Usuario usuario = usuarioService.localizarObjeto(Long.MIN_VALUE + 1);

        AtendimentoDeixarOCurso atendimentoDeixarOCurso = new AtendimentoDeixarOCurso(
                commandInserir.getProtocolo(),
                commandInserir.getCoordenadorDiretor(),
                commandInserir.getTransferencia(),
                commandInserir.getNumeroReprovacoes(), motivo, objetivo,
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

        super.criar(atendimentoDeixarOCurso);
    }

}
