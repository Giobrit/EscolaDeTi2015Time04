package br.unicesumar.escoladeti2015time04.atendimento.especial;

import br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao.EspecialSolicitacao;
import br.unicesumar.escoladeti2015time04.atendimento.especial.solicitacao.EspecialSolicitacaoService;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivoService;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.usuario.UsuarioService;
import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.service.ColunaLocalizavel;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AtendimentoEspecialService extends Service<AtendimentoEspecial, AtendimentoEspecialRepository, AtendimentoEspecialCommandEditar> {

    @Autowired
    private AtendimentoMotivoService deixarOCursoMotivoService;

    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private EspecialSolicitacaoService especialSolicitacaoService;

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
    protected String montarSelectListar() {
         String selectComId = "SELECT DISTINCT ";

        selectComId += getClassEntity().getSimpleName() + "." + idEntidade.getName();

        return selectComId + "  ";
    }

    @Override
    public Map<String, Object> localizar(Long id) {
        
        Map<String, Object> atendimentoEspecial = super.localizar(id); 
        
        atendimentoEspecial.put("solicitacoes", localizarSolicitacoesDoAtendimento(id));
        
        return atendimentoEspecial;
    }
    
    private List<Map<String, Object>> localizarSolicitacoesDoAtendimento(Long idAtendimento) {
        String query = "SELECT "
                + " es.* "
                + " from especialsolicitacao es "
                + " inner join atendimentoespecial_especialsolicitacao aees on aees.idespecialsolicitacao = es.id "
                + " where aees.idatendimentoespecial = :idatendimentoespecial";
        
        MapSqlParameterSource parametros = new MapSqlParameterSource();
        parametros.addValue("idatendimentoespecial", idAtendimento);
        
        return jdbcTemplate.query(query, parametros, new MapRowMapper());
        
    }
    
    @Override
    protected String montarFromListar() {
        String fromDoSelect;

        fromDoSelect = super.montarFromListar();

        fromDoSelect += " inner join atendimento a on a.id = atendimentoEspecial.id";
        fromDoSelect += " inner join atendimentomotivo m on m.id = a.motivo";
        fromDoSelect += " inner join atendimentoespecial_especialsolicitacao attsoli on attsoli.idatendimentoespecial = atendimentoEspecial.id";
        fromDoSelect += " inner join especialsolicitacao s on s.id = attsoli.idespecialsolicitacao";
        

        return fromDoSelect + "  ";
    }

    @Override
    protected Class<AtendimentoEspecial> getClassEntity() {
        return AtendimentoEspecial.class;
    }

    public void criar(AtendimentoEspecialCommandInserir commandInserir) {
        final AtendimentoMotivo motivo = deixarOCursoMotivoService.localizarObjeto(commandInserir.getIdMotivo());
        final List<EspecialSolicitacao> solicitacoes = especialSolicitacaoService.localizarObjetos(commandInserir.getSolicitacoes());
        final Usuario usuario = usuarioService.localizarObjeto(commandInserir.getUsuario());

        AtendimentoEspecial atendimentoEspecial = new AtendimentoEspecial(
                commandInserir.getProtocolo(),
                commandInserir.getCoordenadorDiretor(),
                commandInserir.isLaudoMedico(),
                motivo,
                commandInserir.getEncaminhadoPara(),
                new HashSet<>(solicitacoes),
                commandInserir.getData(), 
                usuario,
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
        final List<EspecialSolicitacao> solicitacoes = especialSolicitacaoService.localizarObjetos(command.getSolicitacoes());


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
        atendimentoEspecial.setSolicitacoes(new HashSet<>(solicitacoes));

        repository.save(atendimentoEspecial);

    }
}
