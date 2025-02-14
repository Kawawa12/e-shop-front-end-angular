import { Component, OnInit } from '@angular/core';
import { SalesRecord, ApiResponse, SalesService } from '../../services/sales.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-report-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-report-summary.component.html',
  styleUrls: ['./sales-report-summary.component.css'],
})
export class SalesReportSummaryComponent implements OnInit {
  salesRecords: SalesRecord[] = []; // For last week's sales
  errorMessage: string | null = null;
  totalRevenue: number = 0; // Total revenue for the week
  averageRevenue: number = 0; // Average revenue for the week

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    // Load last week's sales when the component initializes
    this.loadLastWeekSales();
  }

  // Fetch sales for the last week
  loadLastWeekSales(): void {
    this.salesService.getLastWeekSales().subscribe({
      next: (response) => {
        if (response.data) {
          this.salesRecords = response.data;
          this.calculateRevenue(); // Calculate total and average revenue
          this.errorMessage = null;
        } else {
          this.salesRecords = [];
          this.errorMessage = response.message; // Display "No records found" message
        }
      },
      error: (err) => {
        this.salesRecords = [];
        // Check if the error is a custom response (e.g., "No records found")
        if (err.message) {
          this.errorMessage = err.message; // Display the custom message
        } else {
          this.errorMessage = 'Failed to fetch last week sales.'; // Default error message
        }
      },
    });
  }

  // Calculate total and average revenue
  calculateRevenue(): void {
    // Calculate total revenue
    this.totalRevenue = this.salesRecords.reduce((sum, record) => sum + record.totalAmount, 0);

    // Calculate average revenue
    const daysWithSales = this.salesRecords.length; // Number of days with sales
    this.averageRevenue = daysWithSales > 0 ? this.totalRevenue / daysWithSales : 0; // Avoid division by zero
  }

  // Get the day name from the saleDate
  getDayName(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Monday"
  }
}