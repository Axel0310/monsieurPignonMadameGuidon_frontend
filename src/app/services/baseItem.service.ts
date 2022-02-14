// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { Client } from '../interfaces/client';
// import { Repair } from '../interfaces/repair';
// import { Shop } from '../interfaces/shop';
// import { AuthenticationService } from './authentication.service';
// import { ClientService } from './client.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class BaseItemService {
//   private BASE_API_URL = environment.BASE_API_URL;
//   private ITEM_URL;

//   private ongoing$: BehaviorSubject<Repair[]> = new BehaviorSubject<Repair[]>([]);

//   private closed$: BehaviorSubject<Repair[]> = new BehaviorSubject<Repair[]>([]);

//   private searchResults$: BehaviorSubject<Repair[]> = new BehaviorSubject<Repair[]>([]);

//   private currentShop: Shop | undefined;
//   private currentClient: Client | undefined;

//   private historyIndex: number = 0;

//   private searchQuery: string = '';

//   private _selectedState$: BehaviorSubject<'ongoing' | 'closed'> = new BehaviorSubject<'ongoing' | 'closed'>('ongoing');
//   private _filteredStatus$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

//   constructor(
//     itemUrl: string,
//     private http: HttpClient,
//     private authService: AuthenticationService,
//     private clientService: ClientService
//   ) {
//     this.ITEM_URL = itemUrl;
//     this.currentShop = this.authService.getLoggedShop().value;
//     this.clientService.currentClient$.subscribe(
//       (client) => (this.currentClient = client)
//     );
//     this.fetchOngoing();
//     this.fetchClosed();
//   }

//   getRepairs(): Observable<Repair[]> {
//     return combineLatest([this.repairs$, this.repairsHistory$, this.selectedState$, this.filteredStatus$, this.searchedRepairs$]).pipe(
//       map(([repairs, repairsHistory, currentState, currentStatusFiltered, searchedRepairs]) => {
//         if(this.searchQuery !== '') {
//           return searchedRepairs;
//         } else if(currentState === 'ongoing') {
//           return repairs.filter(repair => !currentStatusFiltered.includes(repair.status))
//         } else {
//           return repairsHistory;
//         }
//       })
//     )
//   }

//   setFilteredState(state: 'ongoing' | 'closed') {
//     this._selectedState$.next(state)
//   }

//   getSelectedState() {
//     return this._selectedState$.asObservable();
//   }

//   getFilteredStatus() {
//     return this._filteredStatus$.asObservable();
//   }

//   updateStatusFilter(status: string): void {
//     let statusFilter = this._filteredStatus$.value;
//     if(statusFilter.includes(status)) {
//       statusFilter = statusFilter.filter(currentStatus => currentStatus !== status)
//     } else {
//       statusFilter.push(status)
//     }
//     this._filteredStatus$.next(statusFilter);
//   }

//   fetchOngoing() {
//     this.http
//       .get<Repair[]>(`${this.BASE_API_URL}/${this.ITEM_URL}/status/ongoing`)
//       .subscribe((fetchedRepairs) => {
//         this.repairs$.next(fetchedRepairs);
//       });
//   }

//   fetchRepairsHistory() {
//     this.http
//       .get<Repair[]>(`${this.BASE_API_URL}/${this.ITEM_URL}/status/closed/${this.historyIndex}`)
//       .subscribe((fetchedRepairsHistory) => {
//         this.repairsHistory$.next([...this.repairsHistory$.value, ...fetchedRepairsHistory]);
//       });
//     this.historyIndex++;
//   }

//   setRepairBeingCreated(repair: Repair) {
//     this.repairBeingCreated.next(repair);
//   }

//   getRepairBeingCreated(): Repair | undefined {
//     return this.repairBeingCreated.value;
//   }

//   createRepair() {
//     return this.http.post<Repair>(`${this.BASE_API_URL}/${this.ITEM_URL}/create`, {
//       shop: this.currentShop?._id,
//       client: this.currentClient?._id,
//       ...this.repairBeingCreated.value,
//     });
//   }

//   updateRepair(id: string, updates: object) {
//     this.http
//       .patch<Repair>(`${this.BASE_API_URL}/${this.ITEM_URL}/${id}`, {...updates})
//       .subscribe((updatedRepair) => {
//         console.log(updatedRepair);
//       });
//   }

//   searchRepairs(query: string) {
//     this.searchQuery = query;
//     if(this.searchQuery !== '') {
//       this.http
//       .get<Repair[]>(`${this.BASE_API_URL}/${this.ITEM_URL}/search/${this.searchQuery}`)
//       .subscribe((fetchedRepairs) => {
//         console.log(fetchedRepairs)
//         this.searchedRepairs$.next(fetchedRepairs);
//       });
//     }
//   }
// }
