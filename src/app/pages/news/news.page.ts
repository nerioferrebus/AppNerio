import { Component, OnInit } from '@angular/core';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { NewsService, Article } from '../../services/news';
import { CategorySheetComponent } from '../../shared/category-sheet/category-sheet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone:false,
})
export class NewsPage implements OnInit {
  articles: Article[] = [];
  category = 'general';
  page = 1;
  loading = false;
  country = 'us';

  constructor(
    private news: NewsService,
    private modal: ModalController,
    private router: Router
  ) {}

  ngOnInit() { this.reload(); }

  async changeCategory() {
    const m = await this.modal.create({
      component: CategorySheetComponent,
      breakpoints: [0, 0.4, 0.75],
      initialBreakpoint: 0.4,
      componentProps: { selected: this.category }
    });
    await m.present();
    const { data } = await m.onDidDismiss();
    if (data) {
      this.category = data;
      this.reload(true);
    }
  }

  reload(reset = false) {
    if (reset) { this.page = 1; this.articles = []; }
    this.load();
  }

  load(event?: any) {
    if (this.loading) return;
    this.loading = true;
    this.news.getTopHeadlines({
      category: this.category,
      country: this.country,
      page: this.page,
      pageSize: 10
    }).subscribe({
      next: (res) => {
        this.articles = [...this.articles, ...res.articles];
        this.page++;
      },
      complete: () => {
        this.loading = false;
        event?.target?.complete?.();
      },
      error: () => {
        this.loading = false;
        event?.target?.complete?.();
      }
    });
  }

  openArticle(a: Article) {
    this.router.navigate(['/article'], { state: { article: a } });
  }

  doRefresh(ev: any) {
    this.page = 1; this.articles = [];
    this.load(ev);
  }
}
