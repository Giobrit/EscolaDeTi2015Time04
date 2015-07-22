package br.unicesumar.escoladeti2015time04.utils.excecoes;

public class ExcecaoPadrao extends RuntimeException {

    private String mensagemUsuario;

    public ExcecaoPadrao(String mensagemDesenvolvedor) {
        super(mensagemDesenvolvedor);
        mensagemUsuario = mensagemDesenvolvedor;
    }

    public ExcecaoPadrao(String mensagemDesenvolvedor, String mensagemUsuario) {
        super(mensagemDesenvolvedor);
        this.mensagemUsuario = mensagemUsuario;
    }

    public String getMensagemUsuario() {
        return mensagemUsuario;
    }

    public void setMensagemUsuario(String mensagemUsuario) {
        this.mensagemUsuario = mensagemUsuario;
    }

    @Override
    public String getMessage() {
        return super.getMessage();
    }

}
