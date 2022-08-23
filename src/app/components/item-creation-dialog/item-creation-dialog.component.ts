import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { Order } from 'src/app/interfaces/order';
import { Paint } from 'src/app/interfaces/paint';
import { Repair } from 'src/app/interfaces/repair';
import { ClientService } from 'src/app/services/client.service';
import { OrderService } from 'src/app/services/order.service';
import { PaintService } from 'src/app/services/paint.service';
import { RepairService } from 'src/app/services/repair.service';

export interface DialogData {
  itemType: string;
}

@Component({
  selector: 'app-item-creation-dialog',
  templateUrl: './item-creation-dialog.component.html',
  styleUrls: ['./item-creation-dialog.component.scss'],
})
export class ItemCreationDialogComponent implements OnInit {
  public selectedClient$: Observable<Client | undefined>;
  public clientToBeCreated$: Observable<Client | undefined>;

  public _orderBeingCreated: Order | undefined;
  public _paintBeingCreated: Paint | undefined;
  public _repairBeingCreated: Repair | undefined;

  public isItemFormValid: boolean = false;
  public isClientFormValid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ItemCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clientService: ClientService,
    private orderService: OrderService,
    private paintService: PaintService,
    private repairService: RepairService
  ) {
    this.selectedClient$ = this.clientService.currentClient$;
    this.clientToBeCreated$ = this.clientService.clientToBeCreated$;
  }

  ngOnInit(): void {
    switch (this.data.itemType) {
      case 'order':
        this._orderBeingCreated = this.orderService.getOrderBeingCreated();
        break;
      case 'paint':
        this._paintBeingCreated = this.paintService.getPaintBeingCreated();
        break;
      case 'repair':
        this._repairBeingCreated = this.repairService.getRepairBeingCreated();
        break;
    }
  }

  onCreateClick(): void {
    if(this.isClientFormValid) {
      this.clientService.createClient().subscribe(createdClient => {
        if(createdClient) {
          this.createItem()
        }
      })
    } else {
      this.createItem()
    }
  }

  createItem() {
    switch (this.data.itemType) {
      case 'order':
        this._orderBeingCreated = this.orderService.getOrderBeingCreated();
        this.orderService.createOrder().subscribe((createdOrder: Order) => {
          if (createdOrder) this.dialogRef.close();
        });
        break;
      case 'paint':
        this._paintBeingCreated = this.paintService.getPaintBeingCreated();
        this.paintService.createPaint().subscribe((createdPaint: Paint) => {
          if (createdPaint) this.dialogRef.close();
        });
        break;
      case 'repair':
        this._repairBeingCreated = this.repairService.getRepairBeingCreated();
        this.repairService.createRepair().subscribe((createdRepair: Repair) => {
          if (createdRepair) this.dialogRef.close();
        });
        break;
    }
  }

  updateIsItemFormValid(isItemFormValid: boolean) {
    this.isItemFormValid = isItemFormValid;
  }

  updateIsClientFormValid(isNewClientFormValid: boolean) {
    this.isClientFormValid = isNewClientFormValid;
  }

  onClickClose(): void {
    this.dialogRef.close();
  }

}
