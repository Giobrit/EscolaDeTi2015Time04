package br.unicesumar.escoladeti2015time04.usuario;

import br.unicesumar.escoladeti2015time04.perfilUsuario.ItemAvulso;
import br.unicesumar.escoladeti2015time04.perfilacesso.PerfilAcesso;
import br.unicesumar.escoladeti2015time04.utils.Email;
import br.unicesumar.escoladeti2015time04.utils.listagem.ColunaListavel;
import br.unicesumar.escoladeti2015time04.utils.listagem.PoliticaFiltragem;
import br.unicesumar.escoladeti2015time04.utils.service.ColunaLocalizavel;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(nullable = false)
    private String nome;

    @ColunaListavel
    @ColunaLocalizavel
    @Column(unique = true, nullable = false)
    private String login;

    @Embedded
    private Senha senha;

    @Embedded
    @ColunaListavel
    @ColunaLocalizavel
    private Email email;

    @ColunaLocalizavel
    @Enumerated(EnumType.STRING)
    @ColunaListavel(politicaFiltro = PoliticaFiltragem.VALOR_COMPLETO)
    private Status status;

    @ManyToMany
    @JoinTable(
            name = "usuario_perfildeacesso",
            joinColumns = {
                @JoinColumn(name = "idusuario")},
            inverseJoinColumns = {
                @JoinColumn(name = "idperfilacesso")}
    )
    private Set<PerfilAcesso> perfisDeAcesso;
    
    @OneToMany(mappedBy = "idusuario")
    private Set<ItemAvulso> itensAvulsos;

    public Usuario() {
    }

    public Usuario(String nome, String login, Senha senha, Email email) {
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.email = email;
    }

    public Usuario(String nome, String login, Senha senha, Email email, Set<PerfilAcesso> perfisDeAcesso, Set<ItemAvulso> itensAvulsos) {
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.email = email;
        this.perfisDeAcesso = perfisDeAcesso;
        this.itensAvulsos = itensAvulsos;
    }

    
    public Usuario(String nome, String login, Senha senha, Email email, Status status, Set<PerfilAcesso> perfisDeAcesso) {
        this.nome = nome;
        this.login = login;
        this.senha = senha;
        this.email = email;
        this.status = status;
        this.perfisDeAcesso = perfisDeAcesso;
    }

    public Usuario(Long id, Set<PerfilAcesso> perfisDeAcesso) {
        this.id = id;
        this.perfisDeAcesso = perfisDeAcesso;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public Senha getSenha() {
        return senha;
    }

    public void setSenha(Senha senha) {
        this.senha = senha;
    }

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Set<PerfilAcesso> getPerfisDeAcesso() {
        return perfisDeAcesso;
    }

    public void setPerfisDeAcesso(Set<PerfilAcesso> perfisDeAcesso) {
        this.perfisDeAcesso = perfisDeAcesso;
    }

    public Set<ItemAvulso> getItensAvulsos() {
        return itensAvulsos;
    }

    public void setItensAvulsos(Set<ItemAvulso> itensAvulsos) {
        this.itensAvulsos = itensAvulsos;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
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
        final Usuario other = (Usuario) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Usuario{" + "id=" + id + ", nome=" + nome + ", login=" + login + ", senha=" + senha + ", email=" + '}';
    }

}
