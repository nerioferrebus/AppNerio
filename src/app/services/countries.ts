import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Countries {
  
}

export interface Country {
  name: string;   // "Colombia"
  flag: string;   // "🇨🇴"
  iso2?: string;  // "CO" (si la API lo trae)
  iso3?: string;  // "COL" (si la API lo trae)
}


interface CountriesNowResponse {
  error: boolean;
  msg: string;
  data: Array<{
    name: string;
    unicodeFlag: string; // o "flag" dependiendo de la API (ver nota abajo)
    iso2?: string;
    iso3?: string;
  }>;
}

export class CountriesService {
  private url = 'https://countriesnow.space/api/v0.1/countries/flag/unicode';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.post<any>(this.url, {}).pipe(   // 👈 POST con body vacío
      map(res =>
        (res.data ?? []).map((item: any) => ({
          name: item.name,
          flag: item.unicodeFlag,
          iso2: item.iso2,
          iso3: item.iso3,
        }))
      )
    );
  }
}
