package br.unicesumar.escoladeti2015time04.utils.WSLyceumClient;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
class AlunoAtendimentoDeixarOCurso {

    @Id
    String ra;
    String nome;
    String centro;
    String curso;
    String serie;
    String turno;
    String matriculado;
    String bolsa;
    String reprovacao;

    public AlunoAtendimentoDeixarOCurso() {
    }

    public AlunoAtendimentoDeixarOCurso(String ra, String nome, String centro, String curso, String serie, String turno, String matriculado, String bolsa, String reprovacao) {
        this.ra = ra;
        this.nome = nome;
        this.centro = centro;
        this.curso = curso;
        this.serie = serie;
        this.turno = turno;
        this.matriculado = matriculado;
        this.bolsa = bolsa;
        this.reprovacao = reprovacao;
    }

    public String getRa() {
        return ra;
    }

    public void setRa(String ra) {
        this.ra = ra;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCentro() {
        return centro;
    }

    public void setCentro(String centro) {
        this.centro = centro;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public String getSerie() {
        return serie;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public String getTurno() {
        return turno;
    }

    public void setTurno(String turno) {
        this.turno = turno;
    }

    public String getMatriculado() {
        return matriculado;
    }

    public void setMatriculado(String matriculado) {
        this.matriculado = matriculado;
    }

    public String getBolsa() {
        return bolsa;
    }

    public void setBolsa(String bolsa) {
        this.bolsa = bolsa;
    }

    public String getReprovacao() {
        return reprovacao;
    }

    public void setReprovacao(String reprovacao) {
        this.reprovacao = reprovacao;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 43 * hash + Objects.hashCode(this.ra);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final AlunoAtendimentoDeixarOCurso other = (AlunoAtendimentoDeixarOCurso) obj;
        if (!Objects.equals(this.ra, other.ra)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Aluno{" + "ra=" + ra + ", nome=" + nome + ", centro=" + centro + ", curso=" + curso + ", serie=" + serie + ", turno=" + turno + ", matriculado=" + matriculado + ", bolsa=" + bolsa + ", reprovacao=" + reprovacao + '}';
    }

}
