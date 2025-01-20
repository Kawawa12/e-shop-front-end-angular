import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-place-order',
  standalone:true,
  imports: [],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {

  constructor(private authService:AuthService){}
  
    logout(){
      this.authService.logoutToHome();
      console.log('You loged out.')

    }

}
