import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../services/news';
@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone:false,
})
export class ArticlePage implements OnInit {
article!: Article;
  constructor(private router: Router) { 
const nav = this.router.getCurrentNavigation();
    this.article = (nav?.extras?.state as any)?.article;

  }
 openExternal() {
    if (this.article?.url) window.open(this.article.url, '_blank');
  }
  
  ngOnInit() {
  }

  back() { history.back(); }
}

