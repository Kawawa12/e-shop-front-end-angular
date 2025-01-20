import { Component } from '@angular/core';
import { Product } from '../model';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
  products: Product[] = []; // Array to store the fetched products

  constructor(private adminService: AdminService, private router:Router) { }

  ngOnInit(): void {
    // Call the service to get the products
    this.adminService.getProducts().subscribe(
      (data) => {
        this.products = data; 
        console.log(data)
      },
      (error) => {
        console.error('Error fetching products', error);  
      }
    );
  }

  login() {
    this.router.navigate(['/sign-in'])
  }
  

}
