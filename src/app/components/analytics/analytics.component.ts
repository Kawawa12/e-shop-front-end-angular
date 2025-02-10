import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { SalesService, SalesRecord } from '../../services/sales.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements AfterViewInit {
  salesRecords: SalesRecord[] = []; // Weekly sales data
  chart: any; // Chart instance

  // Summary variables
  totalProductsSold: number = 0;
  totalRevenue: number = 0;
  averageSalesPerDay: number = 0;

  weekStartDate: string = '';
  weekEndDate: string = '';


  constructor(private salesService: SalesService) {}

  ngAfterViewInit() {
    // Fetch last week's sales data
    this.salesService.getLastWeekSales().subscribe({
      next: (response) => {
        if (response.data) {
          this.salesRecords = response.data;
          this.calculateSummary(); // Calculate summary
          this.loadChart(); // Load the chart after data is fetched
          this.calculateDateRange();
        }
      },
      error: (err) => {
        console.error('Failed to fetch sales data:', err);
      },
    });
  }


  calculateDateRange() {
    if (this.salesRecords.length === 0) {
      this.weekStartDate = 'N/A';
      this.weekEndDate = 'N/A';
      return;
    }
  
    // Get the first sale date in the week
    const saleDates = this.salesRecords.map(record => new Date(record.saleDate));
    const firstSaleDate = new Date(Math.min(...saleDates.map(d => d.getTime())));
  
    // Get the start (Monday) and end (Sunday) of the week
    const startOfWeek = new Date(firstSaleDate);
    startOfWeek.setDate(firstSaleDate.getDate() - firstSaleDate.getDay() + 1); // Monday
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
  
    // Format dates (YYYY-MM-DD)
    this.weekStartDate = startOfWeek.toISOString().split('T')[0];
    this.weekEndDate = endOfWeek.toISOString().split('T')[0];
  }
  

  // Calculate the summary
  calculateSummary() {
    this.totalProductsSold = this.salesRecords.reduce(
      (sum, record) => sum + record.quantities.reduce((a, b) => a + b, 0),
      0
    );
  
    this.totalRevenue = this.salesRecords.reduce(
      (sum, record) => sum + record.totalAmount,
      0
    );
  
    // Ensure we consider all 7 days of the week even if no sales occurred
    const totalDays = 7; // Always consider a full week
    
    this.averageSalesPerDay = this.totalRevenue / totalDays;
  }
  

  // Get the day name from the saleDate
  getDayName(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Monday"
  }

  // Prepare data for the chart
  prepareChartData(): { labels: string[]; data: number[] } {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const salesByDay = new Map<string, number>();

    // Initialize sales for each day to 0
    daysOfWeek.forEach((day) => salesByDay.set(day, 0));

    // Populate sales data for each day
    this.salesRecords.forEach((record) => {
      const dayName = this.getDayName(record.saleDate);
      salesByDay.set(dayName, (salesByDay.get(dayName) || 0) + record.totalAmount);
    });

    // Convert the map to arrays for Chart.js
    const labels = Array.from(salesByDay.keys());
    const data = Array.from(salesByDay.values());

    return { labels, data };
  }

  // Load the bar chart
  loadChart() {
    const { labels, data } = this.prepareChartData();

    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels, // Days of the week
        datasets: [
          {
            label: 'Sales (Tsh )',
            data: data, // Total sales for each day
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)', // Monday
              'rgba(54, 162, 235, 0.6)', // Tuesday
              'rgba(255, 206, 86, 0.6)', // Wednesday
              'rgba(75, 192, 192, 0.6)', // Thursday
              'rgba(153, 102, 255, 0.6)', // Friday
              'rgba(255, 159, 64, 0.6)', // Saturday
              'rgba(199, 199, 199, 0.6)', // Sunday
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // Monday
              'rgba(54, 162, 235, 1)', // Tuesday
              'rgba(255, 206, 86, 1)', // Wednesday
              'rgba(75, 192, 192, 1)', // Thursday
              'rgba(153, 102, 255, 1)', // Friday
              'rgba(255, 159, 64, 1)', // Saturday
              'rgba(199, 199, 199, 1)', // Sunday
            ],
            borderWidth: 1,
            barThickness: 20,
            borderRadius: {
              topLeft: 15,
              topRight: 15, // Rounded top corners
              bottomLeft: 0,
              bottomRight: 0,
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
            },
            ticks: {
              callback: function (value) {
                return 'Tsh ' + value;
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}