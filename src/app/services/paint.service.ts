import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paint } from '../interfaces/paint';

@Injectable({
  providedIn: 'root',
})
export class PaintService {
  private API_URL = `${environment.API_URL}/paints`;
  private _ongoingPaints: BehaviorSubject<Paint[]> = new BehaviorSubject(
    [] as Paint[]
  );
  private _closedPaints: BehaviorSubject<Paint[]> = new BehaviorSubject(
    [] as Paint[]
  );

  constructor(private http: HttpClient) {}

  getPaints(status: 'ongoing' | 'closed'): Observable<Paint[]> {
    if (status === 'ongoing' && this._ongoingPaints.getValue().length === 0) {
      this.fetchPaints('ongoing');
    } else if (status === 'closed' && this._closedPaints.getValue().length === 0) {
      this.fetchPaints('closed');
    }
    return status === 'ongoing'
      ? this._ongoingPaints.asObservable()
      : this._closedPaints.asObservable();
  }

  fetchPaints(status: 'ongoing' | 'closed'): void {
    this.http
      .get<Paint[]>(`${this.API_URL}/status/${status}`)
      .subscribe((fetchedPaints) => {
        if (status === 'ongoing') {
          this._ongoingPaints.next(fetchedPaints);
        } else {
          this._closedPaints.next(fetchedPaints);
        }
      });
  }
}
