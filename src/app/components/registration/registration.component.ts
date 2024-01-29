import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  userData: any[] = [];
  userDataObj: any = {
    name: '',
    email: '',
    password: '',
  };
  emailRegex =
    '^([0-9a-zA-Z]([-\\. \\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$';
  StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  registerForm = new FormGroup({
    Name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('[a-zA-Z].*'),
    ]),
    Email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.pattern(this.emailRegex),
    ]),
    Password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.pattern(this.StrongPasswordRegx),
    ]),
  });

  registerSubmited() {
    const formData = this.registerForm.value;

    // Store the form data in local storage
    localStorage.setItem('userData', JSON.stringify(formData));

    this.userDataObj = {
      name: formData.Name,
      email: formData.Email,
      password: formData.Password,
    };

    // Optionally, you can clear the form after submission
    this.registerForm.reset();
  }

  ngOnInit() {
    const localData = localStorage.getItem('userData');
    if (localData != null) {
      this.userData = JSON.parse(localData);
    }
  }

  // Form = {
  //   name: '',
  //   email: '',
  //   password: ''
  // };

  // loginObj: any = {
  //   email: '',
  //   password: ''
  // };

  get control() {
    return this.registerForm.controls;
  }

  get Name(): FormControl {
    return this.registerForm.get('Name') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('Email') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('Password') as FormControl;
  }
}
