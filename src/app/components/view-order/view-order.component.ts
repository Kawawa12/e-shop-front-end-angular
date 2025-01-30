import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerOrderRespDto } from '../../model';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatInputModule],
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  displayedColumns: string[] = ['itemName', 'quantity', 'pricePerProduct', 'totalPrice'];
  dataSource: MatTableDataSource<{ id: number; itemName: string; quantity: number; pricePerProduct: number; totalPrice: number }> = new MatTableDataSource();

  constructor(
    private dialogRef: MatDialogRef<ViewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public order: CustomerOrderRespDto
  ) {}

  ngOnInit(): void {
    if (this.order?.cartItems) {
      this.dataSource.data = this.order.cartItems; 
    }
  }

  closeModelView() {
    this.dialogRef.close();
  }

  confirmOrder() {
    console.log('Order confirmed:', this.order);
    this.dialogRef.close();
  }
}