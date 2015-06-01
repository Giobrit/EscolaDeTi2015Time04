package br.unicesumar.escoladeti2015time04.utils.service;

import br.unicesumar.escoladeti2015time04.utils.listagem.Paginador;
import br.unicesumar.escoladeti2015time04.utils.listagem.Filtro;
import br.unicesumar.escoladeti2015time04.utils.MapRowMapper;
import br.unicesumar.escoladeti2015time04.utils.listagem.ResultadoListagem;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.listagem.Ordenador;
import br.unicesumar.escoladeti2015time04.utils.listagem.RequisicaoListagem;
import java.io.Serializable;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.annotation.PostConstruct;
import javax.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

public abstract class Service<E, R extends JpaRepository, C> {

    @Autowired
    protected NamedParameterJdbcTemplate jdbcTemplate;

    protected R repository;

    @Autowired
    public void setRepository(R repositorio) {
        this.repository = repositorio;
    }

    protected Map<Field, ColunaListavel> colunasListaveisEntidade = new HashMap<>();
    protected Field idEntidade;
    protected String select;
    protected String from;
    protected String selectNumeroRegistros;

    protected abstract Class<E> getClassEntity();

    @PostConstruct
    protected void init() {
        this.colunasListaveisEntidade.putAll(getMapFieldColunaListavel());
        this.idEntidade = getIdEntidade(getClassEntity());
        this.select = montarSelectListar();
        this.from = montarFromListar();
        this.selectNumeroRegistros = montarSelectNumeroTotalRegistros();
    }

    public void criar(E entidade) {
        repository.save(entidade);
    }

    public void editar(C command) {
        try {

            Class classCommand = command.getClass();

            if (!validarCommand(classCommand)) {
                throw new IllegalArgumentException("O commando deve estar anotado com CommandEditar");
            }

            Map<String, Field> atributosCommand = getMapAtributosCammand(classCommand);

            if (atributosCommand.isEmpty() || atributosCommand.get(idEntidade.getName()) == null) {
                throw new IllegalArgumentException("O Command deve possuir ao menos um id!");
            }

            Field idCommand = atributosCommand.get(idEntidade.getName());
            idCommand.setAccessible(true);
            E objetoEntidade = (E) repository.findOne((Serializable) idCommand.get(command));

            for (Map.Entry<String, Field> atributoCommand : atributosCommand.entrySet()) {
                String nomeAtributoEquivalente = atributoCommand.getKey();
                Field atributoEquivalente = atributoCommand.getValue();

                Field field = getClassEntity().getDeclaredField(nomeAtributoEquivalente);

                atributoEquivalente.setAccessible(true);
                field.setAccessible(true);

                field.set(objetoEntidade, atributoEquivalente.get(command));
            }

            repository.save(objetoEntidade);
        } catch (NoSuchFieldException | IllegalAccessException ex) {
            throw new IllegalArgumentException("Ocorreu um erro ao editar o(a) " + this.getClassEntity().getSimpleName());
        }
    }

    public ResultadoListagem<E> listar(RequisicaoListagem requisicaoListagem) {
        Filtro filtro = requisicaoListagem.getFiltro();
        Ordenador ordenador = requisicaoListagem.getOrdenador();
        Paginador paginador = requisicaoListagem.getPaginador();
        Set<String> colunasRetornadas = requisicaoListagem.getColunasVisiveis();

        MapSqlParameterSource parans = new MapSqlParameterSource();

        String camposQuery = getCamposQuery(colunasRetornadas);

        if (camposQuery.length() > 1) {
            camposQuery = "," + camposQuery;
        }

        String selectParaListagem = this.select + camposQuery + this.from;

        selectParaListagem += filtro.getFiltros(colunasListaveisEntidade, parans) + ordenador.getOrdenacao() + paginador.getPaginacao(parans);
        List<Map<String, Object>> resultado = jdbcTemplate.query(selectParaListagem, parans, new MapRowMapper());

        return new ResultadoListagem(calcularNumeroTotalRegistros(filtro), resultado);
    }

    public Map<String, Object> localizar(Long id) {
        String listarUsuario = select + " where " + idEntidade.getName() + " = :id";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        return jdbcTemplate.queryForObject(listarUsuario, params, new MapRowMapper());
    }

    private Map<String, Field> getMapAtributosCammand(Class classCommand) {
        if (!validarCommand(classCommand)) {
            return new HashMap<>();
        }

        Class<? extends Object> commandClass = classCommand;
        Field[] atributosDoCommand = commandClass.getDeclaredFields();
        Map<String, Field> mapAtributos = new HashMap<>();
        for (Field atributoCommand : atributosDoCommand) {
            AtributoCommand anotacaoDoAtributo = atributoCommand.getAnnotation(AtributoCommand.class);
            if (anotacaoDoAtributo != null) {
                adicionarAtributoCommandNoMap(anotacaoDoAtributo, atributoCommand, mapAtributos);
            }
        }

        mapAtributos.putAll(getMapAtributosCammand(classCommand.getSuperclass()));

        return mapAtributos;
    }

    private void adicionarAtributoCommandNoMap(AtributoCommand anotacaoDoAtributo, Field atributoCommand, Map<String, Field> mapAtributos) {
        String equivalente;
        if ("".equals(anotacaoDoAtributo.equivalente())) {
            equivalente = atributoCommand.getName();
        } else {
            equivalente = anotacaoDoAtributo.equivalente();
        }
        mapAtributos.put(equivalente, atributoCommand);
    }

    private Boolean validarCommand(Class classCommand) {
        Annotation anotacaoCommand = classCommand.getDeclaredAnnotation(CommandEditar.class);

        return anotacaoCommand != null;
    }

    protected String montarSelectListar() {
        String select = "SELECT ";

        select += getClassEntity().getSimpleName() + "." + idEntidade.getName();

        return select + "  ";
    }

    protected String montarFromListar() {
        String from = " FROM ";

        from += getClassEntity().getSimpleName();

        return from + "  ";
    }

    protected String getCamposQuery() {
        String campos = "";
        for (Map.Entry<Field, ColunaListavel> colunasListaveis : colunasListaveisEntidade.entrySet()) {
            Field key = colunasListaveis.getKey();
            ColunaListavel value = colunasListaveis.getValue();

            campos += key.getName() + ",";
        }

        campos = campos.substring(0, campos.length() - 1);

        return campos + "  ";
    }

    protected String getCamposQuery(Set<String> colunasRetornadas) {
        if (colunasRetornadas == null) {
            return getCamposQuery();
        }

        String campos = " ";
        for (Map.Entry<Field, ColunaListavel> colunasListaveis : colunasListaveisEntidade.entrySet()) {
            Field key = colunasListaveis.getKey();
            ColunaListavel value = colunasListaveis.getValue();

            if (!colunasRetornadas.contains(key.getName())) {
                continue;
            }

            campos += key.getName() + ",";
        }

        campos = campos.substring(0, campos.length() - 1);

        return campos + " ";
    }

    protected String montarSelectNumeroTotalRegistros() {
        return montarSelectNumeroTotalRegistros(getClassEntity());
    }

    protected String montarSelectNumeroTotalRegistros(Class entidade) {
        String sql = "SELECT count(";

        sql += idEntidade.getName();
        sql += ") as numeroTotalRegistros FROM ";
        sql += entidade.getSimpleName();

        return sql + "  ";
    }

    protected <A extends Annotation> List<Field> getFieldsByAnnotation(Class<A> annotation) {
        return getFieldsByAnnotation(getClassEntity(), annotation);
    }

    protected <A extends Annotation> List<Field> getFieldsByAnnotation(Class entidade, Class<A> annotation) {
        List<Field> fields = new ArrayList<>();
        for (Field atributoEntidade : entidade.getDeclaredFields()) {
            A annotacaoDoAtributo = atributoEntidade.getAnnotation(annotation);
            if (annotacaoDoAtributo != null) {
                fields.add(atributoEntidade);
            }
        }
        return fields;
    }

    protected Field getIdEntidade(Class entidade) {
        Field id;
        try {
            List<Field> fieldId = getFieldsByAnnotation(entidade, Id.class);
            id = fieldId.get(0);
        } catch (IndexOutOfBoundsException e) {
            id = null;
        }

        return id;
    }

    private Long calcularNumeroTotalRegistros(Filtro filtro) {
        MapSqlParameterSource parans = new MapSqlParameterSource();

        String sql = selectNumeroRegistros;
        sql += filtro.getFiltros(colunasListaveisEntidade, parans);

        Map<String, Object> resultado = this.jdbcTemplate.queryForObject(sql, parans, new MapRowMapper());

        Long numeroPaginas = (Long) resultado.get("numerototalregistros");
        return numeroPaginas;
    }

    protected Map<Field, ColunaListavel> getMapFieldColunaListavel() {
        return getMapFieldColunaListavel(getClassEntity());
    }

    protected Map<Field, ColunaListavel> getMapFieldColunaListavel(Class entidade) {
        Map<Field, ColunaListavel> mapFieldColunaListavel = new HashMap<>();
        for (Field atributoEntidade : entidade.getDeclaredFields()) {
            ColunaListavel annotacaoDoAtributo = atributoEntidade.getAnnotation(ColunaListavel.class);//getAnnotationByType(atributoEntidade, ColunaListavel.class);
            if (annotacaoDoAtributo != null) {
                mapFieldColunaListavel.put(atributoEntidade, annotacaoDoAtributo);
            }
        }
        return mapFieldColunaListavel;
    }

}
