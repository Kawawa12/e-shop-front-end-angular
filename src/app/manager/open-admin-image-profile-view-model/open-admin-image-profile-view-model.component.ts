import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminImageDto } from '../manage-admins/manage-admins.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-open-admin-image-profile-view-model',
  standalone:true,
  imports: [],
  templateUrl: './open-admin-image-profile-view-model.component.html',
  styleUrl: './open-admin-image-profile-view-model.component.css',

  animations: [
      trigger('dialogAnimation', [
        state('void', style({ transform: 'scale(0.8)', opacity: 0 })), // Initial State
        transition(':enter', [
          animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
        ]), // Opening Animation
        transition(':leave', [
          animate('200ms ease-in', style({ transform: 'scale(0.8)', opacity: 0 }))
        ]) // Closing Animation
      ])
    ]

})
export class OpenAdminImageProfileViewModelComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public admin: AdminImageDto,
  private dialogRef: MatDialogRef<OpenAdminImageProfileViewModelComponent>) { }
  
  imageProfile!: string;

  ngOnInit(): void {
    console.log('Data loaded ', this.admin)
    this.imageProfile = this.admin.byteImage
      ? `data:image/png;base64,${this.admin.byteImage}`
      : '/assets/images/profile_mg.avif';
  }
  
  
  closeDialog() {
    this.dialogRef.close();
  }

}
