import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manage-admins',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-admins.component.html',
  styleUrl: './manage-admins.component.css'
})
export class ManageAdminsComponent {

  adminForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private managerService: ManagerService) {
    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      yOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Generate image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    
    if (this.adminForm.invalid || !this.selectedFile) {
      alert('Please fill all fields and select an image');
      return;
    }

    
    const formData = new FormData();

    const id = localStorage.getItem('id'); // Fetch ID from local storage

    if (id) {
      formData.append('id', id);
    }

    Object.keys(this.adminForm.controls).forEach((key) => {
      formData.append(key, this.adminForm.get(key)?.value);
    });
    formData.append('image', this.selectedFile);

    this.managerService.addAdmin(formData).subscribe({
      next: (response) => {
        console.log('respone data: ', response);
        alert('Admin added successfully!');
        this.adminForm.reset();
        this.imagePreview = null;  
      },
      error:(error) => {
        console.error('Error adding admin:', error);
      }
    });
  }
}