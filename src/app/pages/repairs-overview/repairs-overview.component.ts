import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Repair } from 'src/app/interfaces/repair';
import { RepairService } from 'src/app/services/repair.service';

@Component({
  selector: 'app-repairs-overview',
  templateUrl: './repairs-overview.component.html',
  styleUrls: ['./repairs-overview.component.scss']
})
export class RepairsOverviewComponent {

  repairs$: Observable<Repair[]>;

  constructor(private orderService: RepairService) { 
    this.repairs$ = this.orderService.getRepairs('ongoing');
  }

}
