package br.unicesumar.escoladeti2015time04.utils;

import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivoService;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivoService;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoDoMotivo;
import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcesso;
import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcessoService;
import br.unicesumar.escoladeti2015time04.usuario.Senha;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.usuario.UsuarioService;
import java.util.HashSet;
import java.util.Set;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Initializer {

    @Autowired
    private ItemAcessoService itemAcessoService;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private AtendimentoMotivoService atendimentoMotivoService;
    @Autowired
    private DeixarOCursoObjetivoService deixarOCursoObjetivoService;

    @PostConstruct
    public void initialize() {
        inicializarItensAcesso();
        inicializarAdministrador();
        inicializarAtendimentoMotivo();
        inicializarAtendimentoDeixarOCursoObjetivo();
    }

    private void inicializarItensAcesso() {
        if (!itemAcessoService.existemItensAcesso()) {
            final ItemAcesso iaMenu = new ItemAcesso("Menu", "/");
            iaMenu.setSuperior(iaMenu);

            itemAcessoService.add(iaMenu);
            itemAcessoService.add(new ItemAcesso("Usuario", "/Usuario/list", iaMenu));
            itemAcessoService.add(new ItemAcesso("Perfil Usuario", "/formUsuario.html", iaMenu));
        }
    }

    private void inicializarAdministrador() {
        final Senha senha = new Senha("Adm123@");
        final Email email = new Email("administrador@naac.com");
        final Usuario usuario = new Usuario("Administrador", "admin", senha, email);

        usuarioService.criar(usuario);
    }

    private void inicializarAtendimentoMotivo() {
        Set<AtendimentoDoMotivo> atendimentosDoMotivoDeixarOCurso = new HashSet<>();
        Set<AtendimentoDoMotivo> atendimentosDoMotivoPreventivo = new HashSet<>();
        Set<AtendimentoDoMotivo> atendimentosDoMotivoDeixarOCursoEPreventivo = new HashSet<>();

        atendimentosDoMotivoDeixarOCurso.add(AtendimentoDoMotivo.ATENDIMENTODEIXAROCURSO);
        atendimentosDoMotivoPreventivo.add(AtendimentoDoMotivo.ATENDIMENTOPREVENTIVO);

        atendimentosDoMotivoDeixarOCursoEPreventivo.add(AtendimentoDoMotivo.ATENDIMENTODEIXAROCURSO);
        atendimentosDoMotivoDeixarOCursoEPreventivo.add(AtendimentoDoMotivo.ATENDIMENTOPREVENTIVO);

        atendimentoMotivoService.criar(new AtendimentoMotivo("Aprendizagem", atendimentosDoMotivoDeixarOCursoEPreventivo));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Gravidez", atendimentosDoMotivoDeixarOCursoEPreventivo));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Notas baixas", atendimentosDoMotivoDeixarOCursoEPreventivo));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Outros", atendimentosDoMotivoDeixarOCursoEPreventivo));
        
        atendimentoMotivoService.criar(new AtendimentoMotivo("Distância", atendimentosDoMotivoDeixarOCurso));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Doença", atendimentosDoMotivoDeixarOCurso));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Financeiro", atendimentosDoMotivoDeixarOCurso));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Mudança de Cidade", atendimentosDoMotivoDeixarOCurso));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Não Identificação com o Curso", atendimentosDoMotivoDeixarOCurso));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Trabalho", atendimentosDoMotivoDeixarOCurso));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Transferência para outra IES", atendimentosDoMotivoDeixarOCurso));

        atendimentoMotivoService.criar(new AtendimentoMotivo("Crise de Ansiedade", atendimentosDoMotivoPreventivo));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Crise de Pânico", atendimentosDoMotivoPreventivo));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Depressão", atendimentosDoMotivoPreventivo));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Dúvida quanto à transferência", atendimentosDoMotivoPreventivo));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Dúvida quanto ao UNIFIES", atendimentosDoMotivoPreventivo));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Frequência baixa", atendimentosDoMotivoPreventivo));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Pessoal", atendimentosDoMotivoPreventivo));
    }

    private void inicializarAtendimentoDeixarOCursoObjetivo() {
        deixarOCursoObjetivoService.criar(new DeixarOCursoObjetivo("Trancamento"));
        deixarOCursoObjetivoService.criar(new DeixarOCursoObjetivo("Transferência"));
        deixarOCursoObjetivoService.criar(new DeixarOCursoObjetivo("Transferência EAD"));
        deixarOCursoObjetivoService.criar(new DeixarOCursoObjetivo("Cancelamento"));
        deixarOCursoObjetivoService.criar(new DeixarOCursoObjetivo("Permanência"));

    }
}
