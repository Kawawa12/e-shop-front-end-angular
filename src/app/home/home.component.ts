import { Component, HostListener, OnInit } from '@angular/core';
import { Category, Product } from '../model';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

   

  isLoggedIn: boolean = false;
  products: Product[] = []; // Array to store the fetched products
  isHeaderSolid: boolean = false; // State to control header solid behavior
  isDropdownOpen: boolean = false; // State to control dropdown menu
  categories: Category[] = [];
  isHeaderStatic: any;
  cartItemCount: number = 0;

  tempProductList: { id: number; name: string; price: number; image: string | null }[] = [];

  constructor(private adminService: AdminService,private snackBar:MatSnackBar,
    private router: Router, private dialog: MatDialog, private authService:AuthService) { }

  // Add product to temporary list
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

  localStorage.setItem('carttemp', JSON.stringify(this.tempProductList));

  // Show a snackbar notification
  this.snackBar.open(`${product.name}  added to cart Successful`,'', {
    duration: 3000, // Duration in milliseconds (3 seconds)
    verticalPosition: 'top', // Position the snackbar at the top
    horizontalPosition: 'center', // Center the snackbar horizontally
    
  });
}

  // Open the cart dialog and pass the list of products to the CartComponent
  openCart() {
    // Check if the cart is empty
    if (this.tempProductList.length === 0) {
      // Show SweetAlert for empty cart
      Swal.fire({
        icon: 'warning',
        title: 'Empty Cart!',
        text: 'Please add item(s) to view cart.',
        confirmButtonText: 'Close',
        confirmButtonColor: '#3085d6',
      });
      return; // Stop further execution
    }
  
    const userId = localStorage.getItem('id');
    const jwtToken = localStorage.getItem('jwtToken');
  
    if (!userId || !jwtToken) {
      // Show SweetAlert for invalid credentials
      Swal.fire({
        icon: 'info',
        title: 'Provide Your Credentials',
        text: 'Please log in or sign up to access your cart.',
        showCancelButton: true,  // Enables a second button
        confirmButtonText: 'Go to Login',
        cancelButtonText: 'Sign Up',  // Text for the second button
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          // Store the intended action (open cart) in local storage
          localStorage.setItem('intendedAction', 'openCart');
          // Redirect to the login page
          this.router.navigate(['/sign-in']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Redirect to the sign-up page
          this.router.navigate(['/sign-up']);
        }
      });
  
      return; // Stop further execution
    }
  
    // Open the cart dialog
    const dialogRef = this.dialog.open(CartComponent, {
      position: { top: '3%', right: '4%' },
      width: '500px',
      height: '700px',
      data: this.tempProductList,
    });
  
    dialogRef.componentInstance.cartUpdated.subscribe(({ products, count }) => {
      this.tempProductList = products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }));
      this.cartItemCount = count;
  
      // Save the updated cart to localStorage
      localStorage.setItem('carttemp', JSON.stringify(this.tempProductList));
    });
  }



  ngOnInit(): void {
    //Check the items in local storage
    const savedCartItems = localStorage.getItem('carttemp');
    if (savedCartItems) {
      this.tempProductList = JSON.parse(savedCartItems);
      this.cartItemCount = this.tempProductList.length;
    }

    this.getAllCategory();
    this.adminService.getActiveProducts().subscribe({
     next: (data) => {
        this.products = data;
        //console.log(data);
      },
      error:(error) => {
        console.error('Error fetching products', error);
      }
    });

    //Check loged in status
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('jwtToken');
  }

  // Logout function
  logout(): void {
    this.authService.logoutToHome(); // Call the logout method from AuthService
    this.isLoggedIn = false; // Update login status

    // Show SweetAlert notification
    Swal.fire({
      title: 'Logged Out',
      text: 'You are logged out successfully.',
      icon: 'success', // Success icon
      confirmButtonText: 'Close', // Button text
      confirmButtonColor: '#3b82f6', // Blue color for the button
      allowOutsideClick: false, // Prevent closing by clicking outside
      allowEscapeKey: false, // Prevent closing by pressing ESC
    }).then((result) => {
      if (result.isConfirmed) {
        // Optional: Add any additional logic after the user clicks "Close"
        //console.log('User clicked Close');
        return;
      }
    });
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
    this.isLoggedIn = true;
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
