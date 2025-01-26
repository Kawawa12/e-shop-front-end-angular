import { Component, HostListener, OnInit } from '@angular/core';
import { Category, Product } from '../model';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = []; // Array to store the fetched products
  isHeaderSolid: boolean = false; // State to control header solid behavior
  isDropdownOpen: boolean = false; // State to control dropdown menu
  categories: Category[] = [];
isHeaderStatic: any;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCategory();
    // Call the service to get the products
    this.adminService.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  getAllCategory() {
    this.adminService.getCategories().subscribe( (data:Category[] )=> {
        this.categories = data;
    })
  }

  // Toggle dropdown menu
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  login() {
    this.router.navigate(['/sign-in']);
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  // Listen to the scroll event
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Determine the height of the hero section (you can adjust this value)
    const heroSectionHeight = 500; // Example height in pixels

    // Check if the user has scrolled past the hero section
    if (window.scrollY > heroSectionHeight) {
      this.isHeaderSolid = true;
    } else {
      this.isHeaderSolid = false;
    }
  }
}