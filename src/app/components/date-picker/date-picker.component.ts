import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-date-picker',
  imports: [],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {

  selectedDate: string = '';

  constructor(public dialogRef: MatDialogRef<DatePickerComponent>) {}


  setDate(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.selectedDate = this.formatDate(input.value); // Format date
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD format
  }

  confirmDate() {
    if (this.selectedDate) {
      this.dialogRef.close(this.selectedDate);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
