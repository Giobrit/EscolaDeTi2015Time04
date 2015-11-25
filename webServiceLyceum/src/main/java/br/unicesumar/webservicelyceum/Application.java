package br.unicesumar.webservicelyceum;

import java.util.Date;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "br.unicesumar.webservicelyceum")
public class Application {

    public static void main(String[] args) {
        new Date();
        SpringApplication.run(Application.class, args);
    }

}
