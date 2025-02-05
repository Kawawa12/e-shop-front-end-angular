import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-welcome-modal',
  standalone:true,
  imports: [],
  templateUrl: './user-welcome-modal.component.html',
  styleUrl: './user-welcome-modal.component.css'
})
export class UserWelcomeModalComponent {

 @Output() browseProductsEvent = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();

  browseProducts() {
    this.browseProductsEvent.emit();
  }

  logout() {
    this.logoutEvent.emit();
  }

}
