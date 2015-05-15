package br.unicesumar.escoladeti2015time04.deixarOCurso.motivo;

import br.unicesumar.escoladeti2015time04.usuario.Status;
import br.unicesumar.escoladeti2015time04.utils.service.Service;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class MotivoService extends Service<Motivo, MotivoRepository, MotivoCommandEditar> {

    public void inativar(Long id, Status status) {
        Motivo motivo = repository.getOne(id);
        motivo.setStatus(status);
        repository.save(motivo);
    }

    @Override
    public void criar(Motivo motivo) {
        motivo.setStatus(Status.ATIVO);
        super.criar(motivo);
    }

    @Override
    protected Class<Motivo> getClassEntity() {
        return Motivo.class;
    }

}
