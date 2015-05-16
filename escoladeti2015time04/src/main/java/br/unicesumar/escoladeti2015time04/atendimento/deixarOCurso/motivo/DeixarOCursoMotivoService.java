package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso.motivo;

import br.unicesumar.escoladeti2015time04.utils.service.Service;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class DeixarOCursoMotivoService extends Service<DeixarOCursoMotivo, DeixarOCursoMotivoRepository, DeixarOCursoMotivoCommandEditar> {

    public void inativar(Long id, DeixarOCursoMotivoStatus status) {
        DeixarOCursoMotivo motivo = repository.getOne(id);
        motivo.setStatus(status);
        repository.save(motivo);
    }

    @Override
    public void criar(DeixarOCursoMotivo motivo) {
        motivo.setStatus(DeixarOCursoMotivoStatus.ATIVO);
        super.criar(motivo);
    }

    @Override
    protected Class<DeixarOCursoMotivo> getClassEntity() {
        return DeixarOCursoMotivo.class;
    }

}
