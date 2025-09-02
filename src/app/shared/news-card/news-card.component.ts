import { Component, OnInit,EventEmitter,Input, Output } from '@angular/core';
import { Article } from '../../services/news';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  standalone:false,
})
export class NewsCardComponent  implements OnInit {
  @Input() article!: Article;
  @Output() open = new EventEmitter<Article>();
  constructor() { }

  ngOnInit() {}

}
