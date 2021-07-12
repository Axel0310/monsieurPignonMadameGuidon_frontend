import { Component } from '@angular/core';
import { faTruck, faTools, faPaintRoller, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  faTruck = faTruck;
  faTools = faTools;
  faPaintRoller = faPaintRoller;
  faCog = faCog;

}
