package br.unicesumar.escoladeti2015time04.utils.excecoes;
 
public class ResultadoDeErro<T> {

    private String mensagemUsuario;
    private String mensagemConsole;

    public ResultadoDeErro() {
    }

    public ResultadoDeErro(String mensagemUsuario) {
        this.mensagemUsuario = mensagemUsuario;
    }

    public ResultadoDeErro(String mensagemConsole, String mensagemUsuario) {
        this.mensagemUsuario = mensagemUsuario;
        this.mensagemConsole = mensagemConsole;
    }

    public String getMensagemUsuario() {
        return mensagemUsuario;
    }

    public void setMensagemUsuario(String mensagemUsuario) {
        this.mensagemUsuario = mensagemUsuario;
    }

    public String getMensagemConsole() {
        return mensagemConsole;
    }

    public void setMensagemConsole(String mensagemConsole) {
        this.mensagemConsole = mensagemConsole;
    }

}
