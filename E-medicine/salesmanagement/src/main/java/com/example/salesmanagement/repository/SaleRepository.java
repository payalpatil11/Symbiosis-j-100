package com.example.salesmanagement.repository;

import com.example.salesmanagement.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.xml.crypto.Data;

public interface SaleRepository extends JpaRepository<Sale, Long> {
	List<Sale> findByDate(LocalDate date); // Ensure your database has a matching column type

}
