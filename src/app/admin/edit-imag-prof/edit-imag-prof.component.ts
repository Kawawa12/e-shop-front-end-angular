import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-imag-prof',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './edit-imag-prof.component.html',
  styleUrl: './edit-imag-prof.component.css'
})
  
export class EditImagProfComponent {

  imageUrl: string | ArrayBuffer | null = null;
    selectedFile: File | null = null;
    isLoading: boolean = false;
  
    constructor(
      public dialogRef: MatDialogRef<EditImagProfComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string },
      private adminService: AdminService
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
      this.adminService.updateAdmnImg(this.id, formData).subscribe({
        next: (res) => {
          //console.log('Updated image response:', res);
          this.imageUpdated.emit() //emit an event to notify parent to refresh 
          // Refresh image preview after update
          this.imageUrl = URL.createObjectURL(this.selectedFile as File); // Safe because selectedFile is not null
          
        },
        error: (error) => {
          console.error('Error updating image:', error);
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
