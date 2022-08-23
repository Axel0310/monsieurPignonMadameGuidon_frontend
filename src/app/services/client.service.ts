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
  private clients$: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>(
    []
  );
  public currentClient$: BehaviorSubject<Client | undefined> = new BehaviorSubject<Client | undefined>(undefined);

  public clientToBeCreated$: BehaviorSubject<Client | undefined> = new BehaviorSubject<Client | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private notifService: NotificationService
  ) {
    this.fetchClients();
  }

  searchClient(name: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.API_URL}/${name}`);
  }

  setCurrentClient(client: Client) {
    this.currentClient$.next(client);
  }

  resetCurrentClient() {
    this.currentClient$.next(undefined);
  }

  setClientToBeCreated(client: Client) {
    this.clientToBeCreated$.next(client);
  }

  resetClientToBeCreated() {
    this.clientToBeCreated$.next(undefined);
  }

  fetchClients() {
    this.http.get<Client[]>(`${this.API_URL}`).subscribe((fetchedClients) => {
      this.clients$.next(fetchedClients);
    });
  }

  getClients(): Observable<Client[]> {
    return this.clients$.asObservable();
  }

  createClient(): Observable<Client> {
    return this.http.post<Client>(`${this.API_URL}/create`, { ...this.clientToBeCreated$.value }).pipe(
      tap((createdClient) => {
        this.notifService.pushNotification('success', 'Le client a été créé');
        this.addClientToList(createdClient);
        this.currentClient$.next(createdClient)
      }),
      catchError((err) => {
        this.notifService.pushNotification(
          'failure',
          "Une erreur est survenue. Le client n'a pas été créé"
        );
        throw err;
      })
    );
  }

  deleteClient(id: string): Observable<Client> {
    return this.http.delete<Client>(`${this.API_URL}/${id}`).pipe(
      tap((deletedClient) => {
        this.notifService.pushNotification(
          'success',
          'Le client a été supprimé'
        );
        this.removeClientFromList(deletedClient);
      }),
      catchError((err) => {
        this.notifService.pushNotification(
          'failure',
          "Une erreur est survenue. Le client n'a pas été supprimé"
        );
        throw err;
      })
    );
  }

  updateClient(id: string, updates: object): Observable<Client> {
    return this.http
      .patch<Client>(`${this.API_URL}/${id}`, { ...updates }).pipe(
        tap((updatedClient) => {
          this.notifService.pushNotification(
            'success',
            'Le client a été mis à jour'
          );
          this.removeClientFromList(updatedClient);
          this.addClientToList(updatedClient);
        }),
        catchError((err) => {
          this.notifService.pushNotification(
            'failure',
            "Une erreur est survenue. Le client n'a pas été mis à jour"
          );
          throw err;
        })
      );
  }

  addClientToList(createdClient: Client) {
    this.clients$.next([...this.clients$.value, createdClient]);
  }

  removeClientFromList(removedClient: Client) {
    const clientList = this.clients$.value;
    const updatedClientList = clientList.filter(client => String(client._id) !== String(removedClient._id))
    this.clients$.next(updatedClientList)
  }
}
