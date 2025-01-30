import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'
import { AdminService } from '../../services/admin.service';
import { MatToolbarModule }  from '@angular/material/toolbar'
import { CustomerOrderRespDto } from '../../model';
import { MatDialog } from '@angular/material/dialog';
import { ViewOrderComponent } from '../view-order/view-order.component';

@Component({
  selector: 'app-order',
  imports:
    [CommonModule,
      MatTableModule,
      MatFormFieldModule,
      MatInputModule,
      MatSortModule,
      MatPaginatorModule,
      MatToolbarModule
    ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{

 constructor(private adminServices:AdminService,private dialog:MatDialog){}

 
 displayedColumns: string[] = ['customerName', 'orderStatus', 'orderDate', 'totalAmount', 'actions'];
 dataSource: MatTableDataSource<CustomerOrderRespDto> = new MatTableDataSource();

 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

 

 ngOnInit(): void {
   this.fetchOrders();
 }

 fetchOrders(): void {
   this.adminServices.getAllOrders().subscribe({
     next: (orders) => {
       this.dataSource.data = orders;
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     },
     error: (error) => {
       console.error('Error fetching orders:', error);
     }
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

  viewOrder(order:CustomerOrderRespDto) {
    this.dialog.open(ViewOrderComponent, {
      position: { top: "50px" },
       width: '90%',
      data: order 
     })
  }
}

 