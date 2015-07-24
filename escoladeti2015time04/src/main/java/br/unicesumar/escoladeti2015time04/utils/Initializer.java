package br.unicesumar.escoladeti2015time04.utils;

import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivoService;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivoService;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoDoMotivo;
import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcesso;
import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcessoService;
import br.unicesumar.escoladeti2015time04.perfilUsuario.ItemAvulso;
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
            final ItemAcesso iaMenu = new ItemAcesso("Menu", "/");
            iaMenu.setSuperior(iaMenu);

            itemAcessoService.add(iaMenu);
            final ItemAcesso iaUsuario = new ItemAcesso("Usuário", iaMenu);
            //Rotas Usuario
            itemAcessoService.add(iaUsuario);
            itemAcessoService.add(new ItemAcesso("Cadastrar Usuário", "/Usuario/form", iaUsuario));
            itemAcessoService.add(new ItemAcesso("Editar Usuário", "/Usuario/form/:id", iaUsuario));
            itemAcessoService.add(new ItemAcesso("Listar Usuário", "/Usuario/list", iaUsuario));
            itemAcessoService.add(new ItemAcesso("Alterar Senha Outros Usuários", "/Usuario/form/alterarSenha/:id", iaUsuario));

            itemAcessoService.add(new ItemAcesso("Perfil Usuario", "/formUsuario.html", iaMenu));

//        //Rotas Login
//        adicionarRota($routeProvider, '/Login', 'view/login/login.html', 'controllerTelaLogin');
//        adicionarRota($routeProvider, '/', 'view/Home.html');
//        //Rotas PerfilAcesso
//        adicionarRota($routeProvider, '/PerfilAcesso/form', 'view/perfilAcesso/formPerfilAcesso.html', 'controllerFormPerfilAcesso');
//        adicionarRota($routeProvider, '/PerfilAcesso/list', 'view/perfilAcesso/listPerfilAcesso.html', 'controllerListPerfilAcesso');
//        adicionarRota($routeProvider, '/PerfilAcesso/edit/:id', 'view/PerfilAcesso.html', 'PerfilAcessoFormController');
//        //Rotas PerfilUsuario
//        adicionarRota($routeProvider, '/PerfilUsuario/form', 'view/perfilAcesso/formPerfilUsuario.html', 'controllerFormPerfilUsuario');
//        //Rotas Atendimento Deixar O Curso
//        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/form', 'view/atendimentoDeixarOCurso/formAtendimentoDeixarOCurso.html', 'controllerFormAtendimentoDeixarOCurso');
//        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/form/:id', 'view/atendimentoDeixarOCurso/formAtendimentoDeixarOCurso.html', 'controllerFormAtendimentoDeixarOCurso');
//        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/list', 'view/atendimentoDeixarOCurso/ListAtendimentoDeixarOCurso.html', 'controllerListAtendimentoDeixarOCurso');
//        //Rotas Atendimento Deixar O Curso Objetivo
//        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/Objetivo/form', 'view/atendimentoDeixarOCurso/objetivo/cadastroObjetivo.html', 'controllerFormObjetivoDeixarOCurso');
//        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/Objetivo/form/:id', 'view/atendimentoDeixarOCurso/objetivo/cadastroObjetivo.html', 'controllerFormObjetivoDeixarOCurso');
//        adicionarRota($routeProvider, '/AtendimentoDeixarOCurso/Objetivo/list', 'view/atendimentoDeixarOCurso/objetivo/listagemObjetivo.html', 'controllerListObjetivoDeixarOCurso');
//        //Rotas Atendimento Preventivo
//        adicionarRota($routeProvider, '/AtendimentoPreventivo/form', 'view/atendimentoPreventivo/cadastroAtendimentoPreventivo.html', 'controllerFormAtendimentoPreventivo');
//        adicionarRota($routeProvider, '/AtendimentoPreventivo/form/:id', 'view/atendimentoPreventivo/cadastroAtendimentoPreventivo.html', 'controllerFormAtendimentoPreventivo');
//        adicionarRota($routeProvider, '/AtendimentoPreventivo/list', 'view/atendimentoPreventivo/listagemAtendimentoPreventivo.html', 'controllerListAtendimentoPreventivo');
//        //Rotas Atendimento Motivo
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
        final Set<ItemAvulso> itensAvulsos = null;
        final Usuario usuario = new Usuario("Administrador", "admin", senha, email, perfisDeAcesso, itensAvulsos);

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
