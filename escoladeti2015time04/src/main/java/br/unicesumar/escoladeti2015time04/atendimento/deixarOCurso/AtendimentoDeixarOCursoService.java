package br.unicesumar.escoladeti2015time04.atendimento.deixarOCurso;

import br.unicesumar.escoladeti2015time04.utils.service.Service;
import javax.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
@Transactional
public class AtendimentoDeixarOCursoService extends Service<AtendimentoDeixarOCurso, AtendimentoDeixarOCursoRepository, AtendimentoDeixarOCursoCommandEditar> {

    @Override
    protected void init() {
        this.colunasListaveisEntidade.putAll(getMapFieldColunaListavel());
        this.colunasListaveisEntidade.putAll(getMapFieldColunaListavel(getClassEntity().getSuperclass()));
        this.idEntidade = getIdEntidade(getClassEntity().getSuperclass());
        this.select = montarSelectListar();
        this.selectNumeroRegistros = montarSelectNumeroTotalRegistros(getClassEntity().getSuperclass());
    }

    @Override
    protected String montarSelectListar() {
        String select;

        select = super.montarSelectListar();
        select += "inner join atendimento a on a.id = atendimentoDeixarOCurso.id";

        return select;
    }

    @Override
    protected Class<AtendimentoDeixarOCurso> getClassEntity() {
        return AtendimentoDeixarOCurso.class;
    }

}
