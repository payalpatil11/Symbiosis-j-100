package com.example.salesmanagement.repository;

import com.example.salesmanagement.entity.SaleItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {
    List<SaleItem> findBySaleId(Long saleId);
}