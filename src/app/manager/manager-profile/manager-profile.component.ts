import { Component } from '@angular/core';
import { ChangePasswordModelComponent } from '../../components/change-password-model/change-password-model.component';
import { EditImageProfileModelComponent } from '../../edit-image-profile-model/edit-image-profile-model.component';
import { AdminProfileModelComponent } from '../../components/admin-profile-model/admin-profile-model.component';
import { MatDialog } from '@angular/material/dialog';
import { ManagerProfileDto } from '../../model';
import { CommonModule } from '@angular/common';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-manager-profile',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css'
})
export class ManagerProfileComponent {
 

  imageUrl!: string;
  
    profileData: ManagerProfileDto = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
     
  };
  
  
  constructor(private dialog: MatDialog, 
      private managerService:ManagerService
  ) { }
 
    isLoading: boolean = true; // Track loading state
    
    ngOnInit(): void {
      this.getProfileImage();
      this.getManagerProfile();
    }
    
    id = localStorage.getItem('id');
    
    getProfileImage() {
      this.isLoading = true; // Show loader before fetching
      this.managerService.getProfileImage(this.id).subscribe({
        next: (base64Image) => {
          this.imageUrl = `data:image/jpeg;base64,${base64Image}`;
          this.isLoading = false; // Hide loader after fetching
        },
        error: (error) => {
          console.error('Error fetching image:', error);
          this.isLoading = false; // Hide loader even on error
        }
      });
    }
    
  
    getManagerProfile() {
      this.managerService.managerProf(this.id).subscribe({
        next: (res) => {
           console.log('Profile data: ', res);
          this.profileData = res;
        },
        error: (error) => {
          console.error('Error fetching profile details. ', error);
        }
      })
    }
  
    updateProfile() {
    const dialogRef =  this.dialog.open(AdminProfileModelComponent, {
        // data: admin,
        width: '90%', // Responsive width
        maxWidth: '800px', // Maximum width
        height: 'auto', // Auto height
        position: { top: '5%' },

        //Path data to edit
        data: this.profileData,

    });
      
      dialogRef.afterClosed().subscribe((result) => {
        if(result) {
          this.getManagerProfile();
        }
      })
    }
  
    changePassword() {
      this.dialog.open(ChangePasswordModelComponent, {
        width: '90%', // Responsive width
        maxWidth: '800px', // Maximum width
        height: 'auto', // Auto height
        position: { top: '5%' },
      });
    }
  
  
    editImageProf() {
      const dialogRef = this.dialog.open(EditImageProfileModelComponent, {
        width: '30%',
        position: { top: '5%' },
        data: { imageUrl: this.imageUrl }
      });

      //Listen event from dialog edit image then subscrib
      dialogRef.componentInstance.imageUpdated.subscribe(() => {
        this.getProfileImage();
      })
    }
  
  }
  


