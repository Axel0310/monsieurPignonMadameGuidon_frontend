import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/client';
import { Paint } from '../interfaces/paint';
import { Shop } from '../interfaces/shop';
import { AuthenticationService } from './authentication.service';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root',
})
export class PaintService {
  private API_URL = `${environment.API_URL}/paints`;
 
  private _paintBeingCreated: BehaviorSubject<Paint | undefined> =
  new BehaviorSubject<Paint | undefined>(undefined);

  private _currentShop: Shop | undefined;
  private _currentClient: Client | undefined;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private clientService: ClientService
  ) {
    this._currentShop = this.authService.getLoggedShop().value;
    this.clientService.currentClient$.subscribe(
      (client) => (this._currentClient = client)
    );
  }

  getPaints(status: string): Observable<Paint[]> {
    return this.http.get<Paint[]>(`${this.API_URL}/status/${status}`)
  }

  setPaintBeingCreated(paint: Paint) {
    this._paintBeingCreated.next(paint);
  }

  getPaintBeingCreated(): Paint | undefined {
    return this._paintBeingCreated.value;
  }

  createPaint() {
    return this.http.post<Paint>(`${this.API_URL}/create`, {
      shop: this._currentShop?._id,
      client: this._currentClient?._id,
      ...this._paintBeingCreated.value,
    })
  }
}
