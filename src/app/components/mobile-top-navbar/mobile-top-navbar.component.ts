import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AdminValidationDialogComponent } from '../admin-validation-dialog/admin-validation-dialog.component';

@Component({
  selector: 'app-mobile-top-navbar',
  templateUrl: './mobile-top-navbar.component.html',
  styleUrls: ['./mobile-top-navbar.component.scss']
})

export class MobileTopNavbarComponent {

  constructor(
    private authService: AuthenticationService,
    public router: Router,
    public dialog: MatDialog,
  ) {}

  onLogout() {
    this.authService.logout().subscribe((outcome) => {
      if (outcome.message === 'Succesfully disconnected.') {
        this.router.navigate(['login']);
      }
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

}
