import { Component, HostListener, OnInit } from '@angular/core';
import { Category, Product } from '../model';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] = []; // Array to store the fetched products
  isHeaderSolid: boolean = false; // State to control header solid behavior
  isDropdownOpen: boolean = false; // State to control dropdown menu
  categories: Category[] = [];
  isHeaderStatic: any;
  cartItemCount: number = 0;

  tempProductList: { id: number; name: string; price: number; image: string | null }[] = [];

  constructor(private adminService: AdminService, private router: Router, private dialog: MatDialog) {}

  // Add product to temporary list
  addToCart(product: Product): void {
    const tempProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.byteImage ? `data:image/jpeg;base64,${product.byteImage}` : null,
    };
    this.tempProductList.push(tempProduct);
    this.cartItemCount = this.tempProductList.length;
    console.log(`${product.name} added to cart!`, tempProduct);
  }

  // Open the cart dialog and pass the list of products to the CartComponent
  openCart() {
    const dialogRef = this.dialog.open(CartComponent, {
      position: { top: '3%', right: '4%' },
      width: '500px',
      height: '700px',
      data: this.tempProductList, // Passing the cart items to the dialog
    });

    dialogRef.componentInstance.cartUpdated.subscribe(({ products, count }) => {
      // Map products back to tempProductList and count
      this.tempProductList = products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image, // Assuming image is now properly populated
      }));
      this.cartItemCount = count; // Update the cart count
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
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
    this.adminService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
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
    const heroSectionHeight = 500; // Example height in pixels

    if (window.scrollY > heroSectionHeight) {
      this.isHeaderSolid = true;
    } else {
      this.isHeaderSolid = false;
    }
  }
}
