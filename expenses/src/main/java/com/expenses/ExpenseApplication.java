package com.expenses;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/*
 * Spring boot needs the following to map database and structure to connect
 * @EnableJpaRepositories identifies where to look for repositories.
 * @EntityScan identifies where to look for entities.
*/

@SpringBootApplication
@EnableJpaRepositories(basePackages="com.expenses.service")  
@EntityScan(basePackages="com.expenses.model") 
public class ExpenseApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseApplication.class, args);
	}

}
