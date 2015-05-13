package br.unicesumar.escoladeti2015time04.utils.service;

import br.unicesumar.escoladeti2015time04.utils.listagem.Paginador;
import br.unicesumar.escoladeti2015time04.utils.listagem.Filtro;
import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import br.unicesumar.escoladeti2015time04.utils.ResultadoListagem;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import java.io.Serializable;
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
    protected String selectNumeroRegistros;

    protected abstract void setClassEntity();

    @PostConstruct
    private void init() {
        setClassEntity();
        this.atributosEntidade = tipoEntidade.getDeclaredFields();
        this.idEntidade = getIdEntidade();
        this.selectComColunasListaveis = montarSelectListar();
        this.selectNumeroRegistros = montarSelectNumeroTotalRegistros();
        
    }

    public void salvar(E entidade) {
        repositorio.save(entidade);
    }

    public void editar(C command) {
        try {
            if (!validarCommand(command)) {
                throw new IllegalArgumentException("O commando deve estar anotado com CommandEditar");
            }

            Field atributoId = null;

            if (atributoId == null) {
                throw new IllegalArgumentException("O deve possuir um unico!");
            }

            atributoId.setAccessible(true);
            E objetoEntidade = (E) repositorio.findOne((Serializable) atributoId.get(command));

//        usuario.setNome(command.getNome());
//        usuario.setLogin(command.getLogin());
//        usuario.setEmail(command.getEmail());
//        usuario.setStatus(command.getStatus());
//        repoUsuario.save(usuario);
        } catch (IllegalAccessException ex) {
            throw new IllegalArgumentException("Ocorreu um erro ao editar o(a) " + this.tipoEntidade.getSimpleName());
        }
    }

    private Field getAtributosCommand(C command) throws SecurityException {
        Class<? extends Object> commandClass = command.getClass();
        Field[] atributosDoCommand = commandClass.getDeclaredFields();
        List<Field> atributosCommand = new ArrayList<>();
        for (Field atributoCommand : atributosDoCommand) {
            Annotation[] annotationsDoAtributo = atributoCommand.getAnnotationsByType(AtributoCommand.class);
            if (annotationsDoAtributo.length > 0) {
                atributosCommand.add(atributoCommand);
            }
        }
        return null;
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

        Long numeroDePaginas;

        try {

            numeroDePaginas = (calcularNumeroTotalRegistros(filtro) / paginador.getNumeroItensPorPagina());
        } catch (Exception e) {
            numeroDePaginas = new Long(1);
        }

        return new ResultadoListagem(numeroDePaginas, resultado);
    }

    public Map<String, Object> localizar(Long id) {
        String listarUsuario = selectComColunasListaveis + " where " + idEntidade.getName() + " = :id";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        return jdbcTemplate.queryForObject(listarUsuario, params, new MapRowMapper());
    }

    private String montarSelectListar() {
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

    private String montarSelectNumeroTotalRegistros() {
        String sql = "SELECT count(";

        sql += idEntidade.getName();
        sql += ") as numeroTotalRegistros FROM ";
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

    private Long calcularNumeroTotalRegistros(Filtro filtro) {
        MapSqlParameterSource parans = new MapSqlParameterSource();

        String sql = selectNumeroRegistros;
        sql += filtro.getFiltros(atributosEntidade, parans);

        Map<String, Object> resultado = this.jdbcTemplate.queryForObject(sql, parans, new MapRowMapper());

        return (Long) resultado.get("numeroTotalRegistros");
    }

}
