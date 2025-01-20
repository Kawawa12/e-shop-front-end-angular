import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit{
  category = { name: '' }; // Model for the form

  constructor(private adminService: AdminService){}

  ngOnInit(): void {
    this.adminService.getCategories().subscribe(res => {
      console.log('Categories: ', res);
    })
  }

  addCategory() {
    if (this.category.name.trim()) {
      // API call to save the category
      this.adminService.addCategory(this.category.name).subscribe(
        (res) => {
          console.log('Response:', res);

          // SweetAlert Success Message
          Swal.fire({
            title: 'Success!',
            text: `Category "${this.category.name}" added successfully!`,
            icon: 'success',
            confirmButtonText: 'OK',
          });

          // Reset the form field
          this.category.name = '';
        },
        (error) => {
          console.error('Error:', error);

          // SweetAlert Error Message
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add category. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      // SweetAlert Warning Message for Empty Field
      Swal.fire({
        title: 'Warning!',
        text: 'Category name is required!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }
}
