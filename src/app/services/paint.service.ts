import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paint } from '../interfaces/paint';
import { AuthenticationService } from './authentication.service';
import { ClientService } from './client.service';
import { GenericItemService } from './genericItem.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class PaintService extends GenericItemService {
  
  constructor(
    http: HttpClient,
    authService: AuthenticationService,
    clientService: ClientService,
    notifService: NotificationService,
  ) {
    const paintUrl: string = 'paints';
    super(
      http,
      authService,
      clientService,
      notifService,
      paintUrl,
      )
  }

  getPaints(): Observable<Paint[]> {
    return super.getItems() as Observable<Paint[]>;
  }

  createPaint(): Observable<Paint> {
    return super.createItem() as Observable<Paint>;
  }

  updatePaint(id: string, updates: object): void {
    super.updateItem(id, updates)
  }

  searchPaints(query: string): void {
    super.searchItems(query);
  }

  fetchPaintsHistory(): void {
    super.fetchItemsHistory();
  }

  setPaintBeingCreated(paint: Paint) {
    super.setItemBeingCreated(paint);
  }

  getPaintBeingCreated(): Paint | undefined {
    return super.getItemBeingCreated() as Paint;
  }
}
