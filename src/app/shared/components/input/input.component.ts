import { Component,Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

type InputType = 'text'| 'number' | 'email'| 'password'



@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent  implements OnInit {
@Input() type: InputType='text';
@Input() label: string="";
@Input() placeholder: string="";
@Input() control: FormControl= new FormControl();
isPasswordVisible = false;
  constructor() { }
  
  ngOnInit() {}

  public onType(event:any){
    console.log(event);
  }
}
