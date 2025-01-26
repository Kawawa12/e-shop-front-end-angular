import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Category } from '../../model';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxPaginationModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit {
deleteCategory(_t34: number) {
throw new Error('Method not implemented.');
}
editCategory(_t34: number) {
throw new Error('Method not implemented.');
}
  
  categories:  Category[] = []; // Update type as needed

  category = { categoryName: '' }; // Model for the form

  constructor(private adminService: AdminService) {}

  filteredCategories: Category[] = [];
  page: number = 1; // Initial page
  pageSize: number = 5; // Number of categories per page
  searchQuery: string = ''; // Search query for filtering


  ngOnInit(): void {
    this.adminService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.filteredCategories = [...this.categories]; // Initialize filtered categories
    });
  }

  // Filter categories based on the search query
  filterCategories(): void {
    if (this.searchQuery) {
      this.filteredCategories = this.categories.filter((category) =>
        category.categoryName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCategories = [...this.categories];
    }
  }


  addCategory() {
    if (this.category.categoryName.trim()) {
      this.adminService.addCategory(this.category).subscribe(
        (res) => {
          console.log('Response:', res);

          // SweetAlert Success Message
          Swal.fire({
            title: 'Success!',
            text: `Category "${this.category.categoryName}" added successfully!`,
            icon: 'success',
            confirmButtonText: 'OK',
          });

          // Reset the form field
          this.category.categoryName = ''
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

  // editCategory(index: number) {
  //   const updatedName = prompt('Edit Category Name', this.categories[index].catName);
  //   if (updatedName !== null && updatedName.trim()) {
  //     const updatedCategory = { ...this.categories[index], catName: updatedName.trim() };

  //     this.adminService.updateCategory(updatedCategory).subscribe(
  //       (res) => {
  //         console.log('Category updated:', res);

  //         // SweetAlert Success Message
  //         Swal.fire({
  //           title: 'Success!',
  //           text: `Category "${updatedCategory.catName}" updated successfully!`,
  //           icon: 'success',
  //           confirmButtonText: 'OK',
  //         });

  //         // Refresh the category list
  //         this.getCategories();
  //       },
  //       (error) => {
  //         console.error('Error updating category:', error);

  //         // SweetAlert Error Message
  //         Swal.fire({
  //           title: 'Error!',
  //           text: 'Failed to update category. Please try again later.',
  //           icon: 'error',
  //           confirmButtonText: 'OK',
  //         });
  //       }
  //     );
  //   }
  // }

  // deleteCategory(index: number) {
  //   const categoryId = this.categories[index].id;

  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This action cannot be undone.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.adminService.deleteCategory(categoryId).subscribe(
  //         (res) => {
  //           console.log('Category deleted:', res);

  //           // SweetAlert Success Message
  //           Swal.fire({
  //             title: 'Deleted!',
  //             text: 'The category has been deleted.',
  //             icon: 'success',
  //             confirmButtonText: 'OK',
  //           });

  //           // Refresh the category list
  //           this.getCategories();
  //         },
  //         (error) => {
  //           console.error('Error deleting category:', error);

  //           // SweetAlert Error Message
  //           Swal.fire({
  //             title: 'Error!',
  //             text: 'Failed to delete category. Please try again later.',
  //             icon: 'error',
  //             confirmButtonText: 'OK',
  //           });
  //         }
  //       );
  //     }
  //   });
  // }
}
