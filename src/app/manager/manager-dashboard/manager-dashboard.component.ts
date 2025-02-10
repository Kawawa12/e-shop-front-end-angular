import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManageAdminsComponent } from '../manage-admins/manage-admins.component';
import { CommonModule } from '@angular/common';
import { SalesRecordsComponent } from '../../components/sales-records/sales-records.component';
import { Chart } from 'chart.js';
import { AddAdminModelComponent } from '../add-admin-model/add-admin-model.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent implements OnInit{
isSubmitting: any;

  constructor(private dialog: MatDialog) { }
  
  date = new Date();
  dayName: string = '';

  ngOnInit(): void {
    const toDay = new Date();
    this.dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(toDay)
  }

addAdmin(enterAnimationDuration:string, exitAnimationDuration:string) {
  this.dialog.open(AddAdminModelComponent, {
    width: '90%', // Responsive width
    maxWidth: '800px', // Maximum width
    position: { top: '4%' },
    enterAnimationDuration,
    exitAnimationDuration,
  })
}
  
  viewDailySales(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(SalesRecordsComponent, {
      width: '90%', // Responsive width
      maxWidth: '800px', // Maximum width
      position: { top: '4%' },
      enterAnimationDuration,
      exitAnimationDuration,
    }); 
  }


  //Charts implementations

oday = new Date();
totalProductsSold = 120;
totalAmountEarned = 5400;
status = 'Completed';

ngAfterViewInit() {
  this.loadChart();
}

loadChart() {
  const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [{
        data: [550000, 650000, 300000, 458000, 400000, 0, 750000], // Adjusted data
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Monday
          'rgba(54, 162, 235, 0.6)', // Tuesday
          'rgba(255, 206, 86, 0.6)', // Wednesday
          'rgba(75, 192, 192, 0.6)', // Thursday
          'rgba(153, 102, 255, 0.6)', // Friday
          'rgba(255, 159, 64, 0.6)', // Saturday
          'rgba(199, 199, 199, 0.6)' // Sunday
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Monday
          'rgba(54, 162, 235, 1)', // Tuesday
          'rgba(255, 206, 86, 1)', // Wednesday
          'rgba(75, 192, 192, 1)', // Thursday
          'rgba(153, 102, 255, 1)', // Friday
          'rgba(255, 159, 64, 1)', // Saturday
          'rgba(199, 199, 199, 1)' // Sunday
        ],
        borderWidth: 1,
        barThickness: 20,
        borderRadius: {
          topLeft: 15,
          topRight: 15, // Rounded top corners
          bottomLeft: 0,
          bottomRight: 0
        }
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false, // Remove x-axis grid lines
          },
          ticks: {
            font: {
              size: 16 // Increase x-axis label size
            }
          }
        },
        y: { 
          grid: {
            display: false, // Remove y-axis grid lines
          },
          ticks: {
            font: {
              size: 16 // Increase y-axis label size
            },
            callback: function (value) {
              // Format y-axis labels with commas for thousands
              return value.toLocaleString();
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false, // Remove the legend (color label at the top)
        },
        tooltip: {
          bodyFont: {
            size: 16 // Increase tooltip text size
          },
          titleFont: {
            size: 18 // Increase tooltip title size
          },
          callbacks: {
            label: function (context) {
                // Ensure raw data is treated as a number
                const value = Number(context.raw); 
        
                // Format the number with commas for thousands
                return `${context.dataset.label}: ${value.toLocaleString()}`;
            }
        }
        
        }
      }
    }
  });
}
  
}


