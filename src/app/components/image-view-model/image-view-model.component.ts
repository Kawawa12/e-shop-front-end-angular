import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-view-model',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './image-view-model.component.html',
  styleUrl: './image-view-model.component.css',
  animations: [
    trigger('dialogAnimation', [
      state('void', style({ transform: 'scale(0)', opacity: 0 })),
      state('*', style({ transform: 'scale(1)', opacity: 1 })),
      transition('void => *', animate('300ms ease-out')),
      transition('* => void', animate('200ms ease-in'))
    ])
  ]
})

export class ImageViewModelComponent {

  constructor(private dialogRef: MatDialogRef<ImageViewModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {image : string}) { }
   

}
