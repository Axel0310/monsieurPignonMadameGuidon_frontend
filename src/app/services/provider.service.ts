import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Provider } from '../interfaces/provider';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private API_URL = `${environment.API_URL}/providers`;

  private providers$: BehaviorSubject<Provider[]> = new BehaviorSubject<
    Provider[]
  >([]);

  constructor(private http: HttpClient, private notifService: NotificationService) {
    this.fetchProviders();
  }

  getProviders(): Observable<Provider[]> {
    return this.providers$.asObservable();
  }

  fetchProviders() {
    this.http
      .get<Provider[]>(`${this.API_URL}/all`)
      .subscribe((fetchedProviders) => {
        this.providers$.next(fetchedProviders);
      });
  }

  createProvider(name: string) {
    return this.http
      .post<Provider>(`${this.API_URL}/create`, {
        name: name,
      })
      .pipe(
        tap((createdProvider) => {
          this.notifService.pushNotification('success', 'Le fournisseur a été créé');
          this.addProviderToList(createdProvider);
        }),
        catchError((err) => {
          this.notifService.pushNotification(
            'failure',
            "Une erreur est survenue. Le fournisseur n'a pas été créé"
          );
          throw err;
        })
      );
  }

  deleteProvider(id: string) {
    return this.http
    .delete<Provider>(`${this.API_URL}/${id}`)
    .pipe(
      tap((deletedProvider) => {
        this.notifService.pushNotification(
          'success',
          'Le fournisseur a été supprimé'
        );
        this.removeProviderFromList(deletedProvider);
      }),
      catchError((err) => {
        this.notifService.pushNotification(
          'failure',
          "Une erreur est survenue. Le fournisseur n'a pas été supprimé"
        );
        throw err;
      })
    );
  }

  updateProvider(id: string, updates: object): Observable<Provider> {
    return this.http
      .patch<Provider>(`${this.API_URL}/${id}`, { ...updates }).pipe(
        tap((updatedProvider) => {
          this.notifService.pushNotification(
            'success',
            'Le fournisseur a été mis à jour'
          );
          this.removeProviderFromList(updatedProvider);
          this.addProviderToList(updatedProvider);
        }),
        catchError((err) => {
          this.notifService.pushNotification(
            'failure',
            "Une erreur est survenue. Le fournisseur n'a pas été mis à jour"
          );
          throw err;
        })
      );
  }

   addProviderToList(createdProvider: Provider) {
    this.providers$.next([...this.providers$.value, createdProvider]);
  }

  removeProviderFromList(removedProvider: Provider) {
    const providerList = this.providers$.value;
    const updatedProviderList = providerList.filter(provider => String(provider._id) !== String(removedProvider._id))
    this.providers$.next(updatedProviderList)
  }
}
