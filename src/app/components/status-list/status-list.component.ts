import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit {

  @Input() itemType!: string;
  @Input() status$!: Observable<string>;
  @Output() statusUpdatedEvent = new EventEmitter<any>();

  status!: string;

  updateStatus(newStatus: string) {
    this.statusUpdatedEvent.emit({status: newStatus});
  }

  ngOnInit() {
    this.status$.subscribe(e=> {
      this.status = e;
    })
  }

}
