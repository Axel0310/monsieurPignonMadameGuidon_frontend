import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Repair } from '../interfaces/repair';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../interfaces/item';
import { Order } from '../interfaces/order';
import { Paint } from '../interfaces/paint';

@Injectable({
  providedIn: 'root'
})
export class RepairService {

  // private _repairs : BehaviorSubject<Repair[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  fetchOngoingRepairs(): void {
    // this.http.get<Observable<Repair[] | Order[] | Paint[]>(`${environment.API_URL}/`)
  }

}
