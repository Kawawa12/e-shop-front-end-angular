import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewModelComponent } from '../components/image-view-model/image-view-model.component';
 


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
  itemsPerPage: number = 15;

  isSubmitting = false;
  isActiveProductsDisplaying = true;

  constructor(private adminService: AdminService,private dialog:MatDialog) {} // Inject your service

  ngOnInit(): void {
    this.fetchProducts(); // Fetch products on component initialization
  }

  fetchProducts(): void {
    this.isSubmitting = true;
  
    setTimeout(() => {
      this.adminService.getActiveProducts().subscribe({
        next: (data: Product[]) => {
          this.products = data;  
          this.filteredProducts = data; // Initialize filteredProducts with fetched data
          this.isActiveProductsDisplaying = true;
          this.isSubmitting = false;  
        },
        error: (error) => {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: `Error fetching products due to server! or netwok failure!`,
            showCancelButton: false,
            cancelButtonText: 'Ok',
            cancelButtonColor: '#3085b6'
          })
          // console.error('Error fetching products:', error);
          this.isSubmitting = false;  
        }
      });
    }, 1000); // 1-second delay before calling API
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

  openModal(image: string) {
    this.dialog.open(ImageViewModelComponent, {
      data: { image },  
      panelClass: 'custom-dialog-container',  
      width: '90%', // Responsive width
      maxWidth: '800px', // Maximum width
      height: 'auto', // Auto height
      disableClose: false, // Allow closing by clicking outside
      autoFocus: false, // Disable auto-focus on the first focusable element
    });
  }

  onDelete(product: Product): void {
    this.products = this.products.filter((p) => p !== product);
    this.filteredProducts = this.filteredProducts.filter((p) => p !== product);
  }

  activeProducts() {
    this.isSubmitting = true; // Set loading state to true
  
    setTimeout(() => {
      this.adminService.getActiveProducts().subscribe({
        next: (response) => {
          // Update both products and filteredProducts arrays
          this.products = response;
          this.filteredProducts = response; // Update filteredProducts
          this.isActiveProductsDisplaying = true;
        },
        error: (error) => {
          // Handle the error
          console.error('Failed to fetch active products:', error);
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Failed to fetch active products. Please try again.',
            confirmButtonColor: '#3085d6'
          });
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false; // Reset loading state
        }
      });
    },1000)
  }
  
  inActiveProducts() {
    this.isSubmitting = true; // Set loading state to true
  
    setTimeout(() => {
      this.adminService.getDeactivatedProducts().subscribe({
        next: (response) => {
          // Update both products and filteredProducts arrays
          this.products = response;
          this.filteredProducts = response; // Update filteredProducts
          this.isActiveProductsDisplaying = false;
        },
        error: (error) => {
          // Handle the error
          console.error('Failed to fetch inactive products:', error);
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Failed to fetch inactive products. Please try again.',
            confirmButtonColor: '#3085d6'
          });
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false; // Reset loading state
        }
      });
    },1000)
  }


  activateProduct(productId: number) {
  this.isSubmitting = true;

  // Show confirmation dialog
  Swal.fire({
    title: 'Confirmation!',
    icon: 'question',
    text: 'Are you sure you want to activate this product?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      // Call the service to activate the product
      this.adminService.activateProduct(productId).subscribe({
        next: (response) => {
          // Handle success response
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: response.message,
            confirmButtonColor: '#3085d6'
          });

          // Optionally, refresh the product list or update the UI
          this.fetchProducts();
        },
        error: (error) => {
          // Handle error
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Failed to activate the product. Please try again.',
            confirmButtonColor: '#3085d6'
          });
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      // If the user cancels, reset the submitting state
      this.isSubmitting = false;
    }
  });
}

deactivateProduct(productId: number) {
  this.isSubmitting = true;

  // Show confirmation dialog
  Swal.fire({
    title: 'Confirmation!',
    icon: 'question',
    text: 'Are you sure you want to deactivate this product?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      // Call the service to deactivate the product
      this.adminService.deActivateProduct(productId).subscribe({
        next: (response) => {
          // Handle success response
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text:  response.message,
            confirmButtonColor: '#3085d6'
          });

          // Optionally, refresh the product list or update the UI
          this.fetchProducts();
        },
        error: (error) => {
          // Handle error
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Failed to deactivate the product. Please try again.',
            confirmButtonColor: '#3085d6'
          });
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    } else {
      // If the user cancels, reset the submitting state
      this.isSubmitting = false;
    }
  });
}

 
  
}