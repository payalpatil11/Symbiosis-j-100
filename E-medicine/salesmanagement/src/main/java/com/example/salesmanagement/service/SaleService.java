package com.example.salesmanagement.service;

import com.example.salesmanagement.entity.*;
import com.example.salesmanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

import javax.xml.crypto.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class SaleService {
    @Autowired
    private SaleRepository saleRepository;
    
    public Sale saveSale(Sale sale) {
        // The bidirectional relationship is now handled by the Sale entity's setItems method
        if (sale.getItems() != null) {
            sale.setItems(sale.getItems());
        }
        return saleRepository.save(sale);
    }
    
    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }
    
    public List<Sale> getSalesByDate(LocalDate date) {
        // Assuming SaleRepository has a method findByDate(LocalDate date)
        return saleRepository.findByDate(date);
    }
}