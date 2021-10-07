import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/client';
import { Repair } from '../interfaces/repair';
import { Shop } from '../interfaces/shop';
import { AuthenticationService } from './authentication.service';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  private API_URL = `${environment.API_URL}/repairs`;

  private repairs: BehaviorSubject<Repair[]> = new BehaviorSubject<Repair[]>(
    []
  );

  private _repairBeingCreated: BehaviorSubject<Repair | undefined> =
    new BehaviorSubject<Repair | undefined>(undefined);

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
    this.fetchRepairs('A faire');
  }

  getRepairs(): Observable<Repair[]> {
    return this.repairs.asObservable();
  }

  fetchRepairs(status: string) {
    this.http
      .get<Repair[]>(`${this.API_URL}/status/${status}`)
      .subscribe((fetchedRepairs) => {
        this.repairs.next(fetchedRepairs);
      });
  }

  setRepairBeingCreated(repair: Repair) {
    this._repairBeingCreated.next(repair);
  }

  getRepairBeingCreated(): Repair | undefined {
    return this._repairBeingCreated.value;
  }

  createRepair() {
    return this.http.post<Repair>(`${this.API_URL}/create`, {
      shop: this._currentShop?._id,
      client: this._currentClient?._id,
      ...this._repairBeingCreated.value,
    });
  }

  updateRepair(id: string, updates: object) {
    this.http
      .patch<Repair>(`${this.API_URL}/${id}`, {...updates})
      .subscribe((updatedRepair) => {
        console.log(updatedRepair);
        this.fetchRepairs(updatedRepair.status);
      });
  }
}
