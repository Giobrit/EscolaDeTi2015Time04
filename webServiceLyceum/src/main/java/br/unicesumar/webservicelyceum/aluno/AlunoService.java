package br.unicesumar.webservicelyceum.aluno;

import org.springframework.stereotype.Component;

@Component
class AlunoService {

    public Aluno pegarAluno(long id) {
        Aluno aluno = new Aluno();

        if (id == 13002602) {
            aluno.ra = "13002602";
            aluno.nome = "Giovanni De Ganello Dias";
            aluno.centro = "CETA";
            aluno.curso = "ADS";
            aluno.serie = "3ª serie";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "50% funcionário";
            aluno.reprovacao = "0";
        } else if (id == 13097992) {
            aluno.ra = "13097992";
            aluno.nome = "Renato Kenji Nakamura";
            aluno.centro = "CETA";
            aluno.curso = "ADS";
            aluno.serie = "3ª serie";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "50% prouni";
            aluno.reprovacao = "0";
        } else if (id == 13002702) {
            aluno.ra = "13002702";
            aluno.nome = "Roney Cesar de Campos";
            aluno.centro = "CETA";
            aluno.curso = "ADS";
            aluno.serie = "3ª serie";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "10% sarandi/CREDIN";
            aluno.reprovacao = "0";
        } 
        return aluno;
    }
}
