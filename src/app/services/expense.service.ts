import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Expense } from '../interfaces/expense';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private API_URL = `${environment.API_URL}/expenses`;

  private expenses$: BehaviorSubject<Expense[]> = new BehaviorSubject<
    Expense[]
  >([]);

  constructor(private http: HttpClient, private notifService: NotificationService) {
    this.fetchExpenses();
  }

  getExpenses(): Observable<Expense[]> {
    return this.expenses$.asObservable();
  }

  fetchExpenses() {
    this.http
      .get<Expense[]>(`${this.API_URL}/all`)
      .subscribe((fetchedExpenses) => {
        this.expenses$.next(fetchedExpenses);
      });
  }

  createExpense(newExpense: Expense) {
    return this.http
      .post<Expense>(`${this.API_URL}/create`, {
        ...newExpense
      })
      .pipe(
        tap((createdExpense: Expense) => {
          this.notifService.pushNotification('success', 'Dépense créée')
          this.addExpenseToList(createdExpense);
        }),
        catchError(err => {
          this.notifService.pushNotification('failure', 'La dépense n\'a pas été créée.', err.error.message);
          throw err;
        })
      );
  }

  deleteExpense(id: string) {
    return this.http
    .delete<Expense>(`${this.API_URL}/${id}`)
    .pipe(
      tap((deletedExpense: Expense) => {
        this.notifService.pushNotification('success', 'Dépense supprimée')
        this.removeExpenseFromList(deletedExpense);
      }),
      catchError(err => {
        this.notifService.pushNotification('failure', `Une erreur est survenue. Le dépense n\'a pas été supprimée.<br>${err.error.message && err.error.message}`);
        throw err;
      })
    );
  }

  updateExpense(id: string, updates: object): Observable<Expense> {
    return this.http
      .patch<Expense>(`${this.API_URL}/${id}`, { ...updates }).pipe(
        tap((updatedExpense) => {
          this.notifService.pushNotification(
            'success',
            'La dépense a été mise à jour'
          );
          this.removeExpenseFromList(updatedExpense);
          this.addExpenseToList(updatedExpense);
        }),
        catchError((err) => {
          this.notifService.pushNotification(
            'failure',
            "Une erreur est survenue. La dépense n'a pas été mise à jour"
          );
          throw err;
        })
      );
  }

  addExpenseToList(createdExpense: Expense) {
    this.expenses$.next([...this.expenses$.value, createdExpense]);
  }

  removeExpenseFromList(removedExpense: Expense) {
    const clientList = this.expenses$.value;
    const updatedClientList = clientList.filter(client => String(client._id) !== String(removedExpense._id))
    this.expenses$.next(updatedClientList)
  }
}
