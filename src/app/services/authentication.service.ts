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

  constructor(private http: HttpClient, private router: Router, private notifService: NotificationService) {
    this.loadShopFromLocalStorage();
  }



  signin(identifier: string, password: string): Observable<Shop> {
    return this.http
      .post<Shop>(`${this.API_URL}/auth/signin`, { identifier, password })
      .pipe(
        tap(
          shop => {
            this.loggedShop$.next(shop);
            localStorage.setItem('loggedShop', JSON.stringify(shop));
            this.router.navigate(['/reparations']);
            this.notifService.pushNotification('success', 'Vous êtes connecté');
          }
        ),
        catchError((err) => {
          this.notifService.pushNotification(
            'failure',
            "Echec de connexion",
            err.error.message
          );
          throw err;
        })
      );
  }

  logout(): Observable<any> {
    return this.http.get(`${this.API_URL}/auth/logout`).pipe(
      tap(() => {
        this.loggedShop$.next(undefined);
        localStorage.removeItem('loggedShop')
      }),
      catchError(handleError)
    );
  }

  isLoggedIn(): Observable<boolean> {
    this.checkSessionCookie();
    return this.loggedShop$.asObservable().pipe(map((shop) => !!shop));
  }

  getLoggedShop(): BehaviorSubject<Shop | undefined> {
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

  loadShopFromLocalStorage() {
    const rawShopFromLocalStorage: string | null = localStorage.getItem('loggedShop');
    const shopFromLocalStorage: Shop | undefined = rawShopFromLocalStorage ? JSON.parse(rawShopFromLocalStorage) : undefined;
    if(shopFromLocalStorage) {
      this.loggedShop$.next(shopFromLocalStorage)
    }
  }

  getSessionCookie(): string | undefined {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = 'connect.sid';
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return undefined;
  }

  checkSessionCookie() {
    const sessionCookie = this.getSessionCookie();
    if(!sessionCookie) {
      localStorage.removeItem('loggedShop');
      this.loggedShop$.next(undefined)
    }
  }
}
