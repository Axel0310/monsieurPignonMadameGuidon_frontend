import { Component, Input } from '@angular/core';
import { Repair } from 'src/app/interfaces/repair';

@Component({
  selector: 'app-localization-list',
  templateUrl: './localization-list.component.html',
  styleUrls: ['./localization-list.component.scss']
})
export class LocalizationListComponent {

  @Input() repair!: any;

}
