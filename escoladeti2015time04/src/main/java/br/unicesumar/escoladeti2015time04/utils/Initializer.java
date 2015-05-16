package br.unicesumar.escoladeti2015time04.utils;

import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivo;
import br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo.DeixarOCursoMotivoService;
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
    private DeixarOCursoMotivoService deixarOCursoMotivoService;

    @PostConstruct
    public void initialize() {
        inicializarItensAcesso();
        inicializarAdministrador();
        inicializarAtendimentoDeixarOCursoMotivo();
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

    private void inicializarAtendimentoDeixarOCursoMotivo() {
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Aprendizagem"));
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Distância"));
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Doença"));
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Financeiro"));
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Gravidez"));
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Mudança de Cidade"));
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Não Identificação com o Curso"));
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Notas baixas"));
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Trabalho"));
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Transferência para outra IES"));
        deixarOCursoMotivoService.criar(new DeixarOCursoMotivo("Outros"));
    }

}
