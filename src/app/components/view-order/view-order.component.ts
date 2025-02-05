import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerOrderRespDto } from '../../model';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
  ],
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
})
export class ViewOrderComponent implements OnInit {
  displayedColumns: string[] = [
    'itemName',
    'quantity',
    'pricePerProduct',
    'totalPrice',
  ];
  dataSource: MatTableDataSource<{
    id: number;
    itemName: string;
    quantity: number;
    pricePerProduct: number;
    totalPrice: number;
  }> = new MatTableDataSource();

  isSubmitting = false;

  constructor(
    private dialogRef: MatDialogRef<ViewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public order: CustomerOrderRespDto,
    private adminService: AdminService
  ) {}

  // @Output() confirmedOrder = new EventEmitter<number>(); //emmiter for confirmed order
  // @Output() orderCanceled = new EventEmitter<number>(); //emitter for canceled order
  // @Output() loadingStateChanged = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (this.order?.cartItems) {
      this.dataSource.data = this.order.cartItems;
    }
  }

  closeModelView() {
    this.dialogRef.close(null);
  }

  cancelOrder() {
    // Show SweetAlert confirmation dialog before canceling
    Swal.fire({
      title: 'Confirmation!',
      text: 'Do you really want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        // Set loading state to true before making the API call
        this.isSubmitting = true;

        // Proceed with canceling the order
        this.adminService
          .cancelOrder(this.order.userId, this.order.id)
          .subscribe({
            next: (resp) => {
              // Handle successful response
              Swal.fire({
                icon:
                  resp === 'Order canceled successful.' ? 'success' : 'info',
                title:
                  resp === 'Order canceled successful.'
                    ? 'Order Canceled!'
                    : 'Information',
                text: resp,
                confirmButtonText: 'OK',
              });
              this.isSubmitting = false;
            },
            error: (error) => {
              // Handle error
              console.error('Error canceling order:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while canceling the order.',
                confirmButtonText: 'OK',
              });
            },
            complete: () => {
              // Set loading state to false when the API call completes
              this.isSubmitting = false;
            },
          });
      }
    });
  }



  confirmOrder() {
    // Show SweetAlert confirmation dialog before confirming the order
    Swal.fire({
      title: 'Confirmation!',
      text: 'Do you want to confirm this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSubmitting = true;
        // Proceed with confirming the order
        this.adminService
          .confirmOrder(this.order.userId, this.order.id)
          .subscribe({
            next: (resp) => {
              // Handle successful response
              Swal.fire({
                icon:
                  resp === 'Order Confirmed Successful.' ? 'success' : 'info',
                title:
                  resp === 'Order Confirmed Successful.'
                    ? 'Order Confirmed!'
                    : 'Information',
                text: resp,
                confirmButtonText: 'OK',
              });
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while confirming the order.',
                confirmButtonText: 'OK',
              });
            },
            complete: () => {
              // Set loading state to false when the API call completes
              this.isSubmitting = false;
            },
          });
      }
    });
  }
}
