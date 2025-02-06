import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manager-layout',
  standalone:true,
  imports: [RouterLink,RouterOutlet],
  templateUrl: './manager-layout.component.html',
  styleUrl: './manager-layout.component.css'
})
export class ManagerLayoutComponent {

  isSidebarOpen = false;
  
    constructor(private authService:AuthService,private router:Router) {
       
    }
  
    ngOnInit(): void {
       
    }
  
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  
    closeSidebar() {
      this.isSidebarOpen = false;
    }
  
    logout() {
      this.authService.logoutToHome();
    }

}
