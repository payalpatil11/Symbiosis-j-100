package com.example.salesmanagement.controller;

import com.example.salesmanagement.entity.*;
import com.example.salesmanagement.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import javax.xml.crypto.Data;

@RestController         //class can handles HTTP request and return the data
@RequestMapping("/api/sales")  //to specifies the URL path
@CrossOrigin(origins = "http://localhost:4200")    //allows cross origin request enabling sharing the resources between different domain.
public class SaleController {
    @Autowired             //used for dependency injection
    private SaleService saleService;
    
    @Autowired
    private SaleItemService saleItemService;

    @PostMapping          //create new resource on the server
    public ResponseEntity<Sale> createSale(@RequestBody Sale sale) {
        if (sale.getItems() != null) {
            for (SaleItem item : sale.getItems()) {
                item.setSale(sale);
                
            }
            Sale savedSale = saleService.saveSale(sale);
            return ResponseEntity.ok(savedSale);
        }
		return null;}
        
       
    
    @GetMapping  //used to retrieve the data from the server 
    public ResponseEntity<List<Sale>> getAllSales() {
        return ResponseEntity.ok(saleService.getAllSales());
    }
    
    @GetMapping("/date/{date}")
    public List<Sale> filterByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        return saleService.getSalesByDate(localDate);
    }

}

