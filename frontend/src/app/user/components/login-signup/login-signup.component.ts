import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/validators/password.validators';
import { IUser } from '../../models/user.interface';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit {
  signupForm!: FormGroup;
  loginForm!: FormGroup;
  // alphanumeric = '^[a-zA-Z0-9]{10}$';
  numeric = /^-?(0|[1-9]\d*)?$/;
  user!: IUser;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') as any)
    this.createSignupForm();
    this.createLoginForm();

  }

  get fs() {
    return this.signupForm.controls;
  }
  get fl() {
    return this.loginForm.controls;
  }

  createSignupForm(){
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          // Validators.pattern(this.alphanumeric),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(40)],
      ],
      phone: ['', [Validators.pattern(this.numeric), Validators.maxLength(40)]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          PasswordValidator.strong,
        ],
      ],
    });
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(40)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          PasswordValidator.strong,
        ],
      ],
    });
  }

  onSubmitLoginForm() {
    // this.router.navigate(['user-profile'])
  }

  onSubmitSignupForm() {
      this.user = {
      username: this.signupForm.controls['username'].value,
      email: this.signupForm.controls['email'].value,
      password: this.signupForm.controls['password'].value,
      phone: this.signupForm.controls['phone'].value,
      isRegistered: true
    }
    localStorage.setItem('user', JSON.stringify(this.user))
  }
}
