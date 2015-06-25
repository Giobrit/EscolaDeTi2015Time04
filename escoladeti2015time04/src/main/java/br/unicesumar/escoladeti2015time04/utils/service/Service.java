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
import org.springframework.dao.DataAccessException;
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
    protected Map<Field, ColunaLocalizavel> colunasLocalizaveisEntidade = new HashMap<>();
    protected Field idEntidade;
    protected String select;
    protected String from;
    protected String selectNumeroRegistros;

    protected abstract Class<E> getClassEntity();

    @PostConstruct
    protected void init() {
        this.colunasListaveisEntidade.putAll(getMapFieldAnotacao(ColunaListavel.class));
        this.colunasLocalizaveisEntidade.putAll(getMapFieldAnotacao(ColunaLocalizavel.class));
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

        return listar(colunasRetornadas, filtro, ordenador, paginador);
    }

    protected ResultadoListagem<E> listar(Set<String> colunasRetornadas) throws DataAccessException {
        return listar(colunasRetornadas, new Filtro());
    }

    protected ResultadoListagem<E> listar(Set<String> colunasRetornadas, Filtro filtro) throws DataAccessException {
        return listar(colunasRetornadas, filtro, new Ordenador(idEntidade.getName()));
    }

    protected ResultadoListagem<E> listar(Set<String> colunasRetornadas, Filtro filtro, Ordenador ordenador) throws DataAccessException {
        return listar(colunasRetornadas, filtro, ordenador, new Paginador() {

            @Override
            public String getPaginacao(MapSqlParameterSource parans) {
                return "";
            }
        });
    }

    protected ResultadoListagem<E> listar(Set<String> colunasRetornadas, Filtro filtro, Ordenador ordenador, Paginador paginador) throws DataAccessException {
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
        String listarUsuario = this.select + "," + getCamposQuery(this.colunasLocalizaveisEntidade) + this.from + " where " + getClassEntity().getSimpleName() + "." + idEntidade.getName() + " = :id";

        MapSqlParameterSource params = new MapSqlParameterSource();
        params.addValue("id", id);

        return jdbcTemplate.queryForObject(listarUsuario, params, new MapRowMapper());
    }

    public E localizarObjeto(Long id) {
        return (E) repository.getOne(id);
    }

    public List<?> camposLocalizaveisInseridos(String campo, String valor) {
        for (Map.Entry<Field, ColunaLocalizavel> entrySet : colunasLocalizaveisEntidade.entrySet()) {
            Field field = entrySet.getKey();
            ColunaLocalizavel colunaLocalizavel = entrySet.getValue();

            if (field.getName().equals(campo)) {
                return valoresInseridosNoCampo(field, colunaLocalizavel, valor);
            }
        }

        return null;
    }

    private List<?> valoresInseridosNoCampo(Field field, ColunaLocalizavel colunaLocalizavel, String valor) throws DataAccessException {
        Map<Field, ColunaLocalizavel> coluna = new HashMap<>();
        coluna.put(field, colunaLocalizavel);
        String campoQuery = getCamposQuery(coluna);

        String query = "select distinct " + campoQuery + this.from + " where (" + campoQuery + ")::varchar like :valor order by " + campoQuery;

        MapSqlParameterSource parans = new MapSqlParameterSource();

        parans.addValue("valor", '%' + valor + '%');

        return jdbcTemplate.queryForList(query, parans, field.getType());
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
        Annotation anotacaoCommand = classCommand.getAnnotation(CommandEditar.class);

        return anotacaoCommand != null;
    }

    protected String montarSelectListar() {
        String selectComId = "SELECT ";

        selectComId += getClassEntity().getSimpleName() + "." + idEntidade.getName();

        return selectComId + "  ";
    }

    protected String montarFromListar() {
        String fromDoSelect = " FROM ";

        fromDoSelect += getClassEntity().getSimpleName();

        return fromDoSelect + "  ";
    }

    protected <A extends Annotation> String getCamposQuery(Map<Field, A> colunas) {
        String campos = "";
        for (Map.Entry<Field, A> coluna : colunas.entrySet()) {
            Field campo = coluna.getKey();
            A colunaGerenciavel = coluna.getValue();

            if (colunaGerenciavel instanceof ColunaListavel) {
                campos += getCampoEmUmaQuery((ColunaListavel) colunaGerenciavel, campo);
            } else if (colunaGerenciavel instanceof ColunaLocalizavel) {
                campos += getCampoEmUmaQuery((ColunaLocalizavel) colunaGerenciavel, campo);
            }
        }

        campos = campos.substring(0, campos.length() - 1);

        return campos + "  ";
    }

    protected String getCamposQuery(Set<String> colunasRetornadas) {
        if (colunasRetornadas == null) {
            return getCamposQuery(this.colunasListaveisEntidade);
        }

        String campos = " ";
        for (Map.Entry<Field, ColunaListavel> colunasListaveis : colunasListaveisEntidade.entrySet()) {
            Field campo = colunasListaveis.getKey();
            ColunaListavel colunaListavel = colunasListaveis.getValue();

            if (!colunasRetornadas.contains(campo.getName())) {
                continue;
            }

            campos += getCampoEmUmaQuery(colunaListavel, campo);
        }

        campos = campos.substring(0, campos.length() - 1);

        return campos + " ";
    }

    private String getCampoEmUmaQuery(ColunaListavel colunaListavel, Field campo) {
        String campoNaQuery = colunaListavel.campoNaQuery();
        String aliasNaQuery = colunaListavel.aliasNaQuery();

        return montarCampoDeQuery(campo, campoNaQuery, aliasNaQuery) + ",";
    }

    private String getCampoEmUmaQuery(ColunaLocalizavel colunaLocalizavel, Field campo) {
        String campoNaQuery = colunaLocalizavel.campoNaQuery();
        String aliasNaQuery = colunaLocalizavel.aliasNaQuery();

        return montarCampoDeQuery(campo, campoNaQuery, aliasNaQuery) + ",";
    }

    private String montarCampoDeQuery(Field campo, String campoNaQuery, String aliasNaQuery) {
        String campoString;
        if ("".equals(campoNaQuery)) {
            campoString = campo.getName();
        } else {
            campoString = campoNaQuery;
        }

        if (!"".equals(aliasNaQuery)) {
            campoString += " as " + aliasNaQuery;
        }

        return campoString;
    }

    protected String montarSelectNumeroTotalRegistros() {
        return montarSelectNumeroTotalRegistros(getClassEntity());
    }

    protected String montarSelectNumeroTotalRegistros(Class entidade) {
        String sql = "SELECT count(";

        sql += getClassEntity().getSimpleName() + "." + idEntidade.getName();
        sql += ") as numeroTotalRegistros";
        sql += this.from;

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

    protected <A extends Annotation> Map<Field, A> getMapFieldAnotacao(Class<A> classAnotacao) {
        return getMapFieldAnotacao(classAnotacao, getClassEntity());
    }

    protected <A extends Annotation> Map<Field, A> getMapFieldAnotacao(Class<A> classAnotacao, Class entidade) {
        Map<Field, A> mapFieldAnotacao = new HashMap<>();
        for (Field atributoEntidade : entidade.getDeclaredFields()) {
            A annotacaoDoAtributo = (A) atributoEntidade.getAnnotation(classAnotacao);//getAnnotationByType(atributoEntidade, ColunaListavel.class);
            if (annotacaoDoAtributo != null) {
                mapFieldAnotacao.put(atributoEntidade, annotacaoDoAtributo);
            }
        }
        return mapFieldAnotacao;
    }

}
