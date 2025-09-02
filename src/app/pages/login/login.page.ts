import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import { __values } from 'tslib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
public email!: FormControl;
public password!: FormControl;
public loginForm!: FormGroup;
public r!: FormBuilder;

  constructor(private router: Router) {

    this.initForm();

   }
  
  ngOnInit() {}

  onLogin() {
    console.log('onLogin() disparado');
    console.log(this.loginForm.value);

    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.router.navigate(['/news']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }

  // 👇 Esto debe estar afuera de onLogin()
  public goToRegister() {
    this.router.navigate(['/register']);
  }

  private initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
    ]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
}