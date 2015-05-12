package br.unicesumar.escoladeti2015time04.utils.service;

import br.unicesumar.escoladeti2015time04.utils.listagem.Paginador;
import br.unicesumar.escoladeti2015time04.utils.listagem.Filtro;
import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import br.unicesumar.escoladeti2015time04.utils.ResultadoListagem;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

public abstract class Service<E, R extends JpaRepository, C> {

    @Autowired
    protected NamedParameterJdbcTemplate jdbcTemplate;

    protected R repositorio;

    @Autowired
    public void setRepository(R repositorio) {
        this.repositorio = repositorio;
    }

    protected Class<E> tipoEntidade;
    protected Field[] atributosEntidade;
    protected Field idEntidade;
    protected String selectComColunasListaveis;

    protected abstract void setClassEntity();

    @PostConstruct
    private void init() {
        setClassEntity();
        this.atributosEntidade = tipoEntidade.getDeclaredFields();
        this.idEntidade = getIdEntidade();
        this.selectComColunasListaveis  = montarSelect();
    }

    public void salvar(E entidade) {
        repositorio.save(entidade);
    }

    public void editar(C command) {
        if (!validarCommand(command)) {
            throw new IllegalArgumentException("O commando deve estar anotado com CommandEditar");
        }

        List<Field> fieldsId = getIdCommand(command);

        if (fieldsId.size() > 1) {
            throw new IllegalArgumentException("O comando só pode ter um unico id");
        }

//        usuario = repoUsuario.findOne(command.getId());
//        usuario.setNome(command.getNome());
//        usuario.setLogin(command.getLogin());
//        usuario.setEmail(command.getEmail());
//        usuario.setStatus(command.getStatus());
//        repoUsuario.save(usuario);
    }

    private List<Field> getIdCommand(C command) throws SecurityException {
        Class<? extends Object> commandClass = command.getClass();
        Field[] atributosCommand = commandClass.getDeclaredFields();
        List<Field> fieldsAnotadosComoId = new ArrayList<>();
        for (Field atributoCommand : atributosCommand) {
            Annotation[] annotationsDoAtributo = atributoCommand.getAnnotationsByType(IdCommand.class);
            if (annotationsDoAtributo.length > 0) {
                fieldsAnotadosComoId.add(atributoCommand);
            }
        }
        return fieldsAnotadosComoId;
    }

    private Boolean validarCommand(C command) {
        CommandEditar[] anotacoesCommand = command.getClass().getAnnotationsByType(CommandEditar.class);

        return anotacoesCommand.length > 0;
    }

    public ResultadoListagem<E> listar(Filtro filtro, Paginador paginador) {
        MapSqlParameterSource parans = new MapSqlParameterSource();
        String select = selectComColunasListaveis;

        select += filtro.getFiltros(atributosEntidade, parans) + /* " order by nome " +*/ paginador.getPaginacao(parans);
        List<Map<String, Object>> resultado = jdbcTemplate.query(select, parans, new MapRowMapper());

        return new ResultadoListagem(repositorio.count(), resultado);
    }

    public Map<String, Object> localizar(Long id) {
        String listarUsuario = selectComColunasListaveis + " where " + idEntidade.getName() + " = :id";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        return jdbcTemplate.queryForObject(listarUsuario, params, new MapRowMapper());
    }

    private String montarSelect() {
        String sql = "SELECT ";

         sql += idEntidade.getName() + ", ";
        
        for (Field atributosColunaListavelEntidade : getFieldsByAnnotation(ColunaListavel.class)) {
            sql += atributosColunaListavelEntidade.getName() + ",";
        }

        sql = sql.substring(0, sql.length() - 1);

        sql += " FROM ";
        sql += tipoEntidade.getSimpleName();

        return sql + "  ";
    }

    protected <A extends Annotation> List<Field> getFieldsByAnnotation(Class<A> annotation) {
        List<Field> fields = new ArrayList<>();
        for (Field atributoEntidade : atributosEntidade) {
            A[] annotacoesDoAtributo = atributoEntidade.getAnnotationsByType(annotation);
            if (annotacoesDoAtributo.length > 0) {
                fields.add(atributoEntidade);
            }
        }
        return fields;
    }
    
    protected Field getIdEntidade() {
        List<Field> fieldId = getFieldsByAnnotation(Id.class);
        return fieldId.get(0);
    }

}
