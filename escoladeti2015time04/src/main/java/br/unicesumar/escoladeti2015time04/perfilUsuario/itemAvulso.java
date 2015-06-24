package br.unicesumar.escoladeti2015time04.perfilUsuario;

import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class itemAvulso implements Serializable {
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Usuario usuario;
}
