import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.scss']
})
export class ManagePasswordComponent {

  passwordForm = new FormGroup({
    newPassword: new FormControl('', Validators.required),
    adminPassword: new FormControl('', Validators.required),
  });

  adminPasswordForm = new FormGroup({
    oldAdminPassword: new FormControl('', Validators.required),
    newAdminPassword: new FormControl('', Validators.required),
  });

  constructor(private shopService: ShopService) {}

  onSubmit() {
    const f = this.passwordForm.value;
    this.shopService.updatePassword(f.newPassword, f.adminPassword).subscribe(updatedShop => {
      if(updatedShop) this.passwordForm.reset();
    });
  }

  onAdminSubmit() {
    const f = this.adminPasswordForm.value;
    this.shopService.updateAdminPassword(f.oldAdminPassword, f.newAdminPassword).subscribe(updatedShop => {
      if(updatedShop) this.adminPasswordForm.reset();
    });
  }

}
