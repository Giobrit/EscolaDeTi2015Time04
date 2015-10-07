package br.unicesumar.webservicelyceum;

import java.util.Date;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        new Date();
        SpringApplication.run(Application.class, args);
    }

}
