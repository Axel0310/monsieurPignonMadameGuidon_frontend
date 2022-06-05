import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-validation-dialog',
  templateUrl: './admin-validation-dialog.component.html',
  styleUrls: ['./admin-validation-dialog.component.scss']
})
export class AdminValidationDialogComponent {

  adminPassword = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<AdminValidationDialogComponent>, private authService: AuthenticationService, private router: Router) { }

  async onValidate() {
    const isPasswordValid = await this.authService.checkAdminPassword(this.adminPassword.value);
    if(isPasswordValid) {
      this.router.navigate(['/parametres']);
      this.dialogRef.close();
    }
  }

  onClickClose(): void {
    this.dialogRef.close();
  }

}
