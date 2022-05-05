import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Shop } from '../interfaces/shop';
import { handleError } from '../helpers/handleError';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private API_URL = environment.API_URL;
  private loggedShop$ = new BehaviorSubject<Shop | undefined>(undefined);
  private _isAdminEnabled = false;

  constructor(private http: HttpClient, private router: Router, private notifService: NotificationService) {}

  signin(identifier: string, password: string): Observable<Shop> {
    return this.http
      .post<Shop>(`${this.API_URL}/auth/signin`, { identifier, password })
      .pipe(
        tap(
          (shop) => (this.loggedShop$.next(shop), this.router.navigate(['/repairs-overview']))
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

  checkAdminPassword(password: string): Promise<boolean> {

    return this.http.post(`${this.API_URL}/auth/checking`, { inputPassword: password }).toPromise()
    .then(res => {
      this._isAdminEnabled = true;
      setTimeout(() => {
        this.disableAdmin()
      }, 300000)
      return this.isAdminEnabled;
    })
    .catch( err => {
      this.notifService.pushNotification('failure', 'Accès refusé', err.error.message)
      return false
    })
  }

  get isAdminEnabled() {
    return this._isAdminEnabled;
  }

  private disableAdmin() {
    this._isAdminEnabled = false;
  }
}
