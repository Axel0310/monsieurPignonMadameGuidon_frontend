import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Shop } from '../interfaces/shop';
import { handleError } from '../helpers/handleError';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private API_URL = environment.API_URL;
  private loggedShop$ = new BehaviorSubject<Shop | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router) {}

  signin(identifier: string, password: string): Observable<Shop> {
    return this.http
      .post<Shop>(`${this.API_URL}/auth/signin`, { identifier, password })
      .pipe(
        tap(
          (shop) => (this.loggedShop$.next(shop), this.router.navigate(['/']))
        ),
        catchError(handleError)
      );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.API_URL}/auth/logout`).pipe(
      tap(() => this.loggedShop$.next(undefined)),
      catchError(handleError)
    );
  }

  isLoggedIn(): Observable<boolean> {
    console.log('loggedin => ', this.loggedShop$.value);
    return this.getLoggedShop().pipe(map((shop) => !!shop));
  }

  getLoggedShop(): BehaviorSubject<Shop | undefined> {
    if (this.loggedShop$.value === undefined) {
      this.http
        .get<Shop>(`${this.API_URL}/auth/isLoggedIn`)
        .subscribe((shop) => {
          this.loggedShop$.next(shop)
        });
    }
    return this.loggedShop$;
  }
}
