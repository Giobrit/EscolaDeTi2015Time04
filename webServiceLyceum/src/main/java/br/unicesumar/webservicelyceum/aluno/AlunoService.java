package br.unicesumar.webservicelyceum.aluno;

import br.unicesumar.webservicelyceum.bolsa.Bolsa;
import br.unicesumar.webservicelyceum.utils.MapRowMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class AlunoService {

    @Autowired
    private AlunoRepository repository;
    
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;
    
    public List<Map<String, Object>> pegarAluno(String ra){
        String sql = "SELECT DISTINCT ON (aluno.nome) "
                        + "aluno.ra AS ra,"
                        + "aluno.nome AS nome,"
                        + "aluno.centro AS centro,"
                        + "CONCAT(curso.codigo,' - ',curso.nome) AS curso,"
                        + "turma.serie AS serie,"
                        + "turma.turno AS turno,"
                        + "aluno.matriculado AS matriculado,"
                        + "bolsa.bolsa AS bolsa,"
                        + "aluno.reprovacao AS reprovacao"
                    + " FROM "
                         +"curso INNER JOIN aluno ON curso.id = aluno.idcurso "
                         +"INNER JOIN turma ON aluno.idturma = turma.id " 
                         +"INNER JOIN alunobolsas ON aluno.id = alunobolsas.aluno_id "
                         +"INNER JOIN bolsa ON alunobolsas.bolsas_id = bolsa.id "
                         +"WHERE aluno.ra = :ra";
        
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("ra", ra);        
        
        List<Map<String, Object>> alunos = jdbcTemplate.query(sql, parameters, new MapRowMapper());
        
        return alunos;
    }
    
    
    
//    public Aluno pegarAluno(Long id) {
//        return repository.getOne(id);
//        if (id == 13002602) {
//            aluno.ra      = "13002602";
//            aluno.nome    = "Giovanni De Ganello Dias";
//            aluno.centro  = "CETA";
//            aluno.curso   = "ADS";
//            aluno.serie   = "3";
//            aluno.turno   = "Noturno";
//            aluno.matriculado = "Sim";
//            aluno.bolsa       = "50% funcionário";
//            aluno.reprovacao  = "0";
//        } else if (id == 13097992) {
//            aluno.ra = "13097992";
//            aluno.nome = "Renato Kenji Nakamura";
//            aluno.centro = "CETA";
//            aluno.curso = "ADS";
//            aluno.serie = "3";
//            aluno.turno = "Noturno";
//            aluno.matriculado = "Sim";
//            aluno.bolsa = "50% prouni";
//            aluno.reprovacao = "0";
//        } else if (id == 13002702) {
//            aluno.ra = "13002702";
//            aluno.nome = "Roney Cesar de Campos";
//            aluno.centro = "CETA";
//            aluno.curso = "ADS";
//            aluno.serie = "3";
//            aluno.turno = "Noturno";
//            aluno.matriculado = "Sim";
//            aluno.bolsa = "10% sarandi/CREDIN";
//            aluno.reprovacao = "0";
//        } else if (id == 11002782) {
//            aluno.ra = "11002782";
//            aluno.nome = "Luiz Gustavo Sabaine Fagundes";
//            aluno.centro = "CETA";
//            aluno.curso = "SISIN";
//            aluno.serie = "3";
//            aluno.turno = "Noturno";
//            aluno.matriculado = "Sim";
//            aluno.bolsa = "NÃO";
//            aluno.reprovacao = "0";
//        } else if (id == 13078102) {
//            aluno.ra = "13078102";
//            aluno.nome = "Willian Zanuto Oliveira";
//            aluno.centro = "CETA";
//            aluno.curso = "SISIN";
//            aluno.serie = "3";
//            aluno.turno = "Noturno";
//            aluno.matriculado = "Sim";
//            aluno.bolsa = "50% PROMUBE";
//            aluno.reprovacao = "0";
//        } else if (id == 13089252) {
//            aluno.ra = "13089252";
//            aluno.nome = "Filipe Martins Maldinado";
//            aluno.centro = "CETA";
//            aluno.curso = "ADS";
//            aluno.serie = "3";
//            aluno.turno = "Noturno";
//            aluno.matriculado = "Sim";
//            aluno.bolsa = "100% PROMUBE";
//            aluno.reprovacao = "0";
//        } else if (id == 13003052) {
//            aluno.ra = "13003052";
//            aluno.nome = "Liz Regina Okuzono";
//            aluno.centro = "CETA";
//            aluno.curso = "ADS";
//            aluno.serie = "3";
//            aluno.turno = "Noturno";
//            aluno.matriculado = "Sim";
//            aluno.bolsa = "100% FIES";
//            aluno.reprovacao = "0";
//        } else if (id == 13097572) {
//            aluno.ra = "13097572";
//            aluno.nome = "Rodrigo Ferreira de Souza";
//            aluno.centro = "CETA";
//            aluno.curso = "ADS";
//            aluno.serie = "3";
//            aluno.turno = "Noturno";
//            aluno.matriculado = "Sim";
//            aluno.bolsa = "100% FIES";
//            aluno.reprovacao = "0";
//        } else {
//            throw new IllegalArgumentException("Aluno não encontrado!");
//        }
//        return aluno;
//    }
    
    public void criar(Aluno aluno){
        repository.save(aluno);
    }
    
    public List<Aluno> buscarTodos(){
        return repository.findAll();
    }
    
    public void editar(Long id, List<Bolsa> bolsasDoAluno){
        Aluno aluno = repository.getOne(id);
        aluno.setBolsas(bolsasDoAluno);
        repository.save(aluno);
    }
}
