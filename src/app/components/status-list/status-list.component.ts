import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent{

  @Input() itemType!: string;
  @Input() status!: string;
  @Output() statusUpdatedEvent = new EventEmitter<any>();

  updateStatus(newStatus: string) {
    this.statusUpdatedEvent.emit({status: newStatus});
  }

}
