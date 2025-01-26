import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignIn } from '../model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone:true,
  imports: 
  [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  isSubmitting = false; // State to track API call

  constructor(private fb: FormBuilder, private authService:AuthService) {}

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
      this.authService.signIn(signInData).subscribe({
        next: (response) => {
          const id = localStorage.getItem('id');
          const role = localStorage.getItem('role');
          console.log('User Id: ', id);
          console.log('User Role: ', role);
          console.log('User JwtToken: ', localStorage.getItem('jwtToken'));

          //check role and navigate correspondingly
          if(role === "USER") {
            this.authService.goToPlaceOrder();
          }else if(role === "ADMIN") {
            this.authService.goToAdmin();
          }else{
            this.authService.goToLoginPage
          }
        }
      })

      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Form Submitted', this.signInForm.value);
        this.signInForm.reset();
        this.isSubmitting = false;
      }, 3000); // 3-second delay
    } else {
      console.log('Form is invalid');
    }
  }


  goToSignUp() {
    this.authService.goToSignUpPage();
  }

  goHome() {
    this.authService.goToHome();
  }


}
