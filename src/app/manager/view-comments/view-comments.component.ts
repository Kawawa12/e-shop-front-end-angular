import { Component, OnInit } from '@angular/core';
 

@Component({
  selector: 'app-view-comments',
  imports: [],
  templateUrl: './view-comments.component.html',
  styleUrl: './view-comments.component.css'
})
export class ViewCommentsComponent implements OnInit{

  activeUsers: string = '';

  constructor() {}

  ngOnInit(): void {
    
  }

}
