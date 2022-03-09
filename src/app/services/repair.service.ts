import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  private repairs$: BehaviorSubject<Repair[]> = new BehaviorSubject<Repair[]>(
    []
  );

  private repairsHistory$: BehaviorSubject<Repair[]> = new BehaviorSubject<
    Repair[]
  >([]);

  private searchedRepairs$: BehaviorSubject<Repair[]> = new BehaviorSubject<
    Repair[]
  >([]);

  private _repairBeingCreated: BehaviorSubject<Repair | undefined> =
    new BehaviorSubject<Repair | undefined>(undefined);

  private _currentShop: Shop | undefined;
  private _currentClient: Client | undefined;

  private historyIndex: number = 0;
  private canLoadMoreHistory$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  private searchQuery: string = '';

  private selectedState$: BehaviorSubject<'ongoing' | 'closed'> =
    new BehaviorSubject<'ongoing' | 'closed'>('ongoing');
  private filteredStatus$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private clientService: ClientService
  ) {
    this._currentShop = this.authService.getLoggedShop().value;
    this.clientService.currentClient$.subscribe(
      (client) => (this._currentClient = client)
    );
    this.fetchRepairsOngoing();
    this.fetchRepairsHistory();
  }

  getRepairs(): Observable<Repair[]> {
    return combineLatest([
      this.repairs$,
      this.repairsHistory$,
      this.selectedState$,
      this.filteredStatus$,
      this.searchedRepairs$,
    ]).pipe(
      map(
        ([
          repairs,
          repairsHistory,
          currentState,
          currentStatusFiltered,
          searchedRepairs,
        ]) => {
          if (this.searchQuery !== '') {
            return searchedRepairs;
          } else if (currentState === 'ongoing') {
            return repairs.filter(
              (repair) => !currentStatusFiltered.includes(repair.status)
            );
          } else {
            return repairsHistory;
          }
        }
      )
    );
  }

  setFilteredState(state: 'ongoing' | 'closed') {
    this.selectedState$.next(state);
  }

  getSelectedState() {
    return this.selectedState$.asObservable();
  }

  getFilteredStatus() {
    return this.filteredStatus$.asObservable();
  }

  getCanLoadMoreHistory() {
    return this.canLoadMoreHistory$.asObservable();
  }

  updateStatusFilter(status: string): void {
    let statusFilter = this.filteredStatus$.value;
    if (statusFilter.includes(status)) {
      statusFilter = statusFilter.filter(
        (currentStatus) => currentStatus !== status
      );
    } else {
      statusFilter.push(status);
    }
    this.filteredStatus$.next(statusFilter);
  }

  fetchRepairsOngoing() {
    this.http
      .get<Repair[]>(`${this.API_URL}/status/ongoing`)
      .subscribe((fetchedRepairs) => {
        this.repairs$.next(fetchedRepairs);
      });
  }

  fetchRepairsHistory() {
    if (this.canLoadMoreHistory$) {
      this.http
        .get<Repair[]>(`${this.API_URL}/status/closed/${this.historyIndex}`)
        .subscribe((fetchedRepairsHistory) => {
          if (fetchedRepairsHistory.length > 0) {
            this.repairsHistory$.next([
              ...this.repairsHistory$.value,
              ...fetchedRepairsHistory,
            ]);
          }
          //value to be aligned with backend one
          if (fetchedRepairsHistory.length < 1) {
            this.canLoadMoreHistory$.next(false);
          }
        });
      this.historyIndex++;
    }
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
      .patch<Repair>(`${this.API_URL}/${id}`, { ...updates })
      .subscribe((updatedRepair) => {
        console.log(updatedRepair);
      });
  }

  searchRepairs(query: string) {
    this.searchQuery = query;
    if (this.searchQuery !== '') {
      this.http
        .get<Repair[]>(`${this.API_URL}/search/${this.searchQuery}`)
        .subscribe((fetchedRepairs) => {
          console.log(fetchedRepairs);
          this.searchedRepairs$.next(fetchedRepairs);
        });
    } else {
      this.searchedRepairs$.next([]);
    }
  }
}
