import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
placeOrder() {
throw new Error('Method not implemented.');
}
  @Output() cartUpdated = new EventEmitter<{ products: Product[]; count: number }>(); // Emit updated cart items and count
  cartItemsWithQuantity: { product: Product; quantity: number }[] = [];
  totalAmount: number = 0;

  constructor(
    private dialogRef: MatDialogRef<CartComponent>,
    @Inject(MAT_DIALOG_DATA) public cartItems: Product[]
  ) {}

  ngOnInit(): void {
    if (this.cartItems && this.cartItems.length > 0) {
      this.cartItemsWithQuantity = this.cartItems.map((item) => ({
        product: item,
        quantity: 1,
      }));
      this.updateTotalAmount();
    }
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
