import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { Provider } from 'src/app/interfaces/provider';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit, OnDestroy, AfterViewInit {

  public products$: Observable<Product[]>;
  public providers$: Observable<Provider[]>;

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(1, Validators.required),
    reference: new FormControl('', Validators.required),
    provider: new FormControl('', Validators.required),
  });

  private subs: Subscription[] = []

  public dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  public displayedColumns: string[] = ['actions', 'name', 'price', 'reference', 'provider'];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productsService: ProductService, private providerService: ProviderService) {
    this.products$ = this.productsService.getProducts();
    this.providers$ = this.providerService.getProviders();
  }

  ngOnInit(): void {
    this.subs.push(this.products$.subscribe(products => {
      this.dataSource.data = products;
    }))
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (product: Product, property: string) => {
      switch (property) {
        case 'name':
          return product.name;
        case 'price':
          return product.price;
        case 'reference':
          return product.reference;
        case 'provider':
          return product.provider.name;
        default :
          return product.name;
      }
    };
  }

  onSubmit() {
    this.productsService.createProduct(this.productForm.value).subscribe(createdProduct => {
      if(createdProduct) this.productForm.reset({
        name: '',
        price: 0,
        reference: '',
        provider: ''
      });
    });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe()
    })
  }

}
