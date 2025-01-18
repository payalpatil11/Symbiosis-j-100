package com.example.salesmanagement.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.salesmanagement.entity.SaleItem;
import com.example.salesmanagement.repository.SaleItemRepository;

@Service
public class SaleItemService {
    @Autowired
    private SaleItemRepository saleItemRepository;
    
    public SaleItem saveSaleItem(SaleItem saleItem) {
        return saleItemRepository.save(saleItem);
    }
}