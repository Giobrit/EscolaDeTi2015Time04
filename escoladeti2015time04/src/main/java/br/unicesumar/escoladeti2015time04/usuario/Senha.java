package br.unicesumar.escoladeti2015time04.usuario;

import br.unicesumar.escoladeti2015time04.utils.excecoes.CampoInvalido;
import java.io.Serializable;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Transient;
import org.springframework.util.DigestUtils;

@Embeddable
public class Senha implements Serializable {

    @Column(name = "senha", nullable = false)
    private String senha;
    @Transient
    private final Integer TAMANHO_MINIMO_SENHA = 6;
    @Transient
    private final Integer TAMANHO_MAXIMO_SENHA = 10;

    public Senha() {
    }

    public Senha(String senha) {
        if (!validarSenha(senha)) {
            throw new CampoInvalido("Senha");
        }
        
        this.senha = DigestUtils.md5DigestAsHex(senha.getBytes());
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        if (!validarSenha(senha)) {
            throw new CampoInvalido("Senha");
        }
        this.senha = DigestUtils.md5DigestAsHex(senha.getBytes());
    }

    private Boolean validarSenha(String senha) {
        return senha != null && temMinuscula(senha) && temMaiuscula(senha) && temNumero(senha)
                && temEspecial(senha) && comprimentoDaSenha(senha);
    }

    private Boolean temMinuscula(String senha) {
        Pattern padrao = Pattern.compile("[a-z]");
        Matcher minuscula = padrao.matcher(senha);
        return minuscula.find();
    }

    private Boolean temMaiuscula(String senha) {
        Pattern padrao = Pattern.compile("[A-Z]");
        Matcher maiuscula = padrao.matcher(senha);
        return maiuscula.find();
    }

    private Boolean temNumero(String senha) {
        Pattern padrao = Pattern.compile("[0-9]");
        Matcher numero = padrao.matcher(senha);
        return numero.find();
    }

    private Boolean temEspecial(String senha) {
        Pattern padrao = Pattern.compile("[^a-zA-Z0-9]");
        Matcher caracterEspecial = padrao.matcher(senha);
        return caracterEspecial.find();
    }

    private boolean comprimentoDaSenha(String senha) {
        return senha.length() >= TAMANHO_MINIMO_SENHA && senha.length() <= TAMANHO_MAXIMO_SENHA;
    }

    @Override
    public String toString() {
        return senha;
    }
}
