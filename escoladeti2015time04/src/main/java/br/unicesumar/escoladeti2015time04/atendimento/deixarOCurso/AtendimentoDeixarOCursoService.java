package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivoService;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivoService;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.usuario.UsuarioService;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
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
        this.select = montarSelectListar();
        this.from = montarFromListar();
        this.selectNumeroRegistros = montarSelectNumeroTotalRegistros(getClassEntity().getSuperclass());
    }

    @Override
    protected String montarFromListar() {
        String fromDoSelect;

        fromDoSelect = super.montarFromListar();

        fromDoSelect += " inner join atendimento a on a.id = atendimentoDeixarOCurso.id";
        fromDoSelect += " inner join deixarocursomotivo m on m.id = atendimentoDeixarOCurso.motivo";
        fromDoSelect += " inner join deixarocursoObjetivo o on o.id = atendimentoDeixarOCurso.objetivo";

        return fromDoSelect + "  ";
    }

    @Override
    protected Class<AtendimentoDeixarOCurso> getClassEntity() {
        return AtendimentoDeixarOCurso.class;
    }

    public void criar(AtendimentoDeixarOCursoCommandInserir commandInserir) {
        final DeixarOCursoMotivo motivo = deixarOCursoMotivoService.localizarObjeto(commandInserir.getIdMotivo());
        final DeixarOCursoObjetivo objetivo = deixarOCursoObjetivoService.localizarObjeto(commandInserir.getIdObjetivo());
        final Usuario usuario = usuarioService.localizarObjeto(new Long(1));

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

    @Override
    public void editar(AtendimentoDeixarOCursoCommandEditar command) {
        repository.getOne(command.getId());
        final DeixarOCursoMotivo motivo = deixarOCursoMotivoService.localizarObjeto(command.getIdMotivo());
        final DeixarOCursoObjetivo objetivo = deixarOCursoObjetivoService.localizarObjeto(command.getIdObjetivo());

        AtendimentoDeixarOCurso atendimentoDeixarOCurso = repository.getOne(command.getId());
        atendimentoDeixarOCurso.setData(command.getData());
        atendimentoDeixarOCurso.setCentro(command.getCentro());
        atendimentoDeixarOCurso.setNomeAluno(command.getNomeAluno());
        atendimentoDeixarOCurso.setCurso(command.getCurso());
        atendimentoDeixarOCurso.setSerieSemestre(command.getSerieSemestre());
        atendimentoDeixarOCurso.setTurno(command.getTurno());
        atendimentoDeixarOCurso.setMatriculado(command.getMatriculado());
        atendimentoDeixarOCurso.setTransferencia(command.getTransferencia());
        atendimentoDeixarOCurso.setBolsaFinanciamento(command.getBolsaFinanciamento());
        atendimentoDeixarOCurso.setDescricaoPublica(command.getDescricaoPublica());
        atendimentoDeixarOCurso.setDescricaoPrivada(command.getDescricaoPrivada());
        atendimentoDeixarOCurso.setProtocolo(command.getProtocolo());
        atendimentoDeixarOCurso.setCoordenadorDiretor(command.getCoordenadorDiretor());
        atendimentoDeixarOCurso.setNumeroReprovacoes(command.getNumeroReprovacoes());
        atendimentoDeixarOCurso.setMotivo(motivo);
        atendimentoDeixarOCurso.setObjetivo(objetivo);

        repository.save(atendimentoDeixarOCurso);

    }
    
    public List<String> recuperarCoordenadores(){
        String queryRecuperarCoordenadores = "select distinct coordenadorDiretor" + super.from;
        MapSqlParameterSource mapSqlParameterSource = new MapSqlParameterSource();
        return jdbcTemplate.queryForList(queryRecuperarCoordenadores, mapSqlParameterSource, String.class);
    }
}
