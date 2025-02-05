import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-model',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password-model.component.html',
  styleUrl: './change-password-model.component.css',
})
export class ChangePasswordModelComponent {
  constructor(private dialogRef: MatDialogRef<ChangePasswordModelComponent>) {}

  passwords = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  showCurrentPassword = false; // Toggle for showing password

  passwordStrength = {
    message: '',
    color: 'bg-gray-300',
    textColor: 'text-gray-600',
    percentage: 0, // Add percentage property
  };

  // Toggle Show Password for Current Password Field
  togglePasswordVisibility() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  checkStrength() {
    const password = this.passwords.newPassword;
    let strength = 0;

    // Define the criteria for password strength
    const criteria = [
      password.length >= 8, // At least 8 characters
      /[A-Z]/.test(password), // Contains uppercase letters
      /[0-9]/.test(password), // Contains numbers
      /[\W_]/.test(password), // Contains special characters
    ];

    // Calculate the strength based on the criteria
    strength = criteria.filter(Boolean).length;

    // Calculate the percentage (each criterion contributes 25%)
    const percentage = (strength / criteria.length) * 100;

    // Update the password strength object
    if (strength === 0) {
      this.passwordStrength = {
        message: '',
        color: 'bg-gray-300',
        textColor: 'text-gray-600',
        percentage: 0,
      };
    } else if (strength === 1) {
      this.passwordStrength = {
        message: 'Weak Password',
        color: 'bg-red-500',
        textColor: 'text-red-500',
        percentage: percentage,
      };
    } else if (strength === 2) {
      this.passwordStrength = {
        message: 'Fair Password',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-500',
        percentage: percentage,
      };
    } else if (strength === 3) {
      this.passwordStrength = {
        message: 'Good Password',
        color: 'bg-green-400',
        textColor: 'text-green-500',
        percentage: percentage,
      };
    } else {
      this.passwordStrength = {
        message: 'Strong Password!',
        color: 'bg-green-600',
        textColor: 'text-green-600',
        percentage: percentage,
      };
    }
  }

  onSubmit() {
    if (this.passwords.newPassword !== this.passwords.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Password changed successfully:', this.passwords);
    alert('Password changed successfully!');
  }

  cancelChange() {
    this.dialogRef.close(null);
  }
}