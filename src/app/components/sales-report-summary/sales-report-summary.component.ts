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

  // Get the day name from the saleDate
  getDayName(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Monday"
  }
}