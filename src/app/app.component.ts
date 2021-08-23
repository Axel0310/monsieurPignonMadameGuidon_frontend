import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monsieurPignonMadameGuidon-frontend';

  public isLoggedIn$: Observable<boolean>

  constructor(private auth: AuthenticationService){
    this.isLoggedIn$ = this.auth.isLoggedIn();
  }
}
