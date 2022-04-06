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

  updatePaint(id: string, updates: object): void {
    super.updateItem(id, updates)
  }

  searchPaints(query: string): void {
    super.searchItems(query);
  }

  fetchPaintsHistory(): void {
    super.fetchItemsHistory();
  }
}
// export class PaintService {
//   private API_URL = `${environment.API_URL}/paints`;

//   private paints: BehaviorSubject<Paint[]> = new BehaviorSubject<Paint[]>([]);

//   private _paintBeingCreated: BehaviorSubject<Paint | undefined> =
//     new BehaviorSubject<Paint | undefined>(undefined);

//   private _currentShop: Shop | undefined;
//   private _currentClient: Client | undefined;

//   constructor(
//     private http: HttpClient,
//     private authService: AuthenticationService,
//     private clientService: ClientService
//   ) {
//     this._currentShop = this.authService.getLoggedShop().value;
//     this.clientService.currentClient$.subscribe(
//       (client) => (this._currentClient = client)
//     );
//     this.fetchPaints('En attente');
//   }

//   getPaints(): Observable<Paint[]> {
//     return this.paints.asObservable();
//   }

//   fetchPaints(status: string) {
//     this.http
//       .get<Paint[]>(`${this.API_URL}/status/${status}`)
//       .subscribe((fetchedPaints) => {
//         this.paints.next(fetchedPaints);
//       });
//   }

//   setPaintBeingCreated(paint: Paint) {
//     this._paintBeingCreated.next(paint);
//   }

//   getPaintBeingCreated(): Paint | undefined {
//     return this._paintBeingCreated.value;
//   }

//   createPaint() {
//     return this.http.post<Paint>(`${this.API_URL}/create`, {
//       shop: this._currentShop?._id,
//       client: this._currentClient?._id,
//       ...this._paintBeingCreated.value,
//     });
//   }

//   updatePaint(id: string, updates: object) {
//     this.http
//       .patch<Paint>(`${this.API_URL}/${id}`, {...updates})
//       .subscribe((updatedPaint) => {
//         console.log(updatedPaint);
//         this.fetchPaints(updatedPaint.status);
//       });
//   }
// }
