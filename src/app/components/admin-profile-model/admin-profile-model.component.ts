import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManagerProfileDto } from '../../model';
import { ManagerService } from '../../services/manager.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-profile-model',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './admin-profile-model.component.html',
  styleUrl: './admin-profile-model.component.css'
})
  
  
export class AdminProfileModelComponent{


  profileData: ManagerProfileDto;
  managerId: any

  constructor(private dialogRef: MatDialogRef<AdminProfileModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ManagerProfileDto, private managerService:ManagerService
  ) {
    //assign data to spread
    this.profileData = { ...data };
    this.managerId = localStorage.getItem('id');
  }

  @Output() profileUpdated = new EventEmitter<void>();

  onSubmit() {
    if (!this.managerId) {
      Swal.fire('Error', 'Accessro dinied!.', 'error');
      return;
    }

    Swal.fire({
      title: 'Updating Profile...',
      text: 'Please wait while we update your profile.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      
    });

    
    this.managerService.updateManagerProf(this.managerId, this.profileData).subscribe({
      
      next: (response) => {
        console.log('Profile Data:', this.profileData); // Log backend response
        Swal.fire('Success', response, 'success'); // Show backend message in SweetAlert
        this.profileUpdated.emit(); // Notify parent to refresh profile
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error('Profile update error:', error);
        Swal.fire('Error', 'Failed to update profile. Please try again.', 'error');
      },
    });
  }
  cancelEdit() {
    this.dialogRef.close();
    this.profileUpdated.emit()
  }

}
