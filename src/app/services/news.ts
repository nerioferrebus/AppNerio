import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Article {
  source: { id: string|null; name: string };
  author?: string;
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

export interface NewsResponse {
  status: 'ok'|'error';
  totalResults: number;
  articles: Article[];
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private base = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

  getTopHeadlines(opts: {
    category?: string;
    country?: string;   // ej: 'us', 'mx', 'co'
    page?: number;
    pageSize?: number;
  }): Observable<NewsResponse> {
    const headers = new HttpHeaders({ 'X-Api-Key': environment.newsApis });
    let params = new HttpParams()
      .set('country', opts.country ?? 'us')
      .set('page', (opts.page ?? 1).toString())
      .set('pageSize', (opts.pageSize ?? 10).toString());
    if (opts.category) params = params.set('category', opts.category);

    return this.http.get<NewsResponse>(`${this.base}/top-headlines`, { headers, params });
  }
}
