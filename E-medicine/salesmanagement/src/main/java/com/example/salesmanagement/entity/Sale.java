package com.example.salesmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity   //it's create table in database automatically
@Data 
public class Sale {
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDate date;
    private double subtotal;
    private double tax;
    private double discount;
    private double total;
    private String customerName;
    private String customerPhone;
    
   
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sale")
    private List<SaleItem> items;
    
    // Getter method should be getItems()
    public List<SaleItem> getItems() {
        return items;
    }
    
    public void setItems(List<SaleItem> items) {
        this.items = items;
        
        

	
}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(double subtotal) {
		this.subtotal = subtotal;
	}

	public double getTax() {
		return tax;
	}

	public void setTax(double tax) {
		this.tax = tax;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}
}
