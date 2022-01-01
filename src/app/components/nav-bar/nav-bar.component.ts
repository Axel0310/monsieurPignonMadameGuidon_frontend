import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {

  onLogout() {
    this.authService.logout().subscribe((outcome) => {
      if (outcome.message === 'Succesfully disconnected.') {
        console.log('ok');
        this.router.navigate(['login']);
      }
    });
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) {}

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
