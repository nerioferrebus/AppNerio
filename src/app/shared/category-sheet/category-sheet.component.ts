import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-category-sheet',
  templateUrl: './category-sheet.component.html',
  styleUrls: ['./category-sheet.component.scss'],
  standalone: false,
})
export class CategorySheetComponent implements OnInit {
  @Input() selected: string = 'general';
  categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  constructor(private modalCtrl: ModalController) {}
  pick(cat: string) {
   this.modalCtrl.dismiss(cat, 'selected'); // envías el valor
  }
  close() {
  this.modalCtrl.dismiss(null, 'cancel');  // cierras sin valor
  }
  ngOnInit() {}
}
