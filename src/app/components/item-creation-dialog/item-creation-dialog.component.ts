import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { Order } from 'src/app/interfaces/order';
import { ClientService } from 'src/app/services/client.service';
import { OrderService } from 'src/app/services/order.service';

export interface DialogData {
  itemType: string;
}

@Component({
  selector: 'app-item-creation-dialog',
  templateUrl: './item-creation-dialog.component.html',
  styleUrls: ['./item-creation-dialog.component.scss']
})
export class ItemCreationDialogComponent implements OnInit {

  public selectedClient: Observable<Client | undefined>;
  
  private _orderBeingCreated: Order | undefined;

  public isFormValid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ItemCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clientService: ClientService,
    private orderService: OrderService
    ) {

      this.selectedClient = this.clientService.currentClient$;
    }

  ngOnInit(): void {
    switch(this.data.itemType) {
      case 'order': this._orderBeingCreated = this.orderService.getOrderBeingCreated();
    }
  }

  onCreateClick(): void {
    if(this.data.itemType === 'order') {
      this._orderBeingCreated = this.orderService.getOrderBeingCreated();
      this.orderService.createOrder().subscribe(createdOrder => {
        if(createdOrder) this.dialogRef.close();
      });
    }
  }

  updateIsFormValid(isFormValid: boolean) {
    this.isFormValid = isFormValid;
  }

}
