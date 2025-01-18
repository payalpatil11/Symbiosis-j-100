package com.example.salesmanagement.dto;//DTO:-Data Transfer Object

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data 
public class SaleDTO {
    private Long id;
    private Date date;
    private List<SaleItemDTO> items;
    private double subtotal;
    private double tax;
    private double discount;
    private double total;
    private String customerName;
    private String customerPhone;
    
  //getter or setter
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public List<SaleItemDTO> getItems() {
		return items;
	}
	public void setItems(List<SaleItemDTO> items) {
		this.items = items;
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