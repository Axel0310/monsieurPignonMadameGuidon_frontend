import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { ClientUpdateDialogComponent } from '../client-update-dialog/client-update-dialog.component';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent {
  @Input() client!: Client;
  @Output() updateItemClientEvent: EventEmitter<{client: String}> = new EventEmitter<{client: String}>();

  constructor(public dialog: MatDialog, private clientService: ClientService) {}

  openEditClientDialog(): void {
    const dialogRef = this.dialog.open(ClientUpdateDialogComponent, {
      width: '80vw',
      data: { updateClient: this.updateClient },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });

    dialogRef.componentInstance.validateEvent.subscribe(() => {
      this.updateClient();
    })
  }

  updateClient() {
    const newClient: Client | undefined = this.clientService.currentClient$.value;
    if(newClient)
    this.updateItemClientEvent.emit({ client: newClient._id})
  }
}
