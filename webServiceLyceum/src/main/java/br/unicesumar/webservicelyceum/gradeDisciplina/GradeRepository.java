package br.unicesumar.webservicelyceum.gradeDisciplina;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<Grade, Long>{
    
}
