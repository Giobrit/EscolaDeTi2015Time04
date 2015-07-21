package br.unicesumar.escoladeti2015time04.perfilUsuario;

import br.unicesumar.escoladeti2015time04.itemAcesso.ItemAcesso;
import br.unicesumar.escoladeti2015time04.usuario.Usuario;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
/* if this JPA model doesn't create a table for the "PROJ_EMP" entity,
 *  please comment out the @PrimaryKeyJoinColumn, and use the ff:
 *  @JoinColumn(name = "employeeId", updatable = false, insertable = false)
 *  @JoinColumn(name = "employeeId", updatable = false, insertable = false, referencedColumnName = "id")
 */

@Entity
@Table(name = "itemavulso")
@IdClass(ItemAvulsoId.class)
public class ItemAvulso implements Serializable {

    @Id
    @Column(name = "idusuario")
    private Long idUsuario;
    @Id
    @Column(name = "iditemacesso")
    private Long idItemAcesso;

    @ManyToOne
    @JoinColumn(name = "idusuario", updatable = false, insertable = false, referencedColumnName = "id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "iditemacesso", updatable = false, insertable = false, referencedColumnName = "id")
    private ItemAcesso itemAcesso;

    private TipoItemAvulso tipoItemAvulso;

    public ItemAvulso(Usuario usuario, ItemAcesso itemAcesso, TipoItemAvulso tipoItemAvulso) {
        this.idUsuario = usuario.getId();
        this.idItemAcesso = itemAcesso.getId();
        this.usuario = usuario;
        this.itemAcesso = itemAcesso;
        this.tipoItemAvulso = tipoItemAvulso;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdItemAcesso() {
        return idItemAcesso;
    }

    public void setIdItemAcesso(Long idItemAcesso) {
        this.idItemAcesso = idItemAcesso;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public ItemAcesso getItemAcesso() {
        return itemAcesso;
    }

    public void setItemAcesso(ItemAcesso itemAcesso) {
        this.itemAcesso = itemAcesso;
    }

    public TipoItemAvulso getTipoItemAvulso() {
        return tipoItemAvulso;
    }

    public void setTipoItemAvulso(TipoItemAvulso tipoItemAvulso) {
        this.tipoItemAvulso = tipoItemAvulso;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 67 * hash + Objects.hashCode(this.idUsuario);
        hash = 67 * hash + Objects.hashCode(this.idItemAcesso);
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
        final ItemAvulso other = (ItemAvulso) obj;
        if (!Objects.equals(this.idUsuario, other.idUsuario)) {
            return false;
        }
        if (!Objects.equals(this.idItemAcesso, other.idItemAcesso)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ItemAvulso{" + "idUsuario=" + idUsuario + ", idItemAcesso=" + idItemAcesso + ", usuario=" + usuario + ", itemAcesso=" + itemAcesso + ", tipoItemAvulso=" + tipoItemAvulso + '}';
    }

}
