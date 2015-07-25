package br.unicesumar.escoladeti2015time04.utils;

import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivoService;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivoService;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoDoMotivo;
import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcesso;
import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcessoService;
import br.unicesumar.escoladeti2015time04.perfilUsuario.ItemAvulso;
import br.unicesumar.escoladeti2015time04.perfilUsuario.TipoItemAvulso;
import br.unicesumar.escoladeti2015time04.perfilacesso.PerfilAcesso;
import br.unicesumar.escoladeti2015time04.perfilacesso.PerfilAcessoService;
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
    private PerfilAcessoService perfilAcessoService;
    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private AtendimentoMotivoService atendimentoMotivoService;
    @Autowired
    private DeixarOCursoObjetivoService deixarOCursoObjetivoService;
    private ItemAcesso iaMenu;

    @PostConstruct
    public void initialize() {
        inicializarItensAcesso();
        inicializarPerfilAcessoAdministrador();
        inicializarAdministrador();
        inicializarAtendimentoMotivo();
        inicializarAtendimentoDeixarOCursoObjetivo();
    }

    private void inicializarItensAcesso() {
        if (!itemAcessoService.existemItensAcesso()) {
            iaMenu = new ItemAcesso("Menu", "/");
            iaMenu.setSuperior(iaMenu);

            itemAcessoService.add(iaMenu);

            //Rotas Usuario
            final ItemAcesso iaUsuario = new ItemAcesso("Usuário", iaMenu, true);
            itemAcessoService.add(iaUsuario);
            itemAcessoService.add(new ItemAcesso("Cadastrar Usuário", "/Usuario/form", iaUsuario));
            itemAcessoService.add(new ItemAcesso(false, "Editar Usuário", "/Usuario/form/:id", iaUsuario));
            itemAcessoService.add(new ItemAcesso("Listar Usuário", "/Usuario/list", iaUsuario));
            itemAcessoService.add(new ItemAcesso(false, "Alterar Senha Outros Usuários", "/Usuario/form/alterarSenha/:id", iaUsuario));
            //Rotas PerfilUsuario
            itemAcessoService.add(new ItemAcesso(false, "Alterar Perfil Usuario", "/PerfilUsuario/form/:id", iaUsuario));
            //Rotas PerfilAcesso
            final ItemAcesso iaPerfilAcesso = new ItemAcesso("Perfil de Acesso", iaMenu, true);
            itemAcessoService.add(iaPerfilAcesso);
            itemAcessoService.add(new ItemAcesso("Cadastrar Perfil", "/PerfilAcesso/form", iaPerfilAcesso));
            itemAcessoService.add(new ItemAcesso(false, "Editar Perfil", "/PerfilAcesso/form:id", iaPerfilAcesso));
            itemAcessoService.add(new ItemAcesso("Listar Perfil", "/PerfilAcesso/list", iaPerfilAcesso));
            //Rotas Atendimento Deixar O Curso
            final ItemAcesso iaAtendimentoDeixarOCurso = new ItemAcesso("Atendimento", iaMenu, true);
            itemAcessoService.add(iaAtendimentoDeixarOCurso);
            itemAcessoService.add(new ItemAcesso("Cadastrar Atendimento", "/AtendimentoDeixarOCurso/form", iaAtendimentoDeixarOCurso));
            itemAcessoService.add(new ItemAcesso(false, "Editar Atendimento", "/AtendimentoDeixarOCurso/form:id", iaAtendimentoDeixarOCurso));
            itemAcessoService.add(new ItemAcesso("Listar Atendimento", "/AtendimentoDeixarOCurso/list", iaAtendimentoDeixarOCurso));
            //Rotas Atendimento Deixar O Curso Objetivo
            itemAcessoService.add(new ItemAcesso(false, "Cadastrar Objetivo", "/AtendimentoDeixarOCurso/Objetivoform", iaAtendimentoDeixarOCurso));
            itemAcessoService.add(new ItemAcesso(false, "Editar Objetivo", "/AtendimentoDeixarOCurso/Objetivo/form:id", iaAtendimentoDeixarOCurso));
            itemAcessoService.add(new ItemAcesso("Listar Objetivo", "/AtendimentoDeixarOCurso/Objetivo/list", iaAtendimentoDeixarOCurso));
            //Rotas Atendimento Preventivo
            final ItemAcesso iaAtendimentoPreventivo = new ItemAcesso("Atendimento Preventivo", iaMenu, true);
            itemAcessoService.add(iaAtendimentoPreventivo);
            itemAcessoService.add(new ItemAcesso("Cadastrar Preventivo", "/AtendimentoPreventivo/form", iaAtendimentoPreventivo));
            itemAcessoService.add(new ItemAcesso(false, "Editar Preventivo", "/AtendimentoPreventivo/form:id", iaAtendimentoPreventivo));
            itemAcessoService.add(new ItemAcesso("Listar Preventivo", "/AtendimentoPreventivo/list", iaAtendimentoPreventivo));
            //Rotas Sistema
            final ItemAcesso iaSistema = new ItemAcesso("Sistema", iaMenu, true);
            itemAcessoService.add(iaSistema);
            //Rotas Atendimento Motivo
            itemAcessoService.add(new ItemAcesso(false, "Cadastrar Motivo", "/AtendimentoMotivo/form", iaSistema));
            itemAcessoService.add(new ItemAcesso(false, "Editar Motivo", "/AtendimentoMotivo/form:id", iaSistema));
            itemAcessoService.add(new ItemAcesso("Listar Motivo", "/AtendimentoMotivo/list", iaSistema));
//        adicionarRota($routeProvider, '/AtendimentoMotivo/form', 'view/atendimentoMotivo/cadastroMotivo.html', 'controllerFormMotivoAtendimento');
//        adicionarRota($routeProvider, '/AtendimentoMotivo/form/:id', 'view/atendimentoMotivo/cadastroMotivo.html', 'controllerFormMotivoAtendimento');
//        adicionarRota($routeProvider, '/AtendimentoMotivo/list', 'view/atendimentoMotivo/listagemMotivo.html', 'controllerListMotivoAtendimento');
        }
    }

    private void inicializarPerfilAcessoAdministrador() {
        perfilAcessoService.criar(new PerfilAcesso("Administrador", itemAcessoService.findAllSet()));
    }

    private void inicializarAdministrador() {
        final Senha senha = new Senha("Adm123@");
        final Email email = new Email("administrador@naac.com");
        final Set<PerfilAcesso> perfisDeAcesso = new HashSet<>(perfilAcessoService.listar());
        final Set<ItemAvulso> itensAvulsos = new HashSet<>();
        final Usuario usuario = new Usuario("Administrador", "admin", senha, email, perfisDeAcesso, itensAvulsos);
        itensAvulsos.add(new ItemAvulso(usuario, iaMenu, TipoItemAvulso.PERMISSAO));
//                public ItemAvulso(Usuario usuario, ItemAcesso itemAcesso, TipoItemAvulso tipoItemAvulso) {

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
