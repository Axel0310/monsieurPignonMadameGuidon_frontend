import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repair } from '../interfaces/repair';

@Injectable({
  providedIn: 'root',
})
export class RepairService {
  private API_URL = `${environment.API_URL}/repairs`;
  private _ongoingRepairs: BehaviorSubject<Repair[]> = new BehaviorSubject(
    [] as Repair[]
  );
  private _closedRepairs: BehaviorSubject<Repair[]> = new BehaviorSubject(
    [] as Repair[]
  );

  constructor(private http: HttpClient) {}

  getRepairs(status: 'ongoing' | 'closed'): Observable<Repair[]> {
    if (status === 'ongoing' && this._ongoingRepairs.getValue().length === 0) {
      this.fetchRepairs('ongoing');
    } else if (status === 'closed' && this._closedRepairs.getValue().length === 0) {
      this.fetchRepairs('closed');
    }
    return status === 'ongoing'
      ? this._ongoingRepairs.asObservable()
      : this._closedRepairs.asObservable();
  }

  fetchRepairs(status: 'ongoing' | 'closed'): void {
    this.http
      .get<Repair[]>(`${this.API_URL}/status/${status}`)
      .subscribe((fetchedRepairs) => {
        if (status === 'ongoing') {
          this._ongoingRepairs.next(fetchedRepairs);
        } else {
          this._closedRepairs.next(fetchedRepairs);
        }
      });
  }
}
