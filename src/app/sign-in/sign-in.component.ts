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
          const role = localStorage.getItem('role');
          if (role === 'USER') {
            this.openUserWelcomeModal();
          } else if (role === 'ADMIN') {
            this.authService.goToAdmin();
          } else if (role === 'MANAGER') {
            this.authService.goToManager();
          }
          else {
            Swal.fire({
              title: 'Invalid!',
              icon: 'error',
              text: `${response.message}!, Please Enter a valid Credentials `,
              confirmButtonText: 'Close',
              confirmButtonColor: '#3085d6',
            });
            
            this.authService.goToLoginPage();
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          // console.error('Login failed', error);
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
