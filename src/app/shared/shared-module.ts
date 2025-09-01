import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules =[IonicModule,ReactiveFormsModule,FormsModule]
const components =[InputComponent]

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    IonicModule,
      ...modules
  ],
  exports:[...modules, ...components],
})
export class SharedModule { }
