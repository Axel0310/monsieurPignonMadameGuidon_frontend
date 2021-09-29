import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  itemType: string;
}

@Component({
  selector: 'app-item-creation-dialog',
  templateUrl: './item-creation-dialog.component.html',
  styleUrls: ['./item-creation-dialog.component.scss']
})
export class ItemCreationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ItemCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
  }

  onCreateClick(): void {
    this.dialogRef.close();
  }

}
