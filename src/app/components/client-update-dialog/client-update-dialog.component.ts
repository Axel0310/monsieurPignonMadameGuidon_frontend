import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';

export interface DialogData {
  updateClient: Function;
}

@Component({
  selector: 'app-client-update-dialog',
  templateUrl: './client-update-dialog.component.html',
  styleUrls: ['./client-update-dialog.component.scss'],
})
export class ClientUpdateDialogComponent {
  @Output() validateEvent: EventEmitter<Client> = new EventEmitter<Client>();

  public isClientFormValid: boolean = false;
  public selectedClient$: Observable<Client | undefined>;
  public clientToBeCreated$: Observable<Client | undefined>;

  constructor(
    public dialogRef: MatDialogRef<ClientUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clientService: ClientService,
  ) {
    this.selectedClient$ = this.clientService.currentClient$;
    this.clientToBeCreated$ = this.clientService.clientToBeCreated$;
  }

  onValidate(): void {
    if(this.isClientFormValid) {
      this.clientService.createClient().subscribe(createdClient => {
        if(createdClient) {
          this.validateEvent.emit();
          this.dialogRef.close()
        }
      })
    } else {
      this.validateEvent.emit();
      this.dialogRef.close()
    }
  }

  updateIsClientFormValid(isNewClientFormValid: boolean) {
    this.isClientFormValid = isNewClientFormValid;
  }

  onClickClose(): void {
    this.dialogRef.close();
  }

}
