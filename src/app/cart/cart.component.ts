import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerOrderDto, Product } from '../model';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Output() cartUpdated = new EventEmitter<{ products: Product[]; count: number }>();
  cartItemsWithQuantity: { product: Product; quantity: number }[] = [];
  totalAmount: number = 0;
  emailModalVisible = false;
  email: any;

  constructor(
    private dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public cartItems: Product[],
    private userService: UserService
  ) {}

  ngOnInit(): void {
    //console.log('Id : ', localStorage.getItem('id'));
    // Load cart items from localStorage
    const savedCartItems = localStorage.getItem('cartItemsWithQuantity');
    if (savedCartItems) {
      this.cartItemsWithQuantity = JSON.parse(savedCartItems);
      this.updateTotalAmount();
      this.emitCartChanges();
    }

    // Merge incoming cartItems with existing cartItemsWithQuantity
    if (this.cartItems && this.cartItems.length > 0) {
      this.cartItems.forEach((item) => {
        const existingItem = this.cartItemsWithQuantity.find(
          (cartItem) => cartItem.product.id === item.id
        );

        if (existingItem) {
          // If the item already exists in the cart, update its product details
          existingItem.product = item;
        } else {
          // If the item is not in the cart, add it with a default quantity of 1
          this.cartItemsWithQuantity.push({
            product: item,
            quantity: 1,
          });
        }
      });

      this.updateTotalAmount();
      this.emitCartChanges();
      this.saveCartToLocalStorage(); // Save the merged cart to localStorage
    }
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cartItemsWithQuantity', JSON.stringify(this.cartItemsWithQuantity));
  }

  submitOrder() {
    const id = localStorage.getItem('id');
    if (id != null) {
      const order: CustomerOrderDto = {
        orderItems: this.cartItemsWithQuantity.map((item) => ({
          id: item.product.id,
          itemName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          totalPrice: item.product.price * item.quantity,
        })),
        totalAmount: this.totalAmount,
      };

      this.userService.placeOrder(order, id).subscribe(
          (response) => {
            console.log('Order placed successfully', response);

            Swal.fire({
              title: 'Order Placed!',
              text: 'Your order has been placed successfully.',
              icon: 'success',
              confirmButtonText: 'Close',
              confirmButtonColor: '#3b82f6',
            }).then((result) => {
              if (result.isConfirmed) {
                this.clearCart();
                localStorage.removeItem('carttemp');
                this.emitCartChanges();
                this.closeCart();
              }
            });
          },
          (error) => {
            console.error('Error placing order', error);

            Swal.fire({
              title: 'Error',
              text: 'There was an error placing your order. Please try again.',
              icon: 'error',
              confirmButtonText: 'Close',
              confirmButtonColor: '#dc2626',
            });
          }
        );
    
    } else {
      console.error('Id is required');

      Swal.fire({
        title: 'Missing Information',
        text: 'Please provide credential to place the order.',
        icon: 'warning',
        confirmButtonText: 'Close',
        confirmButtonColor: '#3b82f6',
      });
    }
  }

  clearCart(): void {
    this.cartItemsWithQuantity = [];
    this.updateTotalAmount();
    this.emitCartChanges();
    localStorage.removeItem('cartItemsWithQuantity'); // Clear cart from localStorage
  }

  closeCart() {
    this.dialogRef.close();
  }

  incrementQuantity(cartItem: { product: Product; quantity: number }) {
    cartItem.quantity++;
    this.updateTotalAmount();
    this.emitCartChanges();
    this.saveCartToLocalStorage(); // Save changes to localStorage
  }

  decrementQuantity(cartItem: { product: Product; quantity: number }): void {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.updateTotalAmount();
      this.emitCartChanges();
      this.saveCartToLocalStorage(); // Save changes to localStorage
    }
  }

  removeItem(cartItem: { product: Product; quantity: number }): void {
    const index = this.cartItemsWithQuantity.indexOf(cartItem);
    if (index !== -1) {
      this.cartItemsWithQuantity.splice(index, 1);
      this.updateTotalAmount();
      this.emitCartChanges(); // Emit updated cart items
      this.saveCartToLocalStorage(); // Save changes to localStorage
    }
  }

  emitCartChanges(): void {
    const updatedProducts = this.cartItemsWithQuantity.map((item) => item.product);
    this.cartUpdated.emit({ products: updatedProducts, count: updatedProducts.length });
  }

  updateTotalAmount() {
    this.totalAmount = this.cartItemsWithQuantity.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}