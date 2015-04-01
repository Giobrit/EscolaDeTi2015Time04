package br.unicesumar.escoladeti2015time04;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "br.unicesumar.escoladeti2015time04")
public class Application {
    private static SpringApplication app;

    private static ApplicationContext appRunning;
    
    public static void main(String[] args) {
        app = new SpringApplication(Application.class);

        app.setShowBanner(false);

        appRunning = app.run(args);
    }
}
    
