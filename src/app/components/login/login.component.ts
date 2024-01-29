import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userData: any[] = [];
  emailRegex =
    '^([0-9a-zA-Z]([-\\. \\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$';

  // loginObj: any = {
  //   email: '',
  //   password: ''
  // };
  loginForm = new FormGroup({
    Email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(this.emailRegex),
    ]),
    Password: new FormControl('', [Validators.required]),
  });

  get control() {
    return this.loginForm.controls;
  }

  constructor() {}

  get Email(): FormControl {
    return this.loginForm.get('Email') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('Password') as FormControl;
  }

  loginSubmitted() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      // Retrieve user data from local storage
      const storedUserData = localStorage.getItem('userData');

      if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        // Check if the email and password match
        if (
          formData.Email === userData.Email &&
          formData.Password === userData.Password
        ) {
          // Authentication successful
          alert('Login successful!');
          this.loginForm.reset();
          // You can redirect to another page here or perform other actions
        } else {
          // Authentication failed
          alert('Invalid email or password');
        }
      } else {
        // No user data found
        alert('User not registered');
      }
    } else {
      // Form is invalid
      alert('Please enter valid email and password');
    }
  }
}
