import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'monsieurPignonMadameGuidon-frontend';

  public isLoggedIn$: Observable<boolean>;
  public isMobileView = false;

  constructor(private auth: AuthenticationService){
    this.isLoggedIn$ = this.auth.isLoggedIn();
  }

  ngOnInit() {
    this.isMobileView = window.innerWidth <= 768;
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.isMobileView = window.innerWidth <= 768;
  }
}
