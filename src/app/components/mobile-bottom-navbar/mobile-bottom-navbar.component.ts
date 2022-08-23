import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';

@Component({
  selector: 'app-mobile-bottom-navbar',
  templateUrl: './mobile-bottom-navbar.component.html',
  styleUrls: ['./mobile-bottom-navbar.component.scss']
})
export class MobileBottomNavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openItemCreationDialog(itemType: string): void {
    const dialogRef = this.dialog.open(ItemCreationDialogComponent, {
      width: '80vw',
      data: { itemType: itemType },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

}
