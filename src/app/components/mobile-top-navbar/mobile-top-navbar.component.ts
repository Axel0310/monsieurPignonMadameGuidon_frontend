import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-mobile-top-navbar',
  templateUrl: './mobile-top-navbar.component.html',
  styleUrls: ['./mobile-top-navbar.component.scss']
})

export class MobileTopNavbarComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  onLogout() {
    this.authService.logout().subscribe((outcome) => {
      if (outcome.message === 'Succesfully disconnected.') {
        this.router.navigate(['login']);
      }
    });
  }

}
