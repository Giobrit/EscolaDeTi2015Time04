package br.unicesumar.escoladeti2015time04.atendimento.preventivo;

import br.unicesumar.escoladeti2015time04.atendimento.preventivo.motivo.PreventivoMotivoService;
import br.unicesumar.escoladeti2015time04.usuario.UsuarioService;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AtendimentoPreventivoService extends Service<AtendimentoPreventivo, AtendimentoPreventivoRepository, AtendimentoPreventivoCommandEditar> {

    @Autowired
    private PreventivoMotivoService deixarOCursoMotivoService;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    protected Class<AtendimentoPreventivo> getClassEntity() {
        return AtendimentoPreventivo.class;
    }

}
