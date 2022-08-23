import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ItemCreationDialogComponent } from '../item-creation-dialog/item-creation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminValidationDialogComponent } from '../admin-validation-dialog/admin-validation-dialog.component';
import { RepairService } from 'src/app/services/repair.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {

  onLogout() {
    this.authService.logout().subscribe((outcome) => {
      if (outcome.message === 'Succesfully disconnected.') {
        this.router.navigate(['login']);
      }
    });
  }

  constructor(
    private authService: AuthenticationService,
    public router: Router,
    private repairService: RepairService,
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

  navigateToParameters(): void {
    if(this.authService.isAdminEnabled) {
      this.router.navigate(['/parametres']);
    } else {
      this.openAdminValidationDialog();
    }
  }

  openAdminValidationDialog(): void {
    const dialogRef = this.dialog.open(AdminValidationDialogComponent, {
      width: '80vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  navigateToToDoRepairsOverview() {
    this.repairService.setStatusFilter(['Fait', 'Client notifié']);
    if(this.router.url !== '/reparations') {
      this.router.navigate(['/reparations']);
    }
  }

  navigateToAllRepairsOverview() {
    this.repairService.setStatusFilter([]);
    if(this.router.url !== '/reparations') {
      this.router.navigate(['/reparations']);
    }
  }
}
