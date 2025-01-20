import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  product: any;

  constructor(private authService: AuthService, private adminService: AdminService) {}

  ngOnInit(): void {
    const productId = 3; // Example product ID
    const categoryId = 1; // Example category ID
    this.adminService.getProduct(productId, categoryId).subscribe(
      (response) => {
        this.product = response;
        console.log('Product Data: ', this.product); // Corrected this line
        console.log('Image URL: ', this.getImageUrl(this.product.imageUrl)); // Log the image URL
      },
      (error) => {
        console.error('Failed to load product', error);
      }
    );
  }

  getImageUrl(imageUrl: string): string {
    // Check if the imageUrl already contains "http" to avoid prepending the base URL again
    if (imageUrl.startsWith('http')) {
      return imageUrl; // Return the URL as it is if it is already a full URL
    }
    return `http://localhost:8080/images/${imageUrl.replace(' ', '%20')}`; // Prepend base URL if it's just a filename
  }
  

  logout() {
    this.authService.logoutToHome();
    console.log('You logged out.');
  }
}
