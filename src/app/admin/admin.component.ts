import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';
 


@Component({
  selector: 'app-admin',
  standalone: true, // Add this if using Angular 17+
  imports: [CommonModule, ReactiveFormsModule, FormsModule,], // Add HttpClientModule
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  products: Product[] = []; // Initialize as empty array
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private adminService: AdminService) {} // Inject your service

  ngOnInit(): void {
    this.fetchProducts(); // Fetch products on component initialization
  }

  fetchProducts(): void {
    this.adminService.getProducts().subscribe((data:Product[])=> {
        this.products = data; // Assign fetched data to products array
        this.filteredProducts = data; // Initialize filteredProducts with fetched data
    });
  }

  onSearch(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1; // Reset to first page after filtering
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getPaginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  onDelete(product: Product): void {
    this.products = this.products.filter((p) => p !== product);
    this.filteredProducts = this.filteredProducts.filter((p) => p !== product);
  }
}