import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminProfileModelComponent } from '../admin-profile-model/admin-profile-model.component';
import { ChangePasswordModelComponent } from '../change-password-model/change-password-model.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  

  updateAdminProfile() {
    this.dialog.open(AdminProfileModelComponent, {
      //data: admin,
      width: '90%', // Responsive width
      maxWidth: '800px', // Maximum width
      height: 'auto', // Auto height
      position:{top:'5%'}
    })
  }
  
  changePassword() {
    this.dialog.open(ChangePasswordModelComponent, {
      width: '90%', // Responsive width
      maxWidth: '800px', // Maximum width
      height: 'auto', // Auto height
      position:{top:'5%'}
    })
  }
  
}
