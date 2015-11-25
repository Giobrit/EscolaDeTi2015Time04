package br.unicesumar.escoladeti2015time04.perfilUsuario;

import java.io.Serializable;
import java.util.Objects;

public class ItemAvulsoId implements Serializable {

    private Long idUsuario;

    private Long idItemAcesso;

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

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 23 * hash + Objects.hashCode(this.idUsuario);
        hash = 23 * hash + Objects.hashCode(this.idItemAcesso);
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
        final ItemAvulsoId other = (ItemAvulsoId) obj;
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
        return "ItemAvulsoId{" + "idUsuario=" + idUsuario + ", idItemAcesso=" + idItemAcesso + '}';
    }

}
