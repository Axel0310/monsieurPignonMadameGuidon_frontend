import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faTruck,
  faTools,
  faPaintRoller,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  faTruck = faTruck;
  faTools = faTools;
  faPaintRoller = faPaintRoller;
  faCog = faCog;
  faSignOut = faSignOutAlt;

  onLogout() {
    this.authService.logout().subscribe((outcome) => {
      if(outcome.message === 'Succesfully disconnected.') {
        console.log("ok")
        this.router.navigate(['login'])
      }
    });
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
}
