package br.unicesumar.escoladeti2015time04.utils.excecoes;

public class LoginFalhou extends ExcecaoPadrao {

    public LoginFalhou() {
        super("O usuário buscado com o login ou email informados não foi encontrado provavelmente os dados informados estão incorretos");
    }

    

    @Override
    public String getMensagemUsuario() {
        return "Login ou senha inválido.";
    }

}
