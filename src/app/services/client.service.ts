import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/client';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private API_URL = `${environment.API_URL}/clients`;
  private currentClient: BehaviorSubject<Client | undefined> = new BehaviorSubject<Client | undefined>(undefined);
  public currentClient$: Observable<Client | undefined> = this.currentClient.asObservable();

  constructor(private http: HttpClient, private notifService: NotificationService) {}

  searchClient(name: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.API_URL}/${name}`);
  }

  setCurrentClient(client: Client) {
      this.currentClient.next(client);
  }

  resetCurrentClient() {
      this.currentClient.next(undefined);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.API_URL}/create`, { ...client }).pipe(
      tap(createdClient => {
        this.notifService.pushNotification('success', 'Le client a été créé');
      }),
      catchError(err => {
        this.notifService.pushNotification('failure', 'Une erreur est survenue. Le client n\'a pas été créé');
        throw err;
      })
    );
  }

}