import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
export interface Country { name: string; flag: string; iso2?: string; iso3?: string; }

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private ALL_URL = 'https://countriesnow.space/api/v0.1/countries/flag/unicode'; // <- SIN /q

  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.post<any>(this.ALL_URL, {}).pipe(
      map(res => (res?.data ?? []).map((it: any) => ({
        name: it.name,
        flag: it.flag ?? it.unicodeFlag ?? '',
        iso2: it.iso2, iso3: it.iso3
      })).sort((a: Country,b: Country)=>a.name.localeCompare(b.name,'es'))),
      catchError(err => {
        console.error('Countries API falló:', err);
        // Fallback para no romper la UI
        return of<Country[]>([
          { name: 'Colombia',  flag: '🇨🇴' },
          { name: 'Venezuela', flag: '🇻🇪' },
          { name: 'Perú',      flag: '🇵🇪' },
          { name: 'México',    flag: '🇲🇽' },
          { name: 'España',    flag: '🇪🇸' },
        ]);
      })
    );
  }
}
