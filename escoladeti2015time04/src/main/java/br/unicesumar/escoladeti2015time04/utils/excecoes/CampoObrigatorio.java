package br.unicesumar.escoladeti2015time04.utils.excecoes;

public class CampoObrigatorio extends ExcecaoPadrao {

    private String nomeCampo;

    public CampoObrigatorio(String messagemDesenvolvedor) {
        super(messagemDesenvolvedor);
    }

    public CampoObrigatorio(String messagemDesenvolvedor, String nomeCampo) {
        super(messagemDesenvolvedor);
        this.nomeCampo = nomeCampo;
    }

    @Override
    public String getMensagemUsuario() {
        return "O Campo: " + nomeCampo + " é obrigatório!";
    }

}
