import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-profile-model',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './admin-profile-model.component.html',
  styleUrl: './admin-profile-model.component.css'
})
export class AdminProfileModelComponent implements OnInit{



  constructor(private dialogRef: MatDialogRef<AdminProfileModelComponent>){}

  ngOnInit(): void {
    
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  cancelEdit() {
    this.dialogRef.close(null);
  }

}
