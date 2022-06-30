import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repair } from '../interfaces/repair';
import { AuthenticationService } from './authentication.service';
import { ClientService } from './client.service';
import { GenericItemService } from './genericItem.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class RepairService extends GenericItemService {
  
  constructor(
    http: HttpClient,
    authService: AuthenticationService,
    clientService: ClientService,
    notifService: NotificationService,
  ) {
    const repairUrl: string = 'repairs';
    super(
      http,
      authService,
      clientService,
      notifService,
      repairUrl,
      )
  }

  getRepairs(): Observable<Repair[]> {
    return super.getItems() as Observable<Repair[]>;
  }

  createRepair(): Observable<Repair> {
    return super.createItem() as Observable<Repair>;
  }

  updateRepair(id: string, updates: object): void {
    super.updateItem(id, updates)
  }

  searchRepairs(query: string): void {
    super.searchItems(query);
  }

  fetchRepairsHistory(): void {
    super.fetchItemsHistory();
  }

  setRepairBeingCreated(repair: Repair) {
    super.setItemBeingCreated(repair);
  }

  getRepairBeingCreated(): Repair | undefined {
    return super.getItemBeingCreated() as Repair;
  }
}
