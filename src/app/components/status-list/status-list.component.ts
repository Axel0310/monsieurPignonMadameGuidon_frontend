import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent{

  @Input() itemType!: string;
  @Input() status!: string;

}
