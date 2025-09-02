import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsCardComponent } from './news-card/news-card.component';
import { CategorySheetComponent } from './category-sheet/category-sheet.component';

const modules =[IonicModule,ReactiveFormsModule,FormsModule, CommonModule]
const components =[InputComponent,]

@NgModule({
  declarations: [InputComponent, NewsCardComponent, CategorySheetComponent],
  imports: [
    CommonModule,
    IonicModule,
      ...modules
  ],
  exports:[...modules, ...components, NewsCardComponent, CommonModule],
})
export class SharedModule { }
