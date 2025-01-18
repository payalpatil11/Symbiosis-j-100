import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SaleService } from '../sales.service';
import { withFetch } from '@angular/common/http';



interface SaleItem {
  medicineId: number;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Sale {
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

@Component({
  selector: 'app-salesmanagement',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './salesmanagement.component.html',
  styleUrls: ['./salesmanagement.component.css']
})
export class SalesmanagementComponent implements OnInit {
  // Sales history array
  salesHistory: Sale[] = [];
  showSalesHistory: boolean = false;
  currentSale: Sale = this.getNewSale();
  errorMessage: string = '';

  // Form fields
  medicinePrice: number = 0;
  medicineName: string = '';
  quantity: number = 1;
  customerName: string = '';
  customerPhone: string = '';
  filterDate: string = '';
  filteredSalesHistory: Sale[] = [];

  constructor(private saleService: SaleService) {}

  ngOnInit() {
    this.loadSales();
   
      
 
    
  }

  private loadSales() {
    this.saleService.getAllSales().subscribe({
      next: (sales) => {
        this.salesHistory = sales;
        this.filteredSalesHistory = [...sales];
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading sales:', error);
        this.errorMessage = 'Unable to load sales. Please check if the server is running.';
      }
    });
  }

  // Helper method to create a new sale object
  private getNewSale(): Sale {
    return {
      date: new Date(),
      items: [],
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      customerName: '',
      customerPhone: ''
    };
  }

  /* to add the Item */
  addItem() {
    if (!this.validateMedicine()) return;

    const existingItem = this.currentSale.items.find(
      item => item.medicineName === this.medicineName
    );

    if (existingItem) {
      existingItem.quantity += this.quantity;
      existingItem.total = existingItem.quantity * existingItem.unitPrice;
    } else {
      const item: SaleItem = {
        medicineId: Date.now(),
        medicineName: this.medicineName,
        quantity: this.quantity,
        unitPrice: this.medicinePrice,
        total: this.medicinePrice * this.quantity
      };
      this.currentSale.items.push(item);
    }
    
    this.calculateTotal();
    this.resetMedicineFields();
  }

  removeItem(item: SaleItem) {
    const index = this.currentSale.items.indexOf(item);
    if (index > -1) {
      this.currentSale.items.splice(index, 1);
      this.calculateTotal();
      alert('remove Item successfully!!!')
    }
  }

  calculateTotal() {
    this.currentSale.subtotal = this.currentSale.items.reduce(
      (sum, item) => sum + item.total, 0
    );
    this.currentSale.tax = this.currentSale.subtotal * 0.18;
    this.currentSale.total = 
      this.currentSale.subtotal + 
      this.currentSale.tax - 
      (this.currentSale.discount || 0);
  }
  

  completeSale() {
    if (!this.validateCustomer() || this.currentSale.items.length === 0) {
      alert('please fill all required filled')
      return;
    }
    const isConfirmed = window.confirm('Are you sure you want to complete this sale?');
  if (!isConfirmed) {
    return;
  }

    const completedSale: Sale = {
      ...this.currentSale,
      date: new Date(),
      customerName: this.customerName,
      customerPhone: this.customerPhone
      
    };

    this.saleService.createSale(completedSale).subscribe({
      next: (response) => {
        this.salesHistory.unshift(response);
        this.resetSale();
        this.errorMessage = '';
        alert('Sale completed successfully!');
      },
      error: (error) => {
        console.error('Error saving sale:', error);
        this.errorMessage = 'Error saving sale. Please try again.';
      }
    });
  }

  validateCustomer(): boolean {
    if (!this.customerName.trim()) {
      alert( 'Customer Name is required!!!');
      return false;
    }

    if (!/^\d{10}$/.test(this.customerPhone)) {
      alert('Customer Phone must be exactly 10 digits!!!');
      return false;
    }

    return true;
  }

  validateMedicine(): boolean {
    if (!this.medicineName.trim()) {
     alert('Medicine Name is required!!!');
      return false;
    }

    if (this.medicinePrice <= 0) {
      alert('Price must be greater than 0!!!');
      return false;
    }

    if (this.quantity <= 0) {
      alert('Quantity must be greater than 0 !!!');
      return false;
    }

    return true;
  }

  resetMedicineFields() {
    this.medicineName = '';
    this.medicinePrice = 0;
    this.quantity = 1;
  }

  resetSale() {
    this.currentSale = this.getNewSale();
    this.customerName = '';
    this.customerPhone = '';
  }

  filterSalesByDate() {
    if (!this.filterDate) {
      alert('Please select a date to filter the sales.');
      return;
    }
  
    const selectedDate = this.filterDate;
  
    this.saleService.getSalesByDate(selectedDate).subscribe({
      next: (filteredSales) => {
        this.filteredSalesHistory = filteredSales;
  
        if (this.filteredSalesHistory.length === 0) {
          alert('No sales found for the selected date.');
        }
      },
      error: (err) => {
        console.error('Error fetching filtered sales:', err);
        alert('Error fetching filtered sales. Please try again later.');
      }
    });
  }

  resetFilter() {
    this.filterDate = '';
    
    this.saleService.getAllSales().subscribe({
      next: (allSales) => {
        this.salesHistory = allSales;
        this.filteredSalesHistory = [...allSales];
      },
      error: (err) => {
        console.error('Error fetching all sales:', err);
        alert('Error resetting filter. Please try again later.');
      }
    });
  }

  onViewSalesHistory() {
    this.showSalesHistory = !this.showSalesHistory;
  }

}

