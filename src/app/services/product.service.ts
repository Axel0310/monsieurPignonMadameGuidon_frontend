import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = `${environment.API_URL}/products`;

  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);

  constructor(private http: HttpClient, private notifService: NotificationService) {
    this.fetchProducts();
  }

  getProducts(): Observable<Product[]> {
    return this._products.asObservable();
  }

  fetchProducts() {
    this.http
      .get<Product[]>(`${this.API_URL}/all`)
      .subscribe((fetchedProducts) => {
        this._products.next(fetchedProducts);
      });
  }

  createProduct(newProduct: Product) {
    return this.http
      .post<Product>(`${this.API_URL}/create`, {
        ...newProduct
      })
      .pipe(
        tap((createdProduct: Product) => {
          this._products.next([createdProduct, ...this._products.value]);
          this.notifService.pushNotification('success', 'Produit créé')
        }),
        catchError(err => {
          this.notifService.pushNotification('failure', 'Le produit n\'a pas été créé.', err.error.message);
          throw err;
        })
      );
  }

  deleteProduct(id: string) {
    return this.http
    .delete<Product>(`${this.API_URL}/${id}`)
    .pipe(
      tap((deletedProduct: Product) => {
        this._products.next([...this._products.value].filter(product => product._id !== deletedProduct._id));
        this.notifService.pushNotification('success', 'Produit supprimé')
      }),
      catchError(err => {
        this.notifService.pushNotification('failure', `Une erreur est survenue. Le produit n\'a pas été supprimé.<br>${err.error.message && err.error.message}`);
        throw err;
      })
    );
  }
}
