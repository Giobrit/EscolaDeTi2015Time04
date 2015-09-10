package br.unicesumar.escoladeti2015time04.utils;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import liquibase.integration.spring.SpringLiquibase;
import liquibase.servicelocator.ServiceLocator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.data.jpa.EntityManagerFactoryDependsOnPostProcessor;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.liquibase.CommonsLoggingLiquibaseLogger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.orm.jpa.AbstractEntityManagerFactoryBean;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.util.Assert;

@Configuration
@ConditionalOnClass(SpringLiquibase.class)
@ConditionalOnBean(DataSource.class)
@ConditionalOnProperty(prefix = "liquibase", name = "enabled", matchIfMissing = true)
@AutoConfigureAfter(DataSourceAutoConfiguration.class)
public class LiquibaseAutoConfiguration {


    @Configuration
    @ConditionalOnMissingBean(SpringLiquibase.class)
    @EnableConfigurationProperties(LiquibaseProperties.class)
    @Import(LiquibaseJpaDependencyConfiguration.class)
    public static class LiquibaseConfiguration {

        @Autowired
        private LiquibaseProperties properties = new LiquibaseProperties();

        @Autowired
        private ResourceLoader resourceLoader = new DefaultResourceLoader();

        @Autowired
        private DataSource dataSource;

        @PostConstruct
        public void checkChangelogExists() {
            this.properties.setChangeLog("classpath:/br/unicesumar/escoladeti2015time04/changelog/db-changelog-master.xml");
            if (this.properties.isCheckChangeLogLocation()) {
                Resource resource = this.resourceLoader.getResource(this.properties
                        .getChangeLog());
                Assert.state(resource.exists(), "Cannot find changelog location: "
                        + resource + " (please add changelog or check your Liquibase "
                        + "configuration)");
            }
            ServiceLocator serviceLocator = ServiceLocator.getInstance();
            serviceLocator.addPackageToScan(CommonsLoggingLiquibaseLogger.class
                    .getPackage().getName());
        }

        @Bean
        public SpringLiquibase liquibase() {
            SpringLiquibase liquibase = new SpringLiquibase();
            liquibase.setChangeLog(this.properties.getChangeLog());
            liquibase.setContexts(this.properties.getContexts());
            liquibase.setDataSource(getDataSource());
            liquibase.setDefaultSchema(this.properties.getDefaultSchema());
            liquibase.setDropFirst(this.properties.isDropFirst());
            liquibase.setShouldRun(this.properties.isEnabled());
            return liquibase;
        }

        private DataSource getDataSource() {
            if (this.properties.getUrl() == null) {
                return this.dataSource;
            }
            return DataSourceBuilder.create().url(this.properties.getUrl())
                    .username(this.properties.getUser())
                    .password(this.properties.getPassword()).build();
        }
    }

    /**
     * Additional configuration to ensure that {@link EntityManagerFactory}
     * beans depend-on the liquibase bean.
     */
    @Configuration
    @ConditionalOnClass(LocalContainerEntityManagerFactoryBean.class)
    @ConditionalOnBean(AbstractEntityManagerFactoryBean.class)
    protected static class LiquibaseJpaDependencyConfiguration extends
            EntityManagerFactoryDependsOnPostProcessor {

        public LiquibaseJpaDependencyConfiguration() {
            super("liquibase");
        }

    }

}
