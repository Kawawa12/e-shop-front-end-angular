import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerOrderDto, Product } from '../model';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Output() cartUpdated = new EventEmitter<{ products: Product[]; count: number }>(); // Emit updated cart items and count
  cartItemsWithQuantity: { product: Product; quantity: number }[] = [];
  totalAmount: number = 0;
  emailModalVisible = false;
  email: any;

  constructor(
    private dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public cartItems: Product[],
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.cartItems && this.cartItems.length > 0) {
      this.cartItemsWithQuantity = this.cartItems.map((item) => ({
        product: item,
        quantity: 1,
      }));
      this.updateTotalAmount();
    }
  }

  // Open the modal to enter email
  openEmailModal() {
    this.emailModalVisible = true;
  }

  // Close the modal without submitting
  closeEmailModal() {
    this.emailModalVisible = false;
  }

  // Submit order with email and order details
  submitOrder() {
    if (this.email) {
      const order: CustomerOrderDto = {
        orderItems: this.cartItemsWithQuantity.map(item => ({
          id: item.product.id,
          itemName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          totalPrice: item.product.price * item.quantity,
        })),
        totalAmount: this.totalAmount,
      };

      // Send both order and email to the backend
      this.userService.placeOrder(order, this.email).subscribe(
        (response) => {
          console.log('Order placed successfully', response);
          // Clear the cart and update the parent component via emitter
          this.clearCart();
          this.emitCartChanges();
          // Close modal and clear email input after successful order
          this.closeEmailModal();
          this.email = '';
        },
        (error) => {
          console.error('Error placing order', error);
        }
      );
    } else {
      console.error('Email is required');
    }
  }

  // Clear the cart after successful submission
  clearCart() {
    this.cartItemsWithQuantity = [];
    this.totalAmount = 0;
  }

  closeCart() {
    this.dialogRef.close();
  }

  incrementQuantity(cartItem: { product: Product; quantity: number }) {
    cartItem.quantity++;
    this.updateTotalAmount();
    this.emitCartChanges();
  }

  decrementQuantity(cartItem: { product: Product; quantity: number }) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.updateTotalAmount();
      this.emitCartChanges();
    }
  }

  removeItem(cartItem: { product: Product; quantity: number }) {
    const index = this.cartItemsWithQuantity.indexOf(cartItem);
    if (index !== -1) {
      this.cartItemsWithQuantity.splice(index, 1);
      this.updateTotalAmount();
      this.emitCartChanges(); // Emit updated cart items
    }
  }

  emitCartChanges() {
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
