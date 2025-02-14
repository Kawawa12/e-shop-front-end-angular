import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignIn } from '../model';
import { AuthService } from '../services/auth.service';
import { UserWelcomeModalComponent } from '../user-welcome-modal/user-welcome-modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { state } from '@angular/animations';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  isSubmitting = false; // State to track API call

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.signInForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const signInData: SignIn = this.signInForm.value;
      this.isSubmitting = true;
  
      this.authService.signIn(signInData).subscribe({
        next: (response) => {
          // Check if the response status is 200 (successful login)
          if (response.status === 200) {
            // Store user data and token (optional, depending on your use case)
            localStorage.setItem('role', response.role);
            localStorage.setItem('jwtToken', response.jwtToken);
  
            // Handle role-based redirection
            if (response.role === 'USER') {
              this.openUserWelcomeModal();
            } else if (response.role === 'ADMIN') {
              this.authService.goToAdmin();
            } else if (response.role === 'MANAGER') {
              this.authService.goToManager();
            }
          } else if (response.status === 403) {
             // If user is inactive or there's an error, display a message
             Swal.fire({
              title: 'Error!',
              icon: 'error',
              text: response.message || 'Login failed! Please check your credentials.',
              confirmButtonText: 'Close',
              confirmButtonColor: '#3085d6',
            });
  
            this.authService.goToLoginPage();
          }
          else {
            // If user is inactive or there's an error, display a message
            Swal.fire({
              title: 'Error!',
              icon: 'error',
              text: response.message || 'Login failed! Please check your credentials.',
              confirmButtonText: 'Close',
              confirmButtonColor: '#3085d6',
            });
  
            // Redirect to login page if inactive or error occurs
            this.authService.goToLoginPage();
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          // Handle other errors such as network issues or server errors
          console.error('Login failed', error);
          this.isSubmitting = false;
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
  
  openUserWelcomeModal(): void {
    const dialogRef = this.dialog.open(UserWelcomeModalComponent, {
      width: '400px',
    });

    dialogRef.componentInstance.browseProductsEvent.subscribe(() => {
      this.authService.goToHome();
      dialogRef.close();
    });

    dialogRef.componentInstance.logoutEvent.subscribe(() => {
      this.authService.logoutToHome();
      dialogRef.close();
    });
  }

  goToSignUp() {
    this.authService.goToSignUpPage();
  }

  goHome() {
    this.authService.goToHome();
  }
}
