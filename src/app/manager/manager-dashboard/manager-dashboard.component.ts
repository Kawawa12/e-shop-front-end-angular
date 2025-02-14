import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { SalesRecordsComponent } from '../../components/sales-records/sales-records.component';
import { Chart } from 'chart.js';
import { AddAdminModelComponent } from '../add-admin-model/add-admin-model.component';
import { ManagerService } from '../../services/manager.service';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { SalesService } from '../../services/sales.service';
import { SalesBasedDateModelComponent } from '../sales-based-date-model/sales-based-date-model.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent implements OnInit{

isSubmitting: any;

  constructor(private dialog: MatDialog,private managerService:ManagerService, private salesService:SalesService) { }
  
  date = new Date();
  dayName: string = '';
  totalCustomers: any;
  totalProductInStore: any;
  totalActiveAdmins: any;
  totalCategories: any;
  totalNewOrders: any;
  totalCanceledOrders: any;
  totalConfirmedOrders: any;
  totalCompletedOrders: any;

  ngOnInit(): void {
    const toDay = new Date();
    this.dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(toDay)
    //Get total customer
    this.getTotalCustomers();
    //Get total Active admins
    this.getTotalActiveAdmins();
    //Get Total stock products
    this.getTotalProducts(); 
    //Get total cetgories
    this.getTotaCategories();
    //Get total new orders
    this.getTotalNewOrders();
    //Get total confirmed orders
    this.getConfirmedOrders();
    //Get Completed orders
    this.getTotalCompletedOrders();
    //Get Canceled orders
    this.getTotalCanceledOrders();
  }

  //TOTAL CUSTOMERS
  getTotalCustomers() {
    this.managerService.getTotalCustomers().subscribe({
      next: (res) => {
        this.totalCustomers = res ?? 0;
       }
    })
  }

  //TOTAL PRODUCTS
  getTotalProducts() {
    this.managerService.getTotalProducts().subscribe({
      next: (res) => {
        this.totalProductInStore = res ?? 0;
       }
    })
  }

  //TOTAL CATEGORIES
  getTotaCategories() {
    this.managerService.getTotalCategories().subscribe({
      next: (res) => {
        this.totalCategories = res ?? 0;
       }
    })
  }

  //ACTIVE ADMINS
  getTotalActiveAdmins() {
    this.managerService.getActiveAdmins().subscribe({
      next: (res) => {
        this.totalActiveAdmins = res ?? 0;
       }
    })
  }

  //NEW ORDERS
  getTotalNewOrders() {
    this.managerService.getTotalNewOrders().subscribe( {
      next: (res) => {
        this.totalNewOrders = res ?? 0;
      }
    })
  }

  //COMPLETED ORDERS
  getTotalCompletedOrders() {
    this.managerService.getTotalCompletedOrders().subscribe({
      next: (res) => {
        this.totalCompletedOrders = res ?? 0;
      }
    })
  }

  //CANCELED ORDERS
  getTotalCanceledOrders() {
    this.managerService.getTotalCanceledOrders().subscribe({
      next: (res) => {
        this.totalCanceledOrders = res ?? 0;
       }
    })
  }

  //CONFIRMED ORDERS
  getConfirmedOrders() {
    this.managerService.getTotalConfirmedOrders().subscribe({
      next: (res) => {
        this.totalConfirmedOrders = res ?? 0; // Ensure 0 is assigned if res is falsy (null or undefined)
      }
    });
  }
  
   
//ADD ADMIN
addAdmin(enterAnimationDuration:string, exitAnimationDuration:string) {
  this.dialog.open(AddAdminModelComponent, {
    width: '90%', // Responsive width
    maxWidth: '800px', // Maximum width
    position: { top: '4%' },
    enterAnimationDuration,
    exitAnimationDuration,
  })
}
  
  //VIEW DAILY SALES
  viewDailySales(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(SalesRecordsComponent, {
      width: '90%', // Responsive width
      maxWidth: '800px', // Maximum width
      position: { top: '4%' },
      enterAnimationDuration,
      exitAnimationDuration,
    }); 
  }


  //CHART IMPLEMENTATIONS

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
  
  
openDatePickerDialog(enterAnimationDuration:string, exitAnimationDuration:string) {
  const dialogRef = this.dialog.open(DatePickerComponent, {
    width: '400px',
    enterAnimationDuration,
    exitAnimationDuration,
  });

  dialogRef.afterClosed().subscribe((selectedDate) => {
    if (selectedDate) {
      this.openSalesDialog(selectedDate,'3000ms', '500ms');
    }
  });
}

 
//Parent component for Sales based date
openSalesDialog(date: string,openAnimationDur:string, exitAnimationDur:string) {
  //console.log("Date selected: ", date);
  openAnimationDur;
  exitAnimationDur;

  const screenWidth = window.innerWidth;
  let dialogWidth = '70%'; // Default width for larger screens (increased for larger devices)

  if (screenWidth < 600) {
    // For small screens (e.g., mobile)
    dialogWidth = '85%';
  } else if (screenWidth < 960) {
    // For medium screens (e.g., tablets)
    dialogWidth = '65%';
  }

  this.salesService.getSalesByDate(date).subscribe({
    next: (response) => {
      //console.log("Sales : ", response);
      this.dialog.open(SalesBasedDateModelComponent, {
        width: dialogWidth,
        position:{top:'10%'},
        data: {
          salesData: response.data,  // Pass sales data
          selectedDate: date,        // Pass selected date
          errorMessage: response.message || '' // Pass error message if available
        }
      });
    },
    error: (error) => {
      console.error('Error fetching sales:', error);
      this.dialog.open(SalesBasedDateModelComponent, {
        width: dialogWidth,  // Use the dynamically calculated width
        data: {
          salesData: null,
          selectedDate: date,
          errorMessage: 'No sales data found for this date.'
        }
      });
    }
  });
}



  
}


