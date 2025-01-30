import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  listOfCategories: any = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: ['', Validators.required],
      name: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      stock: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.maxLength(100)], // Optional: Add max length for description
    });

    this.getAllCategories();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  getAllCategories(): void {
    this.adminService.getCategories().subscribe((res) => {
      this.listOfCategories = res;
      console.log('Categories: ', this.listOfCategories);
    });
  }

  addProduct(): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData: FormData = new FormData();
      // Append the existing fields
      formData.append('image', this.selectedFile, this.selectedFile.name);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      // Append the new fields
      formData.append('stock', this.productForm.get('stock')?.value);
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );

      // Log all form values for debugging
      console.log('Category id: ', this.productForm.get('categoryId')?.value);
      console.log('Product name: ', this.productForm.get('name')?.value);
      console.log('Product price: ', this.productForm.get('price')?.value);
      console.log('Stock quantity: ', this.productForm.get('stock')?.value);
      console.log('Description: ', this.productForm.get('description')?.value);
      console.log('Image file: ', this.selectedFile);

      this.adminService.addProduct(formData).subscribe(
        (res) => {
          console.log('Product added:', res);
          Swal.fire({
            title: 'Success!',
            text: 'Product added successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          // this.router.navigate(['/products']); // Redirect to products list
        },
        (err) => {
          console.error('Error adding product:', err);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add product. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      // Handle invalid form
      alert('Please select all the required fields.');
    }
  }
}
