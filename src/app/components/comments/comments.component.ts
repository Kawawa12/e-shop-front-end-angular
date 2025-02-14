import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-comments',
  standalone:true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{

  activeUsers: string = '';
  
    constructor() {}
  
    ngOnInit(): void {
      // this.webSocketService.connect((message: string) => {
      //   this.activeUsers = message;
      // });
    }

}
