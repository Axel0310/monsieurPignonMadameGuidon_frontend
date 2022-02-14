import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Repair } from 'src/app/interfaces/repair';

@Component({
  selector: 'app-localization-list',
  templateUrl: './localization-list.component.html',
  styleUrls: ['./localization-list.component.scss']
})
export class LocalizationListComponent implements OnInit {

  @Input() repair!: Repair;
  @Output() updateLocalizationEvent = new EventEmitter<any>();

  public localization!: string;

  ngOnInit(): void {
      this.localization = this.repair.localization;
  }

  updateLocalization(newLocalization: string) {
    this.updateLocalizationEvent.emit({localization: newLocalization});
  }

}
