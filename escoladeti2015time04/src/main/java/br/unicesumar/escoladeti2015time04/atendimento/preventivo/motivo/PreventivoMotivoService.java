package br.unicesumar.escoladeti2015time04.atendimento.preventivo.motivo;

import br.unicesumar.escoladeti2015time04.utils.service.Service;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class PreventivoMotivoService extends Service<PreventivoMotivo, PreventivoMotivoRepository, PreventivoMotivoCommandEditar> {

    public void inativar(Long id, PreventivoMotivoStatus status) {
        PreventivoMotivo motivo = repository.getOne(id);
        motivo.setStatus(status);
        repository.save(motivo);
    }

    @Override
    public void criar(PreventivoMotivo motivo) {
        motivo.setStatus(PreventivoMotivoStatus.ATIVO);
        super.criar(motivo);
    }

    @Override
    protected Class<PreventivoMotivo> getClassEntity() {
        return PreventivoMotivo.class;
    }
}
