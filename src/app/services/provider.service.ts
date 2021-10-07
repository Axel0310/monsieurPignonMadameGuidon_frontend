import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private API_URL = `${environment.API_URL}/providers`;

  private _providers: BehaviorSubject<Provider[]> = new BehaviorSubject<
    Provider[]
  >([]);

  constructor(private http: HttpClient) {
    this.fetchProviders();
  }

  getProviders(): Observable<Provider[]> {
    return this._providers.asObservable();
  }

  fetchProviders() {
    this.http
      .get<Provider[]>(`${this.API_URL}/all`)
      .subscribe((fetchedProviders) => {
        this._providers.next(fetchedProviders);
      });
  }

  createProvider(name: string) {
    return this.http
      .post<Provider>(`${this.API_URL}/create`, {
        name: name,
      })
      .pipe(
        tap((createdProvider: Provider) => {
          this._providers.next([...this._providers.value, createdProvider]);
        })
      );
  }
}
