import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/common';
import { __values } from 'tslib';

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

  constructor() {

    this.initForm();

   }
  
  ngOnInit() {}

 public onLogin(){
  console.log(this.loginForm.value)
 }


  private initForm(){
     this.email = new FormControl('', [Validators.required, Validators.email]);
         this.password = new FormControl('', [
          Validators.required, 
          Validators.minLength(6),
        Validators.maxLength(12),
          ]);
          this.loginForm = new FormGroup({
            email: this.email,
           password: this.password,
         } );
          

  }

}
