import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shop } from '../interfaces/shop';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  updatePassword(newPassword: string, adminPassword: string): Observable<Shop> {
    return this.http.patch<Shop>(`${this.API_URL}/shops/password`, { updatedPassword: newPassword, adminPassword })
  }

  updateAdminPassword(oldAdminPassword: string, newAdminPassword: string): Observable<Shop> {
    return this.http.patch<Shop>(`${this.API_URL}/shops/password`, { updatedAdminPassword: newAdminPassword, adminPassword: oldAdminPassword })
  }
}