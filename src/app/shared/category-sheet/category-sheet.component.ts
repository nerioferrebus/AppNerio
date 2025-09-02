import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category-sheet',
  templateUrl: './category-sheet.component.html',
  styleUrls: ['./category-sheet.component.scss'],
  standalone: false,
})
export class CategorySheetComponent implements OnInit {
  @Input() selected: string = 'general';
  categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  constructor(private modalCtrl: ModalController, private router: Router) {}
  pick(cat: string) {
   this.modalCtrl.dismiss(cat, 'selected'); // envías el valor
  }
  close() {
  this.modalCtrl.dismiss(null, 'cancel');  // cierras sin valor
  }
   async goProfile() {
    // Cierra la hoja antes de navegar
    await this.modalCtrl.dismiss();
    this.router.navigate(['/profile']);
  }
  ngOnInit() {}
}
