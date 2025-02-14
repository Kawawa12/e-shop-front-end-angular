import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-edit-image-profile-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-image-profile-model.component.html',
  styleUrl: './edit-image-profile-model.component.css',
})
  
  
export class EditImageProfileModelComponent {

  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditImageProfileModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string },
    private managerService: ManagerService
  ) {
    this.imageUrl = data.imageUrl;
  }

  @Output() imageUpdated = new EventEmitter<void>() //Event emmiter

  id = localStorage.getItem('id');

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile); // Safe because selectedFile is guaranteed to be a File
    }
  }

  updateImage() {
    if (!this.selectedFile) {
      alert('Please select an image first!');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    if (!this.id) {
      alert('User ID not found. Please log in again.');
      this.isLoading = false;
      return;
    }
     
    //console.log('Id :', this.id, ' Image : ', this.selectedFile as File);
    this.managerService.updateManagerProfImg(this.id, formData).subscribe({
      next: (res) => {
        //console.log('Updated image response:', res);
        this.imageUpdated.emit() //emit an event to notify parent to refresh 
        // Refresh image preview after update
        this.imageUrl = URL.createObjectURL(this.selectedFile as File); // Safe because selectedFile is not null
        
      },
      error: (error) => {
       // console.error('Error updating image:', error);
        alert('Failed to update image.');
      },
      complete: () => {
        this.isLoading = false;
        this.dialogRef.close(); // Close modal after update
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}