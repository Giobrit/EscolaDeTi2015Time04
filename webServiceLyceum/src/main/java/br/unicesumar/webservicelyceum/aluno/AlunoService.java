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
            aluno.curso = "Anál. Des.de Sistemas";
            aluno.serie = "3";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "50% funcionário";
            aluno.reprovacao = "0";
        } else if (id == 13097992) {
            aluno.ra = "13097992";
            aluno.nome = "Renato Kenji Nakamura";
            aluno.centro = "CETA";
            aluno.curso = "Anál. Des.de Sistemas";
            aluno.serie = "3";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "50% prouni";
            aluno.reprovacao = "0";
        } else if (id == 13002702) {
            aluno.ra = "13002702";
            aluno.nome = "Roney Cesar de Campos";
            aluno.centro = "CETA";
            aluno.curso = "Redes de Computadores";
            aluno.serie = "3";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "10% sarandi/CREDIN";
            aluno.reprovacao = "0";
        } else if (id == 11002782) {
            aluno.ra = "11002782";
            aluno.nome = "Luiz Gustavo Sabaine Fagundes";
            aluno.centro = "CETA";
            aluno.curso = "Sistemas para Internet";
            aluno.serie = "3";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "NÃO";
            aluno.reprovacao = "0";
        } else if (id == 13078102) {
            aluno.ra = "13078102";
            aluno.nome = "Willian Zanuto Oliveira";
            aluno.centro = "CETA";
            aluno.curso = "Sistemas para Internet";
            aluno.serie = "3";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "50% PROMUBE";
            aluno.reprovacao = "0";
        } else if (id == 13089252) {
            aluno.ra = "13089252";
            aluno.nome = "Filipe Martins Maldinado";
            aluno.centro = "CETA";
            aluno.curso = "Agronomia";
            aluno.serie = "3";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "100% PROMUBE";
            aluno.reprovacao = "0";
        } else if (id == 13003052) {
            aluno.ra = "13003052";
            aluno.nome = "Liz Regina Okuzono";
            aluno.centro = "CETA";
            aluno.curso = "Automação Industrial";
            aluno.serie = "3";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "100% FIES";
            aluno.reprovacao = "0";
        } else if (id == 13097572) {
            aluno.ra = "13097572";
            aluno.nome = "Rodrigo Ferreira de Souza";
            aluno.centro = "CETA";
            aluno.curso = "Eng.Amb.e Sanitária";
            aluno.serie = "3";
            aluno.turno = "Noturno";
            aluno.matriculado = "Sim";
            aluno.bolsa = "100% FIES";
            aluno.reprovacao = "0";
        } else {
            throw new IllegalArgumentException("Aluno não encontrado!");
        }
        return aluno;
    }
}
