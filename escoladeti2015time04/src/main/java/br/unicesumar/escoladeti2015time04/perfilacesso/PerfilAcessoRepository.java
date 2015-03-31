package br.unicesumar.escoladeti2015time04.perfilacesso;

import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfilAcessoRepository extends JpaRepository<PerfilAcesso, Long>{
    
}
