import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AdminProfileModelComponent } from '../../components/admin-profile-model/admin-profile-model.component';
import { ManagerProfileDto } from '../../model';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-update-manager-profile',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-manager-profile.component.html',
  styleUrl: './update-manager-profile.component.css'
})
  
export class UpdateMAnagerProfileComponent {

    
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
    
