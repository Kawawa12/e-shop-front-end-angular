import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUp } from '../model';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'], // Fixed typo: `styleUrl` to `styleUrls`
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,private router:Router) {
    // Initialize form group
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const signUpData: SignUp = this.registerForm.value;
      console.log('Form Data:', signUpData);

      // Show loading SweetAlert while processing the request
      Swal.fire({
        title: 'Processing...',
        html: 'Please wait, your request is being processed.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Call the user service to handle sign-up
      this.userService.register(signUpData).subscribe(
        (response) => {
          console.log('Sign-Up Successful:', response);
          this.registerForm.reset();

          // Display success SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'Your account has been created successfully.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        },
        (error) => {
          console.error('Sign-Up Failed:', error);

          // Display error SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'Something went wrong. Please try again.',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      );
    } else {
      console.error('Form is invalid');
      this.markFormControlsAsTouched();

      // Show SweetAlert for invalid form
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please fill out the form correctly before submitting.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  }

  // Marks all form controls as touched to trigger validation
  private markFormControlsAsTouched(): void {
    Object.keys(this.registerForm.controls).forEach((controlName) => {
      const control = this.registerForm.get(controlName);
      control?.markAsTouched();
    });
  }

  // Checks if a control is invalid and has been touched or dirty
  isControlInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  goToSignIn(){
      this.router.navigate(['/sign-in'])
  }
}
