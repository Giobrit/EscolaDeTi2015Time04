package br.unicesumar.escoladeti2015time04.utils.excecoes;

public class CampoInvalido extends ExcecaoPadrao {

    private final String nomeCampo;

    public CampoInvalido(String nomeCampo) {
        super("O campo " + nomeCampo + " não cumpre os requisitos minimos para ele!");
        this.nomeCampo = nomeCampo;
    }

    public CampoInvalido(String messagemDesenvolvedor, String nomeCampo) {
        super(messagemDesenvolvedor);
        this.nomeCampo = nomeCampo;
    }

    @Override
    public String getMensagemUsuario() {
        return "O campo " + nomeCampo + " está inválido!";
    }

}
