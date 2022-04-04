import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ProviderService } from 'src/app/services/provider.service';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/interfaces/provider';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {

  @Output() isFormValid = new EventEmitter<boolean>();

  newOrderForm = this.fb.group({
    products: this.fb.array([
      this.fb.group({
        name: ['', [Validators.required]],
        quantity: [1, [Validators.required]],
        price: [0, [Validators.required]],
        provider: ['', [Validators.required]],
      }),
    ]),
    status: ['A commander', [Validators.required]],
    deliveryDate: [new Date(), [Validators.required]],
    billRef: ['', [Validators.required]],
    comment: [''],
    commercialOpportunity: [''],
  });

  products = this.newOrderForm.get('products') as FormArray;

  minDate: Date;

  faTrashAlt = faTrashAlt;

  totalPrice: number = 0;

  public providersList: Observable<Provider[]>;

  constructor(private fb: FormBuilder, private orderService: OrderService, private providerService: ProviderService) { 
    this.minDate = new Date();
    this.providersList = this.providerService.getProviders();
  }

  addProduct() {
    const product = this.fb.group({
      name: ['', [Validators.required]],
      quantity: [1, [Validators.required]],
      price: [0, [Validators.required]],
      provider: ['60b355dbaa984223d8da3d23', [Validators.required]],
    })
    this.products.push(product);
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
    this.updateTotalPrice()
  }

  onOrderFormChange() {
    this.orderService.setOrderBeingCreated(this.newOrderForm.value);
    this.isFormValid.emit(this.newOrderForm.valid);
  }

  updateTotalPrice() {
    this.totalPrice = this.products.value.reduce((total: number, product: Product) => total + product.price * product.quantity, 0);
  }
}
