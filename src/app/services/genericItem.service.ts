import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/client';
import { Item } from '../interfaces/item';
import { Shop } from '../interfaces/shop';
import { AuthenticationService } from './authentication.service';
import { ClientService } from './client.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class GenericItemService {
  private API_URL: string = environment.API_URL;
  private itemUrl: string;
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private items$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  private itemsHistory$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  private searchedItems$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);

  private itemBeingCreated: BehaviorSubject<Item | undefined> = new BehaviorSubject<Item | undefined>(undefined);

  private _currentShop: Shop | undefined;
  private _currentClient: Client | undefined;

  private historyIndex: number = 0;
  private canLoadMoreHistory$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private searchQuery: string = '';

  private selectedState$: BehaviorSubject<'ongoing' | 'closed'> = new BehaviorSubject<'ongoing' | 'closed'>('ongoing');
  private filteredStatus$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private clientService: ClientService,
    private notifService: NotificationService,
    @Inject('url') private url: string,
  ) {
    this._currentShop = this.authService.getLoggedShop().value;
    this.clientService.currentClient$.subscribe(
      (client) => (this._currentClient = client)
    );
    this.itemUrl = this.url;
    this.fetchOngoingItems();
    this.fetchItemsHistory();
    this.itemsHistory$.subscribe(items => console.log('obs updated => ', items))
  }

  getItems(): Observable<Item[]> {
    return combineLatest([
      this.items$,
      this.itemsHistory$,
      this.selectedState$,
      this.filteredStatus$,
      this.searchedItems$,
    ]).pipe(
      map(
        ([
          items,
          itemsHistory,
          currentState,
          currentStatusFiltered,
          searchedItems,
        ]) => {
          if (this.searchQuery !== '') {
            return searchedItems;
          } else if (currentState === 'ongoing') {
            return items.filter(
              (item: Item) => !currentStatusFiltered.includes(item.status)
            );
          } else {
            return itemsHistory;
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

  fetchOngoingItems() {
    this._isLoading$.next(true);
    this.http
      .get<Item[]>(`${this.API_URL}/${this.itemUrl}/status/ongoing`)
      .subscribe((fetchedItems) => {
        this.items$.next(fetchedItems);
        this._isLoading$.next(false);
      });
  }

  fetchItemsHistory() {
    if (this.canLoadMoreHistory$) {
      this.http
        .get<Item[]>(`${this.API_URL}/${this.itemUrl}/status/closed/${this.historyIndex}`)
        .subscribe((fetchedItemsHistory) => {
          if (fetchedItemsHistory.length > 0) {
            this.itemsHistory$.next([
              ...this.itemsHistory$.value,
              ...fetchedItemsHistory,
            ]);
          }
          //value to be aligned with backend one
          if (fetchedItemsHistory.length < 50) {
            this.canLoadMoreHistory$.next(false);
          }
        });
      this.historyIndex++;
    }
  }

  setItemBeingCreated(item: Item) {
    this.itemBeingCreated.next(item);
  }

  getItemBeingCreated(): Item | undefined {
    return this.itemBeingCreated.value;
  }

  createItem(): Observable<Item> {
    return this.http.post<Item>(`${this.API_URL}/${this.itemUrl}/create`, {
      shop: this._currentShop?._id,
      client: this._currentClient?._id,
      ...this.itemBeingCreated.value,
    }).pipe(
      tap(createdItem => {
        let items: Item[] = this.items$.value;
        items.unshift(createdItem);
        this.items$.next(items)
        this.notifService.pushNotification('success', 'Item créé')
      })
    )
  }

  updateItem(id: string, updates: object) {
    this.http
      .patch<Item>(`${this.API_URL}/${this.itemUrl}/${id}`, { ...updates })
      .subscribe((updatedItem) => {
        this.updateItemsLists(updatedItem)
      });
  }

  updateItemsLists(updatedItem: Item) {
    let items: Item[] = this.items$.value;
    let itemsHistory: Item[] = this.itemsHistory$.value;
    let indexOfUpdatedItem: number; 
    if(this.selectedState$.value === 'ongoing') {
      indexOfUpdatedItem = items.findIndex(item => item._id == updatedItem._id);
      const originalItem = items[indexOfUpdatedItem];
      if(originalItem.status !== 'Livré' && updatedItem.status === 'Livré') {
        items.splice(indexOfUpdatedItem, 1);
        itemsHistory = [updatedItem, ...itemsHistory];
        this.itemsHistory$.next(itemsHistory);
      } else {
        items.splice(indexOfUpdatedItem, 1, updatedItem);
      }
      this.items$.next(items);
    } else {
      indexOfUpdatedItem = itemsHistory.findIndex(item => item._id == updatedItem._id);
      const originalItem = itemsHistory[indexOfUpdatedItem];
      if(originalItem.status === 'Livré' && updatedItem.status !== 'Livré') {
        itemsHistory.splice(indexOfUpdatedItem, 1);
        items = [updatedItem, ...items];
        this.items$.next(items);
      } else {
        itemsHistory.splice(indexOfUpdatedItem, 1, updatedItem);
      }
      console.log(itemsHistory)
      this.itemsHistory$.next(itemsHistory);
    }
    
    this.notifService.pushNotification('success', 'Item mis à jour');
  }

  searchItems(query: string) {
    this.searchQuery = query;
    if (this.searchQuery !== '') {
      this.http
        .get<Item[]>(`${this.API_URL}/${this.itemUrl}/search/${this.searchQuery}`)
        .subscribe((fetchedItems) => {
          this.searchedItems$.next(fetchedItems);
        });
    } else {
      this.searchedItems$.next([]);
    }
  }

  get isLoading$() {
    return this._isLoading$.asObservable();
  }
}
