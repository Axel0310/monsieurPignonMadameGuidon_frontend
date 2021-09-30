import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';

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

  constructor(
    public dialogRef: MatDialogRef<ItemCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clientService: ClientService
    ) {

      this.selectedClient = this.clientService.currentClient$;
    }

  ngOnInit(): void {
  }

  onCreateClick(): void {
    this.dialogRef.close();
  }

}
