package com.example.salesmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication    
@EntityScan("com.example.salesmanagement.entity")     
@EnableJpaRepositories("com.example.salesmanagement.repository")
public class SalesApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalesApplication.class, args);
        System.out.println("E-Medicine Sales Management System Started Successfully!!!!");
    }
    
   
}