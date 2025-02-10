import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { SalesRecord } from '../../model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sales-records',
  standalone: true,
  imports: [CommonModule, NgIf], // Import NgIf for conditional rendering
  templateUrl: './sales-records.component.html',
  styleUrls: ['./sales-records.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class SalesRecordsComponent implements OnInit {


  sales!:SalesRecord

  // Initialize properly
  currentDate = new Date(); // Store the current date

  constructor(private adminService: AdminService,private dialogRef:MatDialogRef<SalesRecordsComponent>) {}

  ngOnInit(): void {
    this.getDailySales(); // Fetch sales data on component load
  }

  getDailySales() {
    this.adminService.getDailySales().subscribe({
      next: (salesData) => {
        console.log('Sales:', salesData);
        this.sales = salesData; // Store fetched data in 'sales'
      },
      error: (error) => {
        console.log('Errors:', error);
      }
    });
  }

  exitDialog() {
    this.dialogRef.close(null);
  }

}
