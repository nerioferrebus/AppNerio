import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Estructura del país
export interface Country {
  name: string;   // Ejemplo: "Colombia"
  flag: string;   // Ejemplo: "🇨🇴"
  iso2?: string;  // Ejemplo: "CO"
  iso3?: string;  // Ejemplo: "COL"
}

// Estructura de la respuesta de la API
interface CountriesNowResponse {
  error: boolean;
  msg: string;
  data: Array<{
    name: string;
    unicodeFlag: string;
    iso2?: string;
    iso3?: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private url = 'https://countriesnow.space/api/v0.1/countries/flag/unicode';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.post<CountriesNowResponse>(this.url, {}).pipe(
      map(res =>
        (res.data ?? []).map(item => ({
          name: item.name,
          flag: item.unicodeFlag,   // 👈 corregido
          iso2: item.iso2,
          iso3: item.iso3
        }))
        .sort((a, b) => a.name.localeCompare(b.name, 'es')) // 👈 corregido
      )
       );
}
}
