import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { ScreenSizeService } from './services/screen-size.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'monsieurPignonMadameGuidon-frontend';

  public $isLoggedIn$: Observable<boolean>;
  public $isMobileView: Observable<boolean>;

  constructor(private auth: AuthenticationService, private screenSize: ScreenSizeService){
    this.$isLoggedIn$ = this.auth.isLoggedIn();
    this.$isMobileView = this.screenSize.getIsMobileView();
  }

  ngOnInit() {
    this.screenSize.setWindowWidth(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])

  onWindowResize() {
    this.screenSize.setWindowWidth(window.innerWidth);
  }
}
