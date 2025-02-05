import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminService } from '../../services/admin.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomerOrderRespDto } from '../../model';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderComponent } from '../view-order/view-order.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatToolbarModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
  
export class OrderComponent implements OnInit {
  confOrderId!: number;
  cancelOrderId!: number;
  customerId!: number;
  isSubmitting = false;

  constructor(private adminServices: AdminService, private dialog: MatDialog) {}

  displayedColumns: string[] = [
    'customerName',
    'orderStatus',
    'orderDate',
    'totalAmount',
    'actions',
  ];
  dataSource: MatTableDataSource<CustomerOrderRespDto> =
    new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.allOrders();
  }

  allOrders(): void {
    this.adminServices.getAllOrders().subscribe({
      next: (orders) => {
        this.dataSource.data = orders;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  newOrders() {
    this.adminServices.getNewOrders().subscribe({
      next: (orders) => {
        this.dataSource.data = orders;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  confOrders() {
    this.adminServices.getConfirmedOrders().subscribe({
      next: (orders) => {
        this.dataSource.data = orders;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  completedOrders() {
    this.adminServices.getCompletedOrders().subscribe({
      next: (orders) => {
        this.dataSource.data = orders;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }

  cancelOrdes() {
    this.adminServices.getCanceledOrders().subscribe({
      next: (orders) => {
        this.dataSource.data = orders;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      },
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewOrder(order: CustomerOrderRespDto) {
    this.customerId = order.userId;  
    // Calculate responsive width based on screen size
    const screenWidth = window.innerWidth;
    let dialogWidth = '70%'; // Default width for larger screens
  
    if (screenWidth < 600) {
      // For small screens (e.g., mobile)
      dialogWidth = '85%';
    } else if (screenWidth < 960) {
      // For medium screens (e.g., tablets)
      dialogWidth = '65%';
    }
  
    const dialogRef = this.dialog.open(ViewOrderComponent, {
      position: { top: '50px' },
      width: dialogWidth,  
      maxWidth: '1100px',  
      data: order,
    });
  }

  CompleteOrder(order: CustomerOrderRespDto) {
    // Show SweetAlert confirmation dialog before marking as complete
    Swal.fire({
      title: 'Confirmation!',
      text: 'Do you want to mark this order as complete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, mark it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSubmitting = true; // Set before making the API call
        
        // Proceed with completing the order
        this.adminServices.completeOrder(order.userId, order.id).subscribe({
          next:(resp) => {
             
            Swal.fire({
              icon: resp === 'Order Successful marked as complete.' ? 'success' : 'info',
              title: resp === 'Sorry!, canceled order can not mark as complete.' ? 'Order Canceled!' : 'Information',
              text: resp,
              confirmButtonText: 'OK',
            });
          
        },
        error: (error) => {       
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while processing your request.',
            confirmButtonText: 'OK',
          });
        },
          complete: () => {
            this.isSubmitting = false;
        }
        });
      }
    });
  }
  

}
