import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


/*To create a object */
export interface SaleItem {
  medicineId: number;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Sale {
  id?: number;
  date: Date;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  customerName: string;
  customerPhone: string;
}

/* */
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = 'http://localhost:8092/api/sales'; // Adjust this URL to match your Spring Boot endpoint


  constructor(private http: HttpClient) { }

  // Create a new sale
  createSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, sale);
  }

  // Get all sales
  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.apiUrl);
  }

  // Get sales by date
  getSalesByDate(date: string): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/date/${date}`);
  }

  // Get a specific sale by ID
  getSaleById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/${id}`);
  }

  // Update a sale
  updateSale(id: number, sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.apiUrl}/${id}`, sale);
  }

  // Delete a sale
  //observable:-represent data that will arrive later
  deleteSale(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}