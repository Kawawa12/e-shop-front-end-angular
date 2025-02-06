import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminProfileModelComponent } from '../admin-profile-model/admin-profile-model.component';
import { ChangePasswordModelComponent } from '../change-password-model/change-password-model.component';
import { AdminService } from '../../services/admin.service';
import { AdminRespDto } from '../../model';
import { EditImageProfileModelComponent } from '../../edit-image-profile-model/edit-image-profile-model.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  imageUrl!: string;
  profileData: AdminRespDto = {
  id: 0,
  fullName: '',
  email: '',
  phone: '',
  address: '',
  gender: '',
  yOfBirth: '',
  dateCreated: new Date(),
  dateUpdated: new Date(),
  createdByManager: '',
  managerEmail: '',
  managerPhone: ''
};


  constructor(private dialog: MatDialog, private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAdminProfileImage();
    this.getAdminProfile();
  }
  
  id = localStorage.getItem('id');

  getAdminProfileImage() {
    this.adminService.getProfileImage(this.id).subscribe({
      next:(base64Image) => {
        this.imageUrl = `data:image/jpeg;base64,${base64Image}`;  
      },
      error:(error) => {
        console.error('Error fetching image:', error);  
      }
    });
  }

  getAdminProfile() {
    this.adminService.getAdminProfileDetails(this.id).subscribe({
      next: (res) => {
         console.log('Profile data: ', res);
        this.profileData = res;
      },
      error: (error) => {
        console.error('Error fetching profile details. ', error);
      }
    })
  }

  updateAdminProfile() {
    this.dialog.open(AdminProfileModelComponent, {
      // data: admin,
      width: '90%', // Responsive width
      maxWidth: '800px', // Maximum width
      height: 'auto', // Auto height
      position: { top: '5%' },
    });
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
    this.dialog.open(EditImageProfileModelComponent, {
      width: '30%',
      position: { top: '5%' },
      data: { imageUrl: this.imageUrl }
    });
  }

}
