import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SalesDto } from '../../model';
import { AdminService } from '../../services/admin.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';


interface SalesRecord {
  productName: string;
  quantity: number;
  price: number;
  description?: string;
}

@Component({
  selector: 'app-direct-add-sales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './direct-add-sales.component.html',
  styleUrls: ['./direct-add-sales.component.css'],
})
export class DirectAddSalesComponent implements OnInit {
  
  constructor(private adminService:AdminService, private dialogRef:MatDialogRef<DirectAddSalesComponent>){}

  ngOnInit(): void {}

   // New record object for form binding
   newRecord: SalesDto = {
    productName: '',
    quantity: 1,
    price: 0,
    description: '',
  };

  // Prevent non-numeric input for quantity
  onQuantityKeyPress(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  // Prevent non-numeric input for price
  onPriceKeyPress(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  // Limit description to 50 words
  onDescriptionInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const words = textarea.value.split(' ');
    if (words.length > 50) {
      textarea.value = words.slice(0, 50).join(' ');
      this.newRecord.description = textarea.value;
    }
  }

 
  // Array to store saved sales records
  salesRecords: SalesRecord[] = [];

  // Save the new record
    onSubmit() {
    // Show SweetAlert confirmation before adding
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this new sales record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Add the new record to the salesRecords array
        this.salesRecords.push({ ...this.newRecord });

        // Call the API to add the sales record
        this.adminService.addNewSales(this.newRecord).subscribe({
          next: (res) => {
            // Show success feedback
            Swal.fire({
              title: 'Success!',
              text: 'The sales record has been added successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          },
          error: (error) => {
            // Show error feedback
            Swal.fire({
              title: 'Error!',
              text: 'There was an error adding the sales record. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            console.log('Error:', error);
          },
        });

        // Reset the form
        this.newRecord = {
          productName: '',
          quantity: 1,
          price: 0,
          description: '',
        };
      } else {
        // Show cancellation feedback
        Swal.fire({
          title: 'Cancelled',
          text: 'The sales record was not added.',
          icon: 'info',
          confirmButtonText: 'OK',
        });
      }
    });
  }

  closeAddSales() {
    this.dialogRef.close();
  }
}