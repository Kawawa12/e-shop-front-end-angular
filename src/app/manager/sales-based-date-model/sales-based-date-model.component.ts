import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-based-date-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-based-date-model.component.html',
  styleUrls: ['./sales-based-date-model.component.css'],
})
export class SalesBasedDateModelComponent implements OnInit {
  salesData: any;
  errorMessage: string = ''; // Variable to store error message
  selectedDate: string = ''; // Store the selected date

  constructor(
    public dialogRef: MatDialogRef<SalesBasedDateModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // If data is passed with an error message, set the error message, else use the sales data
    if (data) {
      this.salesData = data.salesData;
      this.selectedDate = data.selectedDate; // Set the selected date from passed data
      this.errorMessage = data.errorMessage || ''; // If there is an error message, store it
    }
  }

  ngOnInit(): void {
    console.log('selected date :', this.selectedDate)
    console.log('Receved data :', this.salesData)
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
