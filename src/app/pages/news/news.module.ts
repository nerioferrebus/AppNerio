import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsPageRoutingModule } from './news-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';

import { NewsPage } from './news.page';
import { NewsCardComponent } from 'src/app/shared/news-card/news-card.component';
import { CategorySheetComponent } from 'src/app/shared/category-sheet/category-sheet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsPageRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
