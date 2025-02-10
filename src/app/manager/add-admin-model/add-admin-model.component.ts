import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { MatDialogRef } from '@angular/material/dialog';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-admin-model',
  standalone:true,
  providers: [provideNativeDateAdapter()],
  imports: [MatIconModule,CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-admin-model.component.html',
  styleUrl: './add-admin-model.component.css'
})
  
export class AddAdminModelComponent {

  adminForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder, 
    private managerService: ManagerService,
    private dialoRef: MatDialogRef<AddAdminModelComponent>
  ) {
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

  

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Ensure the selected file is stored
  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  


  onSubmit(): void {
    if (this.adminForm.invalid || !this.selectedFile) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields and select an image!',
      });
      return;
    }

    // SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this new admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Show progress spinner while submitting
        Swal.fire({
          title: 'Adding Admin...',
          text: 'Please wait while we add the admin.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // Create FormData to send to the server
        const formData = new FormData();
        const id = localStorage.getItem('id'); // Fetch ID from local storage

        if (id) {
          formData.append('id', id);
        }

        Object.keys(this.adminForm.controls).forEach((key) => {
          formData.append(key, this.adminForm.get(key)?.value);
        });
        formData.append('image', this.selectedFile as Blob);

        // API call to add admin
        this.managerService.addAdmin(formData).subscribe({
          next: (response) => {
            console.log('response data: ', response);

            // Hide progress and show success message
            Swal.fire({
              icon: 'success',
              title: 'Admin added successfully!',
              showConfirmButton: false,
              timer: 1500,
            });

            this.adminForm.reset();
            this.imagePreview = null;  // Reset image preview on success
          },
          error: (error) => {
            // Hide progress and show error message
            Swal.fire({
              icon: 'error',
              title: 'Error adding admin',
              text: error.message || 'Something went wrong!',
            });
          },
        });
      }
    });
  }

  // This method will close the dialog without saving and reset the preview
  exitDialog(): void {
    this.dialoRef.close(null);
    this.imagePreview = null; // Reset the image preview when the dialog is closed
  }
}
