import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerService } from '../../services/manager.service';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { OpenAdminImageProfileViewModelComponent } from '../open-admin-image-profile-view-model/open-admin-image-profile-view-model.component';
import { AdminService } from '../../services/admin.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface AdminImageDto {
  profileImg: any;
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  yOfBirth: string;
  byteImage: string;
  status: boolean; // Track admin's status
  isLoading: boolean; // Track loading state
}

@Component({
  selector: 'app-manage-admins',
  standalone: true,
  imports: [CommonModule, MatTableModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css'],
})
  
export class ManageAdminsComponent implements OnInit {
  displayedColumns: string[] = ['profileImage', 'fullName', 'email', 'homeAddress', 'phone', 'actions'];
  dataSource: AdminImageDto[] = [];
  filteredDataSource: AdminImageDto[] = [];
  isLoading: boolean = false;

  constructor(private managerService: ManagerService, private dialog:MatDialog,private adminService:AdminService) {}

  ngOnInit(): void {
    this.getAllAdmins();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredDataSource = this.dataSource.filter(
      (admin) =>
        admin.fullName.toLowerCase().includes(filterValue) ||
        admin.email.toLowerCase().includes(filterValue) ||
        admin.phone.toLowerCase().includes(filterValue)
    );
  }

  getAllAdmins() {
    this.isLoading = true; // Show loader before API call
    this.managerService.getAdmins().subscribe({
      next: (res: AdminImageDto[]) => {
        this.dataSource = res.map((admin) => ({
          ...admin,
          profileImg: admin.byteImage 
            ? `data:image/png;base64,${admin.byteImage}` 
            : '/images/profile_mg.avif',
          isActive: admin.status, // Initialize based on backend response
          isLoading: false, // Initialize loading state as false
        }));
        this.filteredDataSource = this.dataSource;
        this.isLoading = false; // Hide loader after data is loaded
      },
      error: (error) => {
        console.error('Error fetching admins:', error);
        this.isLoading = false; // Hide loader on error
      },
    });
  }
  

  
  
  openProfile(admin:AdminImageDto) {
    this.dialog.open(OpenAdminImageProfileViewModelComponent, {
      position:{top:'5%'},
      data:admin
    })
  }

  toggleAdminStatus(admin: AdminImageDto) {
    const action = admin.status ? 'Deactivate' : 'Activate';
  
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to ${action.toLowerCase()} ${admin.fullName}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${action} it!`
    }).then((result) => {
      if (result.isConfirmed) {
        admin.isLoading = true; // Show loader
  
        this.managerService.changeAdminStatus(admin.id).subscribe({
          next: (response: string) => {
            admin.status = !admin.status; // Toggle status based on successful API response
            admin.isLoading = false; // Hide loader
            //refresh admin list
            this.getAllAdmins();
            Swal.fire(
              `${action}d!`,
              response, // Use the backend response message directly
              'success'
            );
          },
          error: (error) => {
            admin.isLoading = false; // Hide loader if there's an error
            console.error('Error updating status:', error);
  
            Swal.fire(
              'Error!',
              'Something went wrong while updating the status.',
              'error'
            );
          }
        });
      }
    });
  }
  
}