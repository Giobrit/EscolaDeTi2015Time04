package br.unicesumar.escoladeti2015time04.utils;

import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.motivo.AtendimentoMotivoService;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.objetivo.DeixarOCursoObjetivoService;
import br.unicesumar.escoladeti2015time04.atendimento.preventivo.motivo.PreventivoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.preventivo.motivo.PreventivoMotivoService;
import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcesso;
import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcessoService;
import br.unicesumar.escoladeti2015time04.usuario.Senha;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import br.unicesumar.escoladeti2015time04.usuario.UsuarioService;
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
        atendimentoMotivoService.criar(new AtendimentoMotivo("Aprendizagem"));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Distância"));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Doença"));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Financeiro"));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Gravidez"));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Mudança de Cidade"));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Não Identificação com o Curso"));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Notas baixas"));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Trabalho"));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Transferência para outra IES"));
        atendimentoMotivoService.criar(new AtendimentoMotivo("Outros"));
        
//        preventivoMotivoService.criar(new PreventivoMotivo("Aprendizagem"));
//        preventivoMotivoService.criar(new PreventivoMotivo("Crise de Ansiedade"));
//        preventivoMotivoService.criar(new PreventivoMotivo("Crise de Pânico"));
//        preventivoMotivoService.criar(new PreventivoMotivo("Depressão"));
//        preventivoMotivoService.criar(new PreventivoMotivo("Dúvida quanto à transferência"));
//        preventivoMotivoService.criar(new PreventivoMotivo("Dúvida quanto ao UNIFIES"));
//        preventivoMotivoService.criar(new PreventivoMotivo("Frequência baixa"));
//        preventivoMotivoService.criar(new PreventivoMotivo("Gravidez"));
//        preventivoMotivoService.criar(new PreventivoMotivo("Notas baixas"));
//        preventivoMotivoService.criar(new PreventivoMotivo("Outros"));
//        preventivoMotivoService.criar(new PreventivoMotivo("Pessoal"));
    }

    private void inicializarAtendimentoDeixarOCursoObjetivo() {
        deixarOCursoObjetivoService.criar(new DeixarOCursoObjetivo("Trancamento"));
        deixarOCursoObjetivoService.criar(new DeixarOCursoObjetivo("Transferência"));
        deixarOCursoObjetivoService.criar(new DeixarOCursoObjetivo("Transferência EAD"));
        deixarOCursoObjetivoService.criar(new DeixarOCursoObjetivo("Cancelamento"));
        deixarOCursoObjetivoService.criar(new DeixarOCursoObjetivo("Permanência"));

    }
}
